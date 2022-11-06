
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteCloseReason, AutocompleteValue, Avatar, Dialog, DialogTitle, FilterOptionsState, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { SimpleDialogProps } from '../../Common/SimpleDialogProps';
import DemoBlocks from './DemoBlocks';
import { LoadIDService } from './examples';


function FindSavedBlocksComponent(props:SimpleDialogProps) {
 
    const [demoBlocks,setDemoBlocks]=useState(Array<DemoBlocks>(0))
    const { onClose, selectedValue, open } = props;
    
      const handleListItemClick = (value: string) => {
        onClose(value);
      };

      
  const handleClose = () => {
    onClose(selectedValue);
  };
  const closeAutoComplete=(
    event: React.SyntheticEvent,
    value: AutocompleteValue<DemoBlocks, boolean, boolean, boolean>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<DemoBlocks>,
  )=>{
    if(reason === 'selectOption'){
        var v= value as DemoBlocks;        
        onClose(v.id);
    }
  }

  const filterOptions = (options:DemoBlocks[],  inputValue:FilterOptionsState<DemoBlocks>) => {
    if((inputValue.inputValue?.length || 0 ) === 0)
      return options;
    var searchText=inputValue.inputValue.toLowerCase();
    var filtered = options.filter(it=>        
          it.description?.toLowerCase().indexOf(searchText)>-1
                || it.blocks?.toLowerCase().indexOf(searchText)>-1
                || it.categories?.toLowerCase().indexOf(searchText)>-1
                || it.id?.toLowerCase().indexOf(searchText)>-1
    );
    return filtered;
  };
  

    useEffect(()=>{

        if(demoBlocks.length>0)
            return;
        // LoadIDService.sendID("asdasd");
        var x= DemoBlocks.getDemoBlocks().subscribe(it=>{
            var arr = it.sort((a,b)=> a.description.localeCompare(b.description));
            setDemoBlocks(arr);
        });
        return ()=>x.unsubscribe();        
    },[demoBlocks]);
    return <>

    
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Load Examples</DialogTitle>
      <Autocomplete filterOptions={filterOptions} autoComplete={true}
        id="searchDemos"
        freeSolo
        
        onChange = {closeAutoComplete}
        getOptionLabel={(opt : DemoBlocks | string )=> (typeof opt === "string") ? opt:  opt.description}
        // options={demoBlocks.map((option,index) => `${index+1}) ${option.description}`)}
        options = {demoBlocks}
        renderInput={(params) => <TextField {...params} label="Search Demo" />}
      />
      <List sx={{ pt: 0 }}>
        {demoBlocks.map((d, index)=>(
          <ListItem button onClick={() => handleListItemClick(d.id)} key={d.id} >
            <ListItemText primary={`${index+1}) ${d.description}`} secondary={d.categories} />

         </ListItem>
        ))}

       
        {/* <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem> */}
      </List>
    </Dialog>
    </>;
}

export default FindSavedBlocksComponent;