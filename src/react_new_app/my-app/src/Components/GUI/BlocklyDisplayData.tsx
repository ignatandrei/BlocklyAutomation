// import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { ShowData } from "../Examples/Messages";
import BlocklyDisplayHtml from "./BlocklyDisplayHTML";
import BlocklyDisplayInner from "./BlocklyDisplayInner";
import BlocklyDisplayJSON from "./BlocklyDisplayJSON";
import BlocklyDisplayText from "./BlocklyDisplayText";
import OutputButton from "./outputButton";
import ShowCodeAndXML from "./ShowCodeAndXML";

// const options =Object.values(ShowCodeAndXML).filter(it=> isNaN(Number(it)));


function BlocklyDisplayData(){

    var optionsSave=new Map<string,ShowCodeAndXML|string>();
    Object.entries(ShowCodeAndXML).map(([number, word]) => ({ number, word })).forEach(it=>optionsSave.set(it.number,it.word));
    const [state, showState]=useState(ShowCodeAndXML.ShowOutputRaw);
    const data ={showData:state};
    useEffect(()=>{
        var x=ShowData.getMessage().subscribe((it:any)=>{                        
            //console.log("received "+it);
            showState(it);
        });
        return ()=>x.unsubscribe();
    },[])


    return <>    
    Display
     {/* {optionsSave.get(state.toString())} */}
    <OutputButton />
    {/* {state === ShowCodeAndXML.ShowOutput &&  <BlocklyDisplayText></BlocklyDisplayText>}
    {state !== ShowCodeAndXML.ShowOutput &&  <BlocklyDisplayInner></BlocklyDisplayInner>} */}
<BlocklyDisplayText {...data}></BlocklyDisplayText>
<BlocklyDisplayInner {...data}></BlocklyDisplayInner>
<BlocklyDisplayHtml {...data}></BlocklyDisplayHtml>
<BlocklyDisplayJSON {...data}></BlocklyDisplayJSON>

    </>
}

export default BlocklyDisplayData;