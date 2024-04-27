import { TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import { ShowBlocklyOutput } from "../../Common/SimpleDialogProps";
import { InnerWorkings } from "../Examples/Messages";
import ShowCodeAndXML from "./ShowCodeAndXML";

function BlocklyDisplayInner({showData}: ShowBlocklyOutput){

    var displayInner = (showData === ShowCodeAndXML.ShowCodeBlocks);
    displayInner ||=(showData=== ShowCodeAndXML.ShowCodeJavascript);
    displayInner ||=(showData=== ShowCodeAndXML.ShowCodeXml);
    displayInner ||=(showData=== ShowCodeAndXML.ShowCodeJson);

    const [text,setText]=useState('');
    
    useEffect(()=>{
        var x= InnerWorkings.getMessage().subscribe(it=>{ 
            setText(it);
        });
        return ()=>  x.unsubscribe()
    },[text]);
    
    return<> 
    
    <div hidden={!displayInner}> <TextareaAutosize cols={40}
    aria-label="output"
    minRows={3}
    placeholder="output of inner workings"
    value={text}
    
  /></div></>
}

export default BlocklyDisplayInner;