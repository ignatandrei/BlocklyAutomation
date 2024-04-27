// import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { MustSave, RunCode, RunCodeData, ShowData } from "../Examples/Messages";
import BlocklyDisplayHtml from "./BlocklyDisplayHTML";
import BlocklyDisplayInner from "./BlocklyDisplayInner";
import BlocklyDisplayJSON from "./BlocklyDisplayJSON";
import BlocklyDisplayText from "./BlocklyDisplayText";
import BlocklyDisplayTimings from "./BlocklyDisplayTimings";
import OutputButton from "./outputButton";
import SaveOutputButton from "./saveOutputButton";
import ShowCodeAndXML from "./ShowCodeAndXML";
import { SaveLocation } from "./SaveLocation";
import { ArgOutput } from "./ArgOutput";
import { saveLoadService } from "../../AppFiles/saveLoadService";
// const options =Object.values(ShowCodeAndXML).filter(it=> isNaN(Number(it)));


function BlocklyDisplayData() {

    var optionsSave = new Map<string, ShowCodeAndXML | string>();
    Object.entries(ShowCodeAndXML).map(([number, word]) => ({ number, word })).forEach(it => optionsSave.set(it.number, it.word));
    const [state, showState] = useState(ShowCodeAndXML.ShowOutputRaw);
    const [text,setText] = useState('');
    
    const data:ArgOutput = { showData: state };

    
    useEffect(() => {
        var x = ShowData.getMessage().subscribe((it: any) => {
            //console.log("received "+it);
            showState(it);
        });
        return () => x.unsubscribe();
    }, [])
    useEffect(()=>{
        var data= RunCode.getMessage().subscribe(it=>{
            switch(it.runCodeData){
                case RunCodeData.Start:
                    setText('');
                    break;
                case RunCodeData.Stop:                   
                    break;
                case RunCodeData.UserRequestedPrint:
                    setText(prev=> prev + "\r\n" + it.message);                 
                    break;
                case RunCodeData.CodeError:
                    //setText(prev=> prev + `\r\n<p style="color:red">${it.message}</p>` );
                    break;
            }
        });
        return ()=>{ data.unsubscribe();}
    },[]);

    useEffect(() => {


        var x = MustSave.getMessage().subscribe(it => {
            switch (it) {
                case SaveLocation.Save_Local:
                case SaveLocation.Download_Blocks:
                case SaveLocation.LoadBlocks:
                case SaveLocation.Screenshot_Blocks:
                case SaveLocation.Clear_Blocks:
                    return;
                default:
                    //window.alert('this is the ' + text);
                    // window.alert('not implemented in BlocklyDisplayData save for ' + it);
                    new saveLoadService().saveText(text, "output.txt");
                    return;
            }
        });
        return () => x.unsubscribe();

    }, [text]);


    return <>

        {/* {optionsSave.get(state.toString())} */}
        <OutputButton />
        
        {/* {state === ShowCodeAndXML.ShowOutput &&  <BlocklyDisplayText></BlocklyDisplayText>}
    {state !== ShowCodeAndXML.ShowOutput &&  <BlocklyDisplayInner></BlocklyDisplayInner>} */}
        <BlocklyDisplayText {...data}></BlocklyDisplayText>
        <BlocklyDisplayInner {...data}></BlocklyDisplayInner>
        <BlocklyDisplayHtml {...data}></BlocklyDisplayHtml>
        <BlocklyDisplayJSON {...data}></BlocklyDisplayJSON>
        <BlocklyDisplayTimings {...data}></BlocklyDisplayTimings>
        <SaveOutputButton />
    </>
    
}

export default BlocklyDisplayData;