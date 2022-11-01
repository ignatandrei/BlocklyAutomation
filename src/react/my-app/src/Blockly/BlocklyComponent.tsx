

 import React from 'react';
 import './BlocklyComponent.css';
 import {useEffect, useRef} from 'react';

 import Blockly, { WorkspaceSvg } from 'blockly/core';
 import {javascriptGenerator} from 'blockly/javascript';
 import locale from 'blockly/msg/en';
 import 'blockly/blocks';
import InterpreterRunner from '../BlocklyReusable/InterpreterRunner';
 
 Blockly.setLocale(locale);
 
 function BlocklyComponent(props:any) {
    const blocklyDiv = useRef<any|null>() ;
    const toolbox = useRef<any|null>();
    let primaryWorkspace = useRef<WorkspaceSvg>();
    let s: InterpreterRunner | null = null;
    
    const generateCode = () => {
        // var code = javascriptGenerator.workspaceToCode(
        //   primaryWorkspace.current
        // );
        // window.alert(code);
        s =new InterpreterRunner(primaryWorkspace.current!,javascriptGenerator, displayStatement);
        s.runCode();
    };
    const displayStatement = (x: any) =>  {

        console.log('for display step ' + s!.stepDisplay + ' data is ' +s!.lastData );

        //console.log('received' +x);
    };
    
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

            if (initialXml) {
                Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), primaryWorkspace.current);
            }
    }, [primaryWorkspace, toolbox, blocklyDiv, props]);
 
    return <>
        <div ref={blocklyDiv} id="blocklyDiv" />
        <div style={{ display: 'none' }} ref={toolbox}>
            {props.children}
        </div>
        <button onClick={generateCode}>Convert</button>
    </>;
}
 
export default BlocklyComponent;
 