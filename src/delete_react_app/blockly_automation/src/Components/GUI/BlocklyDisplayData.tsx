import { useEffect, useState } from "react";
import { ShowData } from "../Examples/Messages";
import BlocklyDisplayInner from "./BlocklyDisplayInner";
import BlocklyDisplayText from "./BlocklyDisplayText";
import ShowCodeAndXML from "./ShowCodeAndXML";

function BlocklyDisplayData(){

    var optionsSave=new Map<string,ShowCodeAndXML|string>();
    Object.entries(ShowCodeAndXML).map(([number, word]) => ({ number, word })).forEach(it=>optionsSave.set(it.number,it.word));
    const [state, showState]=useState(ShowCodeAndXML.ShowOutput);
    const data ={showData:state};
    useEffect(()=>{
        var x=ShowData.getMessage().subscribe((it:any)=>{                        
            //console.log("received "+it);
            showState(it);
        });
        return ()=>x.unsubscribe();
    },[])


    return <>    
    Display {optionsSave.get(state.toString())}
    {/* {state === ShowCodeAndXML.ShowOutput &&  <BlocklyDisplayText></BlocklyDisplayText>}
    {state !== ShowCodeAndXML.ShowOutput &&  <BlocklyDisplayInner></BlocklyDisplayInner>} */}
<BlocklyDisplayText {...data}></BlocklyDisplayText>
<BlocklyDisplayInner {...data}></BlocklyDisplayInner>
    </>
}

export default BlocklyDisplayData;