// import { TextareaAutosize } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { ShowBlocklyOutput } from "../../Common/SimpleDialogProps";
import { RunCode, RunCodeData } from "../Examples/Messages";
import ShowCodeAndXML from "./ShowCodeAndXML";

function BlocklyDisplayHtml({showData}: ShowBlocklyOutput){
 
    const [text, setText ]= useState('');
    
    // const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
    useEffect(()=>{
        var data= RunCode.getMessage().subscribe(it=>{
            switch(it.runCodeData){
                case RunCodeData.Start:
                    setText('<hr />');
                    return;
                case RunCodeData.Stop:
                    setText(prev=>prev + '\r\n<hr />');
                    return;
                case RunCodeData.UserRequestedPrint:
                    setText(prev=> prev + "\r\n" + it.message);
                    //setText('asdasdasd');
                    
            }
        });
        return ()=>{ data.unsubscribe();}
    },[]);
    useEffect(() => {
        // run this command when value changes
        var textArea=document.getElementById("outputHTML");
        if(textArea)
            textArea.innerHTML = text;
        console.log(text);
      }, [text]);

    return <> 
    
    <div hidden={showData !== ShowCodeAndXML.ShowOutputHTML}> 
    <div id="outputHTML" /></div></>
}

export default BlocklyDisplayHtml;