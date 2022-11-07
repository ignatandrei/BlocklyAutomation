

 import React from 'react';
 import './BlocklyComponent.css';
 import {useEffect, useRef} from 'react';

 import Blockly, { WorkspaceSvg } from 'blockly/core';
 import {javascriptGenerator} from 'blockly/javascript';
 import locale from 'blockly/msg/en';
 import 'blockly/blocks';
import InterpreterRunner from '../BlocklyReusable/InterpreterRunner';
import { LoadIDService, MustSave, RunCode, RunCodeData, RunCodeMessage } from '../Components/Examples/Messages';
import { SaveLocation } from '../Components/GUI/SaveLocation';
import { saveLoadService } from '../AppFiles/saveLoadService';
import DemoBlocks from '../Components/Examples/DemoBlocks';
 
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

    },[]);
    
    const SaveLocationData=()=>{
            var s=new saveLoadService();
            s.saveState(primaryWorkspace.current!,"save1");
    }
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
        
            // if (initialXml) {
            //     Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), primaryWorkspace.current);
            // }
            var s=new saveLoadService();
            s.restoreState(primaryWorkspace.current,"save1");
    }, [primaryWorkspace, toolbox, blocklyDiv, props]);
 
    return <>
        <div ref={blocklyDiv} id="blocklyDiv" />
        <div style={{ display: 'none' }} ref={toolbox}>
            {props.children}
        </div>
        {/* <button onClick={generateCode}>Convert</button> */}
    </>;
}
 
export default BlocklyComponent;
 