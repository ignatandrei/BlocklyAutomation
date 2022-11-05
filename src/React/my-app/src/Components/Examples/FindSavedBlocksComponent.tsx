
import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { SimpleDialogProps } from '../../Common/SimpleDialogProps';
import DemoBlocks from './DemoBlocks';
import { LoadIDService } from './examples';
const emails = ['username@gmail.com', 'user02@gmail.com'];

function FindSavedBlocksComponent(props:SimpleDialogProps) {
 
    const [demoBlocks,setDemoBlocks]=useState(Array<DemoBlocks>(0))
    const { onClose, selectedValue, open } = props;
    
      const handleListItemClick = (value: string) => {
        onClose(value);
      };

      
  const handleClose = () => {
    onClose(selectedValue);
  };
    useEffect(()=>{

        if(demoBlocks.length>0)
            return;
        // LoadIDService.sendID("asdasd");
        var x= DemoBlocks.getDemoBlocks().subscribe(it=>{
            setDemoBlocks(it)
        });
        return ()=>x.unsubscribe();        
    },[demoBlocks]);
    return <>

    
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {demoBlocks.map((d)=>(
          <ListItem button onClick={() => handleListItemClick(d.Source)} key={d.id}>
            <ListItemText primary={d.Source} />
         </ListItem>
        ))}

        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}
        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
    </>;
}

export default FindSavedBlocksComponent;