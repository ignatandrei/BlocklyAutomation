// import { TextareaAutosize } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { ShowBlocklyOutput } from "../../Common/SimpleDialogProps";
import { RunCode, RunCodeData } from "../Examples/Messages";
import ShowCodeAndXML from "./ShowCodeAndXML";
import { JSONTree } from 'react-json-tree';

function BlocklyDisplayJSON({showData}: ShowBlocklyOutput){
 
    const [json, setJSON ]= useState({});
    
    var [nr, setNr]=useState(1) ;
    
    // const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
    useEffect(()=>{
        var data= RunCode.getMessage().subscribe(it=>{
            switch(it.runCodeData){
                case RunCodeData.Start:
                    //setText('<hr />');
                    setJSON({start:'start'});
                    setNr(prev=>1);                    
                    break;
                case RunCodeData.Stop:
                    setJSON(prev=> {
                        (prev as any)['stop']='stop';
                        return prev;
                    });
                    //setText(prev=>prev + '\r\n<hr />');
                    break;
                case RunCodeData.UserRequestedPrint:
                    try{
                        if(it.message){
                            var text='';
                            console.log('a',typeof it.message );
                            
                            if(typeof it.message === 'object'){
                                //how to deal with acorn objects?
                                if(it.message.hasOwnProperty('h') && it.message.hasOwnProperty('H'))
                                    text=JSON.stringify({ 
                                        acorn: 'please use convert to string',
                                        message: it.message
                                    });                                
                                else
                                    text=JSON.stringify(it.message);
                            }else if(typeof it.message === 'string'){
                                text=it.message;
                                //if string it is already an object, leave it 
                                //else stringify the string to transform into object
                                try{
                                    JSON.parse(text);
                                }
                                catch{
                                    text=JSON.stringify(it.message);
                                }
                                
                            }
                            else
                                text=it.message;

                            var s= JSON.parse(text);
                            var key="data"+nr++;
                            //console.log("THIS IS!",key);
                            //setJSON(prev=> (prev as any)[key]=s);
                            setJSON(prev=> {
                                (prev as any)[key]=s;
                                return prev;
                            });
                        }
                    }
                    catch(e){
                        //do nothing
                    }
                    //setText('asdasdasd');
                    break;
                case RunCodeData.CodeError:
                    //setText(prev=> prev + `\r\n<p style="color:red">${it.message}</p>` );
                    break;
            }
        });
        return ()=>{ data.unsubscribe();}
    },[nr]);
    
    return <> 
    
    <div hidden={showData !== ShowCodeAndXML.ShowOutputJSON}> 
    {/* theme at https://github.com/reduxjs/redux-devtools/tree/75322b15ee7ba03fddf10ac3399881e302848874/src/react/themes */}
    <JSONTree data={json} theme={'solarized'} />;</div>
    
    </>
}

export default BlocklyDisplayJSON;