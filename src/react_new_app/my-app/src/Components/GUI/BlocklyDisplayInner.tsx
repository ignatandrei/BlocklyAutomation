import { TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import { ShowBlocklyOutput } from "../../Common/SimpleDialogProps";
import { InnerWorkings } from "../Examples/Messages";
import ShowCodeAndXML from "./ShowCodeAndXML";

function BlocklyDisplayInner({showData}: ShowBlocklyOutput){

    var displayInner = (showData === ShowCodeAndXML.ShowBlocksDefinition);
    displayInner ||=(showData=== ShowCodeAndXML.ShowCode);
    displayInner ||=(showData=== ShowCodeAndXML.ShowXML);

    const [text,setText]=useState('');
    
    useEffect(()=>{
        var x= InnerWorkings.getMessage().subscribe(it=>{ 
            setText(it);
        });
        return ()=>  x.unsubscribe()
    },[text]);
    
    return<> 
    
    <div hidden={!displayInner}> <textarea cols={40}
    aria-label="output"
    placeholder="output of inner workings"
    
  >{text}</textarea></div></>
}

export default BlocklyDisplayInner;