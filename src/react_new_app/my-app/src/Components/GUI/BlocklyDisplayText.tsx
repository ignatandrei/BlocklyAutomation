import { TextareaAutosize } from "@mui/material";
import React from "react";
import './BlocklyDisplayText.css';
import { useEffect, useState } from "react";
import { ShowBlocklyOutput } from "../../Common/SimpleDialogProps";
import { RunCode, RunCodeData } from "../Examples/Messages";
import ShowCodeAndXML from "./ShowCodeAndXML";

function BlocklyDisplayText({showData}: ShowBlocklyOutput){
 
    const [text, setText ]= useState('');
    const [textError, setTextError ]= useState('');
    
    // const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
    useEffect(()=>{
        var data= RunCode.getMessage().subscribe(it=>{
            switch(it.runCodeData){
                case RunCodeData.Start:
                    setText('start running code!');
                    setTextError('');
                    return;
                case RunCodeData.Stop:
                    setText(prev=>prev + '\r\nfinish running code!');

                    return;
                case RunCodeData.UserRequestedPrint:
                    setText(prev=> prev + "\r\n" + it.message);
                    break;
                    //setText('asdasdasd');
                case RunCodeData.CodeError:
                    setTextError(prev=> prev + "\r\n" + it.message);
                    break;

            }
        });
        return ()=>{ data.unsubscribe();}
    },[]);
 
    return <> 
    
    <div hidden={showData !== ShowCodeAndXML.ShowOutput}> 
    <TextareaAutosize id="txtOutput" cols={40} className="stepTourOutput"
    aria-label="output"
    minRows={3}
    placeholder="output of data"
    value={text}
    
  /></div>
      <div hidden={showData !== ShowCodeAndXML.ShowOutput}> 
      {(textError.length>0) && 
      <TextareaAutosize cols={40}
    id="disErr"
    aria-label="output"
    minRows={3}
    placeholder="output of error"
    value={textError}
    
  />
      }
      </div>
  </>
}

export default BlocklyDisplayText;