import { useEffect, useState } from "react";
export type functionToSend = {
    start: () => boolean,
    children: never[],
  };
export default function StartAnything({start}:functionToSend){
    const [alreadyStarted, setAlreadyStarted]=useState(false);
    useEffect(()=>{
        if(!alreadyStarted)
            setAlreadyStarted(start());
    },[alreadyStarted, start]);

    return null;
}