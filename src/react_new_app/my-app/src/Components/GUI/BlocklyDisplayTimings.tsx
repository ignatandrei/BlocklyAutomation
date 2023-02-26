// import { TextareaAutosize } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { ShowBlocklyOutput } from "../../Common/SimpleDialogProps";
import { ExecuteBlockTimings, RunCode, RunCodeData } from "../Examples/Messages";
import ShowCodeAndXML from "./ShowCodeAndXML";

function BlocklyDisplayTimings({showData}: ShowBlocklyOutput){
 
    const [text, setText ]= useState('');
    
    // const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
    useEffect(()=>{
        var data= RunCode.getMessage().subscribe(it=>{
            switch(it.runCodeData){
                case RunCodeData.Start:
                    setText('[');
                    break;
                case RunCodeData.Stop:
                    setText(t=>t+']');
                    break;
                default:
                    break;
            }
        });
        return ()=>{ data.unsubscribe();}
    },[setText]);
    useEffect(()=>{
        var data= ExecuteBlockTimings.getMessage().subscribe(it=>{
            setText(t=>{
                var comma=","
                if(t.length ===1 )comma="";
                return t+'\r\n'+ comma +JSON.stringify(it,null,2);
            }); 
            
        });
        return ()=>{ data.unsubscribe();}
    },[setText]);

    useEffect(() => {
        // run this command when value changes
        var textArea=document.getElementById("outputTimings");
        if(textArea)
            textArea.innerHTML = text;
        // console.log(text);
      }, [text]);

    return <> 
    
    <div hidden={showData !== ShowCodeAndXML.ShowOutputTimings}> 
    <div id="outputTimings" /></div></>
}

export default BlocklyDisplayTimings;