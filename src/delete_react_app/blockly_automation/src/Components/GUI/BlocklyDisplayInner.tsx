import { TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import { ShowBlocklyOutput } from "../../Common/SimpleDialogProps";
import { InnerWorkings } from "../Examples/Messages";
import ShowCodeAndXML from "./ShowCodeAndXML";

function BlocklyDisplayInner({showData}: ShowBlocklyOutput){

    const [text,setText]=useState('');
    
    useEffect(()=>{
        var x= InnerWorkings.getMessage().subscribe(it=>{ 
            setText(it);
        });
        return ()=>  x.unsubscribe()
    },[text]);
    
    return<> 
    
    <div hidden={showData === ShowCodeAndXML.ShowOutput}> <TextareaAutosize cols={40}
    aria-label="output"
    minRows={3}
    placeholder="output of inner workings"
    value={text}
    
  /></div></>
}

export default BlocklyDisplayInner;