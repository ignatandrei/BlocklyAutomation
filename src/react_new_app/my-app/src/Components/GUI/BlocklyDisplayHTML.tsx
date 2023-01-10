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
                    break;
                case RunCodeData.Stop:
                    setText(prev=>prev + '\r\n<hr />');
                    break;
                case RunCodeData.UserRequestedPrint:
                    setText(prev=> prev + "\r\n" + it.message);
                    //setText('asdasdasd');
                    break;
                case RunCodeData.CodeError:
                    //setText(prev=> prev + `\r\n<p style="color:red">${it.message}</p>` );
                    break;
            }
        });
        return ()=>{ data.unsubscribe();}
    },[]);
    useEffect(() => {
        // run this command when value changes
        var textArea=document.getElementById("outputHTML");
        if(textArea)
            textArea.innerHTML = text;
        // console.log(text);
      }, [text]);

    return <> 
    
    <div hidden={showData !== ShowCodeAndXML.ShowOutputHtml}> 
    <div id="outputHTML" /></div></>
}

export default BlocklyDisplayHtml;