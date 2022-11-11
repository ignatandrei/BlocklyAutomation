

 import React from 'react';
 import './BlocklyComponent.css';
 import {useEffect, useRef} from 'react';

 import Blockly, { Block, WorkspaceSvg } from 'blockly/core';
 import {javascriptGenerator} from 'blockly/javascript';
 import locale from 'blockly/msg/en';
 import 'blockly/blocks';
import { saveLoadService } from '../../AppFiles/saveLoadService';
import InterpreterRunner from '../../BlocklyReusable/InterpreterRunner';
import DemoBlocks from '../Examples/DemoBlocks';
import { RunCode, RunCodeData, RunCodeMessage, LoadIDService, MustSave, ShowData, InnerWorkings } from '../Examples/Messages';
import { SaveLocation } from './SaveLocation';
import ShowCodeAndXML from './ShowCodeAndXML';
import { Category } from '@mui/icons-material';
import { BlockReact, CategoryReact } from '../../BlocklyFields';
import {ContentHighlight} from '@blockly/workspace-content-highlight';
import {ZoomToFitControl} from '@blockly/zoom-to-fit';
import {shadowBlockConversionChangeListener} from '@blockly/shadow-block-converter'; 
import {CrossTabCopyPaste} from '@blockly/plugin-cross-tab-copy-paste';
 Blockly.setLocale(locale);
 
 function BlocklyComponent(props:any) {
    const blocklyDiv = useRef<any|null>() ;
    const toolbox = useRef<any|null>();
    let primaryWorkspace = useRef<WorkspaceSvg>();
    let runner: InterpreterRunner | null = null;
    
    const generateCode = () => {
        // var code = javascriptGenerator.workspaceToCode(
        //   primaryWorkspace.current
        // );
        // window.alert(code);
        runner =new InterpreterRunner(primaryWorkspace.current!,javascriptGenerator, displayStatement,finishRun);
        runner.runCode();
    };
    const finishRun = () =>  {

        console.log('finish' );
        RunCode.sendMessage({runCodeData:RunCodeData.Stop});

        //console.log('received' +x);
    };
    const displayStatement = (x: any) =>  {

        console.log('for display step ' + runner!.stepDisplay + ' data is ' +runner!.lastData );
        var message: RunCodeMessage ={
            runCodeData : RunCodeData.UserRequestedPrint,
            message:x,
            messageType:'string'
        }
        RunCode.sendMessage(message);
        //console.log('received' +x);
    };

    useEffect(()=>{
        if(!primaryWorkspace.current)
            return;

        LoadIDService.getID().subscribe(it=>{
          var d=new DemoBlocks();
          d.getDemoBlock(it).subscribe(data=>{
              //window.alert(JSON.stringify(a));
              var xml = Blockly.Xml.textToDom(data);
              Blockly.Xml.clearWorkspaceAndLoadFromXml(xml,primaryWorkspace.current!);
    
          })
        })
      },[primaryWorkspace]);
    useEffect(()=>{

       
        var x= MustSave.getMessage().subscribe(it=>{
            switch(it){
                case SaveLocation.Save_Local:
                    SaveLocationData();
                    return;
                default:
                    window.alert('not yet implemented must save for '+ it);
            }
        });
        return ()=>x.unsubscribe();        

    },[]);


    useEffect(()=>{

       
        var x= RunCode.getMessage().subscribe(it=>{
            switch(it.runCodeData){
                case RunCodeData.Start:
                    generateCode();
                    return;
                case RunCodeData.Stop:
                        //do nothing yet
                    return;
                case RunCodeData.UserRequestedPrint:
                    //do nothing yet
                    return;
                default:
                    window.alert('not yet implemented in BlocklyComponent for '+ it);
            }
        });
        return ()=>x.unsubscribe();        

    },[generateCode]);
    
    const SaveLocationData=()=>{
            var s=new saveLoadService();
            s.saveState(primaryWorkspace.current!,"save1");
    }

    useEffect(()=>{
        var x=ShowData.getMessage().subscribe(it=>{            
            switch(it){
                case ShowCodeAndXML.ShowOutput:

                    return;
                case ShowCodeAndXML.ShowCode:
                    var code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
                    InnerWorkings.sendMessage(code);     
                    return;
                case ShowCodeAndXML.ShowXML:
                    var xml = Blockly.Xml.workspaceToDom(primaryWorkspace.current!, true);
                    var xml_text = Blockly.Xml.domToPrettyText(xml);
                    //console.log('send' ,xml_text);
                    InnerWorkings.sendMessage(xml_text);                    
                    return;
                case ShowCodeAndXML.ShowBlocksDefinition:
                     var xml = Blockly.Xml.workspaceToDom(primaryWorkspace.current!, true);
                     var xml_text = Blockly.Xml.domToPrettyText(xml);
                     var blocksArr=Array<string>(0);
                    
                    if(xml_text.indexOf('<block type="')>=0){
                      var blocks=xml_text.split('<block type="');
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
                    window.alert('not implemented '+it);
            }
        });
        return ()=>x.unsubscribe();
    },[]);


    useEffect(() => {

        if(primaryWorkspace.current !== undefined)
            return;//TODO: why generates twice ?
        console.log("test", primaryWorkspace);
        const { initialXml, children, ...rest } = props;
            primaryWorkspace.current = Blockly.inject(
                blocklyDiv.current,
                {
                    toolbox: toolbox.current,
                    ...rest
                },
            );
            const contentHighlight = new ContentHighlight(primaryWorkspace.current);
            contentHighlight.init();

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
    }, [primaryWorkspace, toolbox, blocklyDiv, props]);
 
    return <>
        <div ref={blocklyDiv} id="blocklyDiv" />
        <div style={{ display: 'none' }} ref={toolbox}>
        {/* <CategoryReact id="asdstart" colour="210" name="Loaaaasdasgic"><BlockReact type="controls_if"></BlockReact></CategoryReact>  */}
            {props.children}
        </div>
        {/* <button onClick={generateCode}>Convert</button> */}
    </>;
}
 
export default BlocklyComponent;
 