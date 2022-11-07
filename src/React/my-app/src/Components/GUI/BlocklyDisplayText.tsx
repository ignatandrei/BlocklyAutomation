import { TextareaAutosize } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { RunCode, RunCodeData } from "../Examples/Messages";

function BlocklyDisplayText(){
 
    const [text, setText ]= useState('');
    
    // const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
    useEffect(()=>{
        var data= RunCode.getMessage().subscribe(it=>{
            switch(it.runCodeData){
                case RunCodeData.Start:
                    setText('start running code!');
                    return;
                case RunCodeData.Stop:
                    setText(prev=>prev + '\r\nfinish running code!');

                    return;
                case RunCodeData.UserRequestedPrint:
                    setText(prev=> prev + "\r\n" + it.message);
                    //setText('asdasdasd');
                    
            }
        });
        return ()=>{ data.unsubscribe();}
    },[]);
 
    return <> Output of data <div> <TextareaAutosize cols={40}
    aria-label="output"
    minRows={3}
    placeholder="output of data"
    value={text}
    
  /></div></>
}

export default BlocklyDisplayText;