
import { renderToString } from 'react-dom/server'
 import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
 import './BlocklyComponent.css';
 import {useEffect, useRef} from 'react';

 import Blockly, {  WorkspaceSvg } from 'blockly/core';
 import {javascriptGenerator} from 'blockly/javascript';
 import locale from 'blockly/msg/en';
 import 'blockly/blocks';
import { saveLoadService } from '../../AppFiles/saveLoadService';
import InterpreterRunner from '../../BlocklyReusable/InterpreterRunner';
import DemoBlocks from '../Examples/DemoBlocks';
import { RunCode, RunCodeData, RunCodeMessage, LoadIDService, MustSave, ShowData, InnerWorkings, ExecuteBlockTimings } from '../Examples/Messages';
import { SaveLocation } from './SaveLocation';
import ShowCodeAndXML from './ShowCodeAndXML';
// import { Category } from '@mui/icons-material';
// import { BlockReact, CategoryReact } from '../../BlocklyFields';
import {ContentHighlight} from '@blockly/workspace-content-highlight';
import {ZoomToFitControl} from '@blockly/zoom-to-fit';
import {shadowBlockConversionChangeListener} from '@blockly/shadow-block-converter'; 
import {CrossTabCopyPaste} from '@blockly/plugin-cross-tab-copy-paste';
import {Backpack} from '@blockly/workspace-backpack';
import ExistingSwagger from '../Swagger/ExistingSwagger';
import BlocklyReturnSwagger from '../../BlocklyReusable/BlocklyReturnSwagger';
import { SettingsBA } from './settings/Settings';
import { useParams } from 'react-router-dom';
import AllNewBlocks from '../../BlocklyReusable/allNewBlocks';
import IBlocks from '../../BlocklyReusable/blocksInterface';
import { downloadWorkspaceScreenshot } from './screenshot';
import { delay } from 'rxjs';
import CustomCategories from '../../Common/customCategs';
import { State } from 'blockly/core/serialization/blocks';

