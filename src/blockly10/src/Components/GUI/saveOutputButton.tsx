import { Button } from "@mui/material";
import { SaveLocation } from "./SaveLocation";
import { MustSave } from "../Examples/Messages";

function SaveOutputButton(props: any) {

    
    const handleClick = () => { 
        MustSave.sendMessage(SaveLocation.Save_Output);
    
    }
    return (
        <>
            <Button variant="contained" onClick={handleClick}>Save output</Button>
        </>
    );
}

export default SaveOutputButton;