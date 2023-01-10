import { useEffect } from "react";

function StartAnything(props: any){

    useEffect(()=>{
        if(props['startFunc'])
            props['startFunc']();
    },[props]);
    return null;
}
export default StartAnything;