Blockly.setLocale(locale);
 
 function BlocklyComponent(props:any) {
    
    let { idBlock } = useParams();
    const blocklyDiv = useRef<any|null>() ;
    const toolbox = useRef<any|null>();
    let primaryWorkspace = useRef<WorkspaceSvg>();
    let runner= useRef<InterpreterRunner | null>( null);
    let swaggerData: BlocklyReturnSwagger[] = useMemo(()=>[],[]);
    let children = props.children as [];
    const [startBlocks,setstartBlocks]=useState(['']);
    const CategorySwaggerHidden=(id: Number)=> {
      return `<category name='swagger_hidden_${id}' hidden='true' >${id}</category>`;
    }

    const [blocklyWidth, setblocklyWidth]=useState('75%');
    const createXML=()=>{
      var newSwaggerCategories =new Array(50).fill(null).map((it, index) =>
      CategorySwaggerHidden(index)
      ).join('');
  
      var xmlToolbox= '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox-simple" style="display: none">';
      children.forEach(it=>xmlToolbox+=renderToString(it));
      xmlToolbox+= '<category name="Advanced" id="catAdv" expanded="true" > ';
      const mapCategoryBlocks = new Map<string, IBlocks[]>();
      AllNewBlocks.Instance.NewBlocks().sort((a,b)=>a.category.localeCompare(b.category)).forEach(it=>{
        const key = it.category;
        if(!mapCategoryBlocks.has(key)){
          mapCategoryBlocks.set(key,[]);
        }
        mapCategoryBlocks.get(key)?.push(it);
      
      });
      
      mapCategoryBlocks.forEach((val,key) =>{
        xmlToolbox+= `<category name="${key}" id="catAdv_${key}" expanded='false' > ` ;
        val.forEach(it=>{
          xmlToolbox+=it.fieldXML();
        })
        xmlToolbox+='</category> ';
      });
      xmlToolbox+='</category> ';
      xmlToolbox+= `<category name="customCateg"></category>`;
      xmlToolbox+= `<category name="Swaggers" id="catSwagger" class='.stepTourSwagger' expanded='false' > '        
      <button text="Add Swagger" callbackKey="addSwagger"></button>
      ${newSwaggerCategories}
      '</category>  `;

      xmlToolbox+='    </xml>';
      return xmlToolbox;
    }
    const primaryXmlToolboxRef = useRef('');
    const [primaryXmlToolbox,setPrimaryXmlToolbox]=useState(createXML());
    // const[ HighlightError, showHighlightError] = useState<boolean|null>(null);

    useEffect(() => {
      primaryXmlToolboxRef.current = primaryXmlToolbox;
    }, [primaryXmlToolbox]);
    // const displayBlockWithError=useCallback( (x:string )=>{
    //   console.log('aaaa', HighlightError,x);
    //   if(HighlightError == null) 
    //     return;
    //     var s=!HighlightError;
    //     console.log('bbb', HighlightError,x);
    //     showHighlightError(s);
    //   primaryWorkspace.current!.highlightBlock(null);
      
    //   if(HighlightError)
    //     primaryWorkspace.current!.highlightBlock(x);      
    // },[HighlightError,showHighlightError]);
    
    // const [prevIntervalHighlight, setprevIntervalHighlight ]= useState(0);

    const displayError = useCallback( (x: any) =>  {

      //console.error('error is ' ,x);
      //console.log('block' + runner!.current!.blockExecutedID);   
      //var xml = Blockly.Xml.workspaceToDom(primaryWorkspace.current!, true);
      //var xml_text = Blockly.Xml.domToPrettyText(xml);
      var b=primaryWorkspace.current!.getBlockById(runner!.current!.blockExecutedID);
      var block: State | null =null;
      if(b){
        block= Blockly.serialization.blocks.save(b,undefined);

      }
      const currentBlockId=runner!.current!.blockExecutedID ;
      var message: RunCodeMessage ={
          runCodeData : RunCodeData.CodeError,
          message:{currrentBlock: block, errorMessage: x, currentBlockId:currentBlockId},
          messageType:'string'
      }
      RunCode.sendMessage(message);
      // if(prevIntervalHighlight !== 0)
      //   clearInterval(prevIntervalHighlight);
      // showHighlightError(it=>true);
      // console.log('beofre setInterval');
      // var ret = window.setInterval(()=>displayBlockWithError(runner!.current!.blockExecutedID ), 3000);
      // console.log('after setInterval',ret);
      
      //setprevIntervalHighlight(ret);
      setTimeout(() => {
        highlightBlockNow(currentBlockId);
      }, 5000);
      return true;
      
      //console.log('received' +x);
  },[]);
    const highlightBlockNow = (blockId:string)=>{
      primaryWorkspace.current!.highlightBlock(null);
      primaryWorkspace.current!.highlightBlock(blockId);
    }
    const generateCode = useCallback(() => {
        runner.current =new InterpreterRunner(primaryWorkspace.current!,javascriptGenerator, displayStatement,finishRun, displayError );
        runner.current.runCode();
    },[displayError]);

    const finishRun = () =>  {
        console.timeEnd(runner.current?.blockExecutedType +"_"+ runner.current?.blockExecutedID);
        ExecuteBlockTimings.sendEndBlock({
          dateEnd: new Date(),
          dateStart: runner.current!.blockExecutedDateStart!,
          id : runner.current!.blockExecutedID,
          typeBlock : runner.current?.blockExecutedType || ''
        })
        console.log('finish' );
        RunCode.sendMessage({runCodeData:RunCodeData.Stop});

        //console.log('received' +x);
    };
    const displayStatement = (x: any) =>  {

        //console.log('for display step ' + runner.current!.stepDisplay + ' data is ' +runner.current!.lastData );
        var message: RunCodeMessage ={
            runCodeData : RunCodeData.UserRequestedPrint,
            message:x,
            messageType:'string'
        }
        RunCode.sendMessage(message);
        //console.log('received' +x);
    };

    useLayoutEffect (()=>{
      var x= new SettingsBA().getSettings().subscribe(it=>{        
        setstartBlocks(it.startBlocks);
             
      });
      return ()=>x.unsubscribe();
    },[setstartBlocks])

    useEffect(()=>{
        
        // if(!primaryWorkspace.current)
        //     return;

        var x= LoadIDService.getID()
        .pipe(
          delay(2000)//in order to load data
        )
        .subscribe(it=>{
          console.log('in getID');
          var d=new DemoBlocks();
          d.getDemoBlock(it)
              .subscribe(data=>{
              //window.alert(JSON.stringify(a));
              var xml = Blockly.Xml.textToDom(data);
              Blockly.Xml.clearWorkspaceAndLoadFromXml(xml,primaryWorkspace.current!);
    
          })
        });
        return ()=> x.unsubscribe();
      },[primaryWorkspace]);

      const Download=useCallback(()=> {
        //todo: use vex as for others - electron compatibility
        
        LoadPrompt('Please enter file name' , (name:string| null)=>{
    
        if (name == null) return;
        var s=new saveLoadService();
        s.DownloadBlocks(Blockly.Xml, primaryWorkspace.current!, name);
        });
    
      },[]);
      const inputFile = useRef<HTMLInputElement| null>(null) ;

      const LoadFile=(e:any)=>{
        e.stopPropagation();
        e.preventDefault();
        if((!inputFile.current!.files) || (inputFile.current!.files!.length === 0))
          return;

          
        var file: File = inputFile.current!.files![0];
        var myReader: FileReader = new FileReader();
        myReader.onloadend = function (e) {
          // console.log('file',myReader.result);
          
          var s=new saveLoadService();          
          s.LoadFile(Blockly.Xml, primaryWorkspace.current!, myReader.result);
          //window.alert('finish loading blocks');
          // self.run.resetInterpreter();
        };
        myReader.readAsText(file);

      }
      const SaveLocationData=useCallback(()=>{
        var s=new saveLoadService();
        s.saveState(primaryWorkspace.current!,"save1"); 
      },[]);

    useEffect(()=>{

       
        var x= MustSave.getMessage().subscribe(it=>{
            switch(it){
                case SaveLocation.Save_Local:
                    SaveLocationData();
                    return;
                case SaveLocation.Download_Blocks:
                  Download();
                  return;
              case SaveLocation.LoadBlocks:
                inputFile.current!.click();
                 
                  return;
              case SaveLocation.Screenshot_Blocks:
                downloadWorkspaceScreenshot(primaryWorkspace.current!)
                return;
              case SaveLocation.Clear_Blocks:
                Blockly.getMainWorkspace().clear();
                return;
                // Blockly.Xml.clearWorkspaceAndLoadFromXml({}, primaryWorkspace.current!);
                default:
                    window.alert('not yet implemented must save for '+ it);
            }
        });
        return ()=>x.unsubscribe();        

    },[Download,SaveLocationData]);


    useEffect(()=>{

       
        var x= RunCode.getMessage().subscribe(it=>{
            switch(it.runCodeData){
                case RunCodeData.Start:
                    // showHighlightError(it=>null);
                    generateCode();
                    return;
                case RunCodeData.Stop:
                        //do nothing yet
                    return;
                case RunCodeData.CodeError:
                case RunCodeData.UserRequestedPrint:
                    //do nothing yet
                    return;

                default:
                    window.alert('not yet implemented in BlocklyComponent for '+ it);
            }
        });
        return ()=>x.unsubscribe();        

    },[generateCode]);
    

    useEffect(()=>{
        var x=ShowData.getMessage().subscribe(it=>{            
            switch(it){
                case ShowCodeAndXML.ShowOutputRaw:
                case ShowCodeAndXML.ShowOutputHtml:
                case ShowCodeAndXML.ShowOutputJson:
                case ShowCodeAndXML.ShowOutputTimings:
                  setblocklyWidth('75%');
                  return;
                case ShowCodeAndXML.ShowOutputNone:
                  setblocklyWidth('100%');
                  setTimeout((d: Blockly.WorkspaceSvg) => {
                    Blockly.svgResize(d);
                  }, 1000, primaryWorkspace.current);
                  return;
                  case ShowCodeAndXML.ShowCodeJson:
                    setblocklyWidth('75%');
                    //var code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
                    var js=Blockly.serialization.workspaces.save(primaryWorkspace.current!);
                    var codeJson=JSON.stringify(js, null,2);
                    InnerWorkings.sendMessage(codeJson);     
                    return;
                case ShowCodeAndXML.ShowCodeJavascript:
                    setblocklyWidth('75%');
                    var code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
                    InnerWorkings.sendMessage(code);     
                    return;
                case ShowCodeAndXML.ShowCodeXml:
                  setblocklyWidth('75%');
                    var xml = Blockly.Xml.workspaceToDom(primaryWorkspace.current!, true);
                    var xml_text = Blockly.Xml.domToPrettyText(xml);
                    // console.log('send' ,xml_text);
                    InnerWorkings.sendMessage(xml_text);                    
                    
                    return;
                case ShowCodeAndXML.ShowCodeBlocks:
                  setblocklyWidth('75%');
                     var xml1 = Blockly.Xml.workspaceToDom(primaryWorkspace.current!, true);
                     var xml_text1 = Blockly.Xml.domToPrettyText(xml1);
                     var blocksArr=Array<string>(0);
                    
                    if(xml_text1.indexOf('<block type="')>=0){
                      var blocks=xml_text1.split('<block type="');
                      for(var i=1;i<blocks.length;i++){
                        var block=blocks[i].split('"')[0];
                        blocksArr.push(block);
                      }
                    }
                    
                    if(blocksArr.length === 0)
                    {
                        InnerWorkings.sendMessage('no text'); 
                        return;
                    }
                    try{
                        var text = blocksArr.map(it=>
                        {
                            var blocksData=`Blockly.Blocks['${it}']={ init: \n` + ((Blockly.Blocks[it] as any)['init']).toString() + '};';
                            var js = `Blockly.JavaScript['${it}']=` +  ((javascriptGenerator as any)[it]).toString()+';';
                            return blocksData + '\n' + js;
                        } ).join('\n');
                        InnerWorkings.sendMessage(text); 
                          //console.log('x'+it,(Blockly.Blocks[it] as any)['init']());
                      }
                      catch(e){
                        console.error('parse definition : '+it,e);
                        return ;
                      }
                    
                    return;
                default:
                    window.alert('in blocklycomponent.tsx not implemented '+it);
            }
        });
        return ()=>x.unsubscribe();
    },[]);
    
    const LoadSwaggerFromAPI = useCallback((api: BlocklyReturnSwagger)=> {
        
      if(api.hasError){
        console.error("error in swagger", api.name);
        return api;
      }
      swaggerData.push(api);
      for (var i = 0; i < api.GenerateBlocks.length; i++) {
        var e = api.GenerateBlocks[i];
      //   if(Blockly.getMainWorkspace() == null){
      //     console.log('#38 here in loadSwagger from api is not ok',Blockly.getMainWorkspace());
      //   }
        e(Blockly.Blocks, javascriptGenerator,primaryWorkspace.current );
      }
      for (var iFunc = 0; iFunc < api.GenerateFunctions.length; iFunc++) {
        var eFunc = api.GenerateFunctions[iFunc];
        // var image = function (opKey: string) {
        //   var image = `assets/httpImages/${opKey}.png`;
        //   return new Blockly.FieldImage(image, 90, 20, opKey);
        // };
       
        eFunc(Blockly.Blocks, javascriptGenerator);
      }
      api.metaBlocks()(Blockly.Blocks, javascriptGenerator);
      return api;
    },[swaggerData]);

    const addToToolboxSwagger=useCallback( (item:any,xmlToolbox:string, swaggerLoaded: number)=>{
        
      var newCateg = item
      .findCategSwaggerFromPaths()
      .sort()
      .map(
        (it: any) =>
          `<category name='${it}' custom='func_${item.name}_${it}'></category>`
      )
      .join('\n');
    var nameExistingCategorySwagger =CategorySwaggerHidden(swaggerLoaded) || '';
  
  // console.log('a',xmlToolbox);
  var replaceCategory=`<category name='${item.name}'>
  <category name='API' id='func_${item.name}'>
  ${newCateg}
  </category>
  ${item.categSwagger()}
  
  <category name='meta' id='meta_${item.name}'>
  <block type='meta_swagger_controllers_${item.name}'></block>
  <block type='meta_swagger_controllers_actions_${item.name}'></block>
  
  <block type="container" >
  <field name="nameContainer">HtmlDocumentation ${item.name}</field>
  <statement name="Stmts">

  <block type="controls_forEach" collapsed="true" x="112" y="265">
    <field name="VAR" id="6eY#Z)h8NGTGTkIpx%Gg">category</field>
    <comment pinned="true" >Export HTML definition</comment>
    <value name="LIST">
      <block type="getproperty">
        <field name="objectName">object</field>
        <field name="prop">property</field>
        <value name="ObjectToChange">
<block type="meta_swagger_controllers_actions_${item.name}"></block>
        </value>
        <value name="PropertyName">
          <block type="text">
            <field name="TEXT">categories</field>
          </block>
        </value>
      </block>
    </value>
    <statement name="DO">
      <block type="text_print">
        <value name="TEXT">
          <block type="HTMLheaders">
            <field name="NAME">H1</field>
            <value name="NAME">
              <shadow type="text">
                <field name="TEXT"></field>
              </shadow>
              <block type="getproperty">
                <field name="objectName">object</field>
                <field name="prop">property</field>
                <value name="ObjectToChange">
                  <block type="variables_get">
                    <field name="VAR" id="6eY#Z)h8NGTGTkIpx%Gg">category</field>
                  </block>
                </value>
                <value name="PropertyName">
                  <block type="text">
                    <field name="TEXT">name</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="variables_set">
            <field name="VAR" id="*n^H$b7MwVpU3OUbOeOe">message</field>
            <value name="VALUE">
              <block type="getproperty">
                <field name="objectName">object</field>
                <field name="prop">property</field>
                <value name="ObjectToChange">
                  <block type="variables_get">
                    <field name="VAR" id="6eY#Z)h8NGTGTkIpx%Gg">category</field>
                  </block>
                </value>
                <value name="PropertyName">
                  <block type="text">
                    <field name="TEXT">ops</field>
                  </block>
                </value>
              </block>
            </value>
            <next>
              <block type="text_print">
                <value name="TEXT">
                  <shadow type="text">
                    <field name="TEXT">abc</field>
                  </shadow>
                  <block type="text_multiline">
                    <field name="TEXT">&lt;table border=1&gt;&lt;tr&gt;&lt;td&gt;Operation&lt;/td&gt;&lt;td&gt;Name&lt;/td&gt;&lt;/tr&gt;</field>
                  </block>
                </value>
                <next>
                  <block type="controls_forEach">
                    <field name="VAR" id="mj!([vz^/N6I=Fn9MK*q">api</field>
                    <value name="LIST">
                      <block type="variables_get">
                        <field name="VAR" id="*n^H$b7MwVpU3OUbOeOe">message</field>
                      </block>
                    </value>
                    <statement name="DO">
                      <block type="text_print">
                        <value name="TEXT">
                          <shadow type="text">
                            <field name="TEXT">abc</field>
                          </shadow>
                          <block type="converterTemplate">
                            <value name="object">
                              <block type="variables_get">
                                <field name="VAR" id="mj!([vz^/N6I=Fn9MK*q">api</field>
                              </block>
                            </value>
                            <value name="text">
                              <block type="text_multiline">
                                <field name="TEXT">&lt;tr&gt;&amp;#10;&lt;td&gt;&lt;img width=50 height=50  src='/blocklyAutomation/assets/httpImages/\${method}.png' /&gt;&lt;/td&gt;&lt;td&gt;\${operation}&lt;/td&gt;&lt;/tr&gt;</field>
                              </block>
                            </value>
                          </block>
                        </value>
                      </block>
                    </statement>
                    <next>
                      <block type="text_print">
                        <value name="TEXT">
                          <shadow type="text">
                            <field name="TEXT">abc</field>
                          </shadow>
                          <block type="text_multiline">
                            <field name="TEXT">&lt;/table&gt;</field>
                          </block>
                        </value>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
    <next>
          <block type="metadisplay">
            <field name="what">4</field>
          </block>
        </next>
  </block>
  
  </statement>
  </block>

  
  


  </category>
  
  </category>
  `;
  // console.log('x',replaceCategory)
  xmlToolbox= xmlToolbox.replace(nameExistingCategorySwagger,replaceCategory);  
  // console.log('load toolbox '+swaggerLoaded,xmlToolbox)  ;
  primaryWorkspace.current?.updateToolbox(xmlToolbox);
  
  
    
      var nameCat = 'objects_' + item.nameCategSwagger();
      var nameAPI = 'AllApi_' + item.nameCategSwagger();
      var cache=item;
      
      primaryWorkspace.current?.registerToolboxCategoryCallback(
        nameCat,
        (d: Blockly.Workspace) => {
          return registerSwaggerBlocksObjects(d, cache);
        }
      );
      
      primaryWorkspace.current?.registerToolboxCategoryCallback(
        nameAPI,
        (d: Blockly.Workspace) => {
          return registerSwaggerBlocksAPIAll(d, cache);
        }
      );
        
      item.findCategSwaggerFromPaths().forEach((it: any) => {
          primaryWorkspace.current?.registerToolboxCategoryCallback(
            `func_${item.name}_${it}`,
            (d: Blockly.Workspace) => {
              return  registerSwaggerBlocksAPIControllers(
                d,
                item,
                it
              );
            }
          );
        });
     return xmlToolbox;
    },[]);

    const [customCategs,setCustomCategs]=useState('');

    useEffect(()=>{
      var x=(new CustomCategories()).getCustomCategories().subscribe(
        it=> {
          setCustomCategs(it);
        }
      );
      return ()=>x.unsubscribe();
    },[setCustomCategs]);

    const afterTimeout=useCallback(()=>{
      var nr = swaggerData.length;

      console.log('in after timeout:', nr);

      if(nr > 0)
      if(swaggerData.every(it=>it.hasError))
          {
              console.log('all swaggers has errors');
              nr=0;
          }
      var xmlToolbox=primaryXmlToolboxRef.current;
     
      primaryWorkspace.current!.updateToolbox(xmlToolbox);
      if(nr>0)
      swaggerData.sort((a,b)=>a.name.localeCompare(b.name)).forEach((item, index) => {
        //console.log('a_item', item);
          var cache=item;  
          xmlToolbox= addToToolboxSwagger(cache,xmlToolbox, index);
      });

      //xmlToolbox=xmlToolbox.replace(`<category name="customCateg"></category>`,`<category name="AndreicustomCateg"></category>`);
      xmlToolbox=xmlToolbox.replace(`<category name="customCateg"></category>`,customCategs);

      setPrimaryXmlToolbox(xmlToolbox);
      primaryWorkspace.current!.updateToolbox(xmlToolbox);

  // if (myComponent?.mustLoadDemoBlock != null)
  //   myComponent.ShowDemo(myComponent?.mustLoadDemoBlock);
  // else {
      // console.log('asdsa', startBlocks);
    if ((startBlocks?.length || 0) > 0) {
      try {
        var xml_text = (startBlocks || []).join('\n');
        //<xml xmlns="https://developers.google.com/blockly/xml"></xml>
        if (xml_text?.length > 62) {
          var xml = Blockly.Xml.textToDom(xml_text);
          Blockly.Xml.clearWorkspaceAndLoadFromXml(
            xml,
            primaryWorkspace.current!
          );
        }
      } catch (e) {
        console.log('error when load default blocks', e);
      }
    }
  if(idBlock){
    console.log('send the id'+idBlock);
     LoadIDService.sendID(idBlock);
  }
  else{
    var s1=new saveLoadService();
    s1.restoreState(primaryWorkspace.current!,"save1");
  }
  
  },[addToToolboxSwagger,customCategs, idBlock, startBlocks, swaggerData]);


  useEffect (()=>{
      
      try{
        // console.log('this is swagger1');
        var x= new  ExistingSwagger().getSwagger().subscribe(it=>{
            // console.log('this is swagger', it);
            if(it && it.length>0)
            it.forEach(element => {
                // var url=element.swaggerUrl;
                var show = !element.hasError;
                //special condition for local api
                //console.log("show swagger: "+show,element);
                if(show){
                    LoadSwaggerFromAPI(element);
                }
               afterTimeout();   
              });
              else{
                console.log('0 swaggers')
              }
            });        
            // var time=window.setTimeout(()=>afterTimeout(), 5000);
        return ()=>{
          x.unsubscribe();
          // window.clearTimeout(time);
        }
          }
          catch(e:any){
            console.log('in get swagger problem',e);
          }

    },[LoadSwaggerFromAPI, afterTimeout]);



    const registerSwaggerBlocksObjects=(
        demoWorkspace: Blockly.Workspace,
        item: any
      )=> {
        var xmlList: Element[] = [];
        xmlList = item.fieldXMLObjects.map((it: any) => Blockly.Xml.textToDom(it));       
        return xmlList;
       
      };

      const  registerSwaggerBlocksAPIControllers=(
        demoWorkspace: Blockly.Workspace,
        item: any,
        controller: string
      )=>  {
        var xmlList: Element[] = [];
        xmlList= item.findfieldXMLFunctions(controller)
          .map((it: any) => Blockly.Xml.textToDom(it.gui));
        return xmlList;
      }
      const registerSwaggerBlocksAPIAll=(
        demoWorkspace: Blockly.Workspace,
        item: any
      )=> {
        var xmlList: Element[] = [];
        xmlList = item.fieldXMLFunctions.map((it: any) =>
          Blockly.Xml.textToDom(it.gui)
        );
        return xmlList;
      }   
   
    

    
      const  LoadSwaggerFromUrl=useCallback(async (url: string, name?: string)=> {
        const baseUrl=process.env.PUBLIC_URL+'/'; 
        var parser = new BlocklyReturnSwagger(url,baseUrl);
        var api = await parser.ParseSwagger();
    
        api.name = name || url;
        if(!api.hasError)
          return LoadSwaggerFromAPI(api); 
        else
          return api;
      },[LoadSwaggerFromAPI]);

      const LoadPrompt=(text:string, callBack: (result:string|null)=>void)=>{
          var data= window.prompt(text);
          callBack(data);
      }
      const LoadSwagger= useCallback(()=>{
        
        //const baseUrl=process.env.PUBLIC_URL+'/'; 
        LoadPrompt('Please enter the swagger url ( not the html!)' , (json:string| null)=>{
        
        if (!json) return;
        if (json.endsWith('.html') || json.endsWith('.htm')) {
          window.alert('Swagger should not end with .html - see source of html page');
          return;
        }
        //self.loadedCompletely=false;
        LoadSwaggerFromUrl(json).then((api:any) => {
          // this.afterTimeout(this);
          if(api.hasError){
            if(window.confirm("error loading swagger - most probably CORS\n Please download the windows app to try this.")){
                window.open('http://ba.serviciipeweb.ro/');
            }
          }
          else{
            swaggerData.push(api);
            var xmlToolbox = primaryXmlToolboxRef.current;
            var data= addToToolboxSwagger(api,xmlToolbox , swaggerData.length);      
            setPrimaryXmlToolbox(data);
            //self.loadedCompletely=true;
            window.alert("loaded successfully");
          }
        });
          });
    },[LoadSwaggerFromUrl, addToToolboxSwagger, swaggerData]);

    
    useEffect(() => {

        if(primaryWorkspace.current !== undefined)
            return;//TODO: why generates twice ?
        // console.log("test", primaryWorkspace);
        const { initialXml, children, ...rest } = props;
            primaryWorkspace.current = Blockly.inject(
                blocklyDiv.current,
                {
                    toolbox: toolbox.current,
                    ...rest
                },
            );
            var workspace = primaryWorkspace.current!;
            
            javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n;';
            // javascriptGenerator.addReservedWords('endhighlightBlock(%1);\n;');
            // javascriptGenerator.STATEMENT_SUFFIX = 'console.end(%1);\n';
            // workspace.addChangeListener((ev:any)=>{
              
            //   if (ev.type === Blockly.Events.BLOCK_CREATE ){
            //     console.log("event", ev);
            //   }
            // });
            (globalThis as any)["VisualAPIworkspace"]=workspace;
            (globalThis as any)["VisualAPIBlocklyXML"]=Blockly.Xml;
            (globalThis as any)["VisualAPIBlockly"]=Blockly;
            (globalThis as any)["VisualAPIShow"]=ShowData.sendMessage;
            
            
            // console.log('!!!')
            const prevConfigureContextMenu = workspace.configureContextMenu;
            workspace.configureContextMenu = (menuOptions, e) => {
              prevConfigureContextMenu &&
                  prevConfigureContextMenu.call(null, menuOptions, e);
  
              const screenshotOption = {
                text: 'Download Screenshot',
                enabled: true,
                callback: function() {
                  downloadWorkspaceScreenshot(workspace);
                  
                },

                scope: {
                  block: undefined,
                  workspace: undefined
                },
                weight: workspace.getTopBlocks(false).length
        
              };
              menuOptions.push(screenshotOption);
            };
  
            primaryWorkspace.current!.registerButtonCallback("addSwagger",()=>LoadSwagger());
            
            const contentHighlight = new ContentHighlight(primaryWorkspace.current);
            contentHighlight.init();

            const backpack = new Backpack(primaryWorkspace.current);
            backpack.init();

            const zoomToFit = new ZoomToFitControl(primaryWorkspace.current);
            zoomToFit.init();

            primaryWorkspace.current.addChangeListener(shadowBlockConversionChangeListener);

            const options = {
                contextMenu: true,
                shortcut: true,
              }
              
              // Initialize plugin.
              const plugin = new CrossTabCopyPaste();
              plugin.init(options, () => {
                  console.log('Use this error callback to handle TypeError while pasting');
                });
              
              // optional: Remove the duplication command from Blockly's context menu.
              Blockly.ContextMenuRegistry.registry.unregister('blockDuplicate');
              
              // optional: You can change the position of the menu added to the context menu.
              Blockly.ContextMenuRegistry.registry.getItem('blockCopyToStorage')!.weight = 2;
              Blockly.ContextMenuRegistry.registry.getItem('blockPasteFromStorage')!.weight = 3;

            // if (initialXml) {
            //     Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), primaryWorkspace.current);
            // }
            var s=new saveLoadService();
            s.restoreState(primaryWorkspace.current,"save1");
    }, [primaryWorkspace, toolbox, blocklyDiv, props, LoadSwagger]);
 
    return <>
        <input type='file' id='file' ref={inputFile}  onChange={LoadFile} style={{display: 'none'}}/>
        <div ref={blocklyDiv} id="blocklyDiv" style={{width: blocklyWidth}} />
        <div style={{ display: 'none' }} ref={toolbox}>
        {/* <CategoryReact id="asdstart" colour="210" name="Loaaaasdasgic"><BlockReact type="controls_if"></BlockReact></CategoryReact>  */}
            {props.children}
        </div>
        {/* <button onClick={generateCode}>Convert</button> */}
    </>;
}
 
export default BlocklyComponent;
 