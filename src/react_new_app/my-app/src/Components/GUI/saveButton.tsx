import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
//import { saveLoadService } from '../../AppFiles/saveLoadService';
import { SaveLocation } from './SaveLocation';
import { MustSave } from '../Examples/Messages';
//import { useRef } from 'react';
const options =Object.values(SaveLocation).filter(it=> isNaN(Number(it)));

function SaveButton(props: any) {
    
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
  
    var optionsSave=new Map<string,SaveLocation|string>();
    Object.entries(SaveLocation).map(([number, word]) => ({ number, word })).forEach(it=>optionsSave.set(it.number,it.word));
    // console.log(optionsSave);


    const handleClick = () => {
      ClickOnIndex(selectedIndex);
        
    };

    const ClickOnIndex=(index:number)=>{
      var sel=options[index].toString();
      var e= optionsSave.get(sel) ;
      
      switch(e){
          case SaveLocation.Save_Local:
            // console.log('test');
            MustSave.sendMessage(e);
            return;
          case SaveLocation.Download_Blocks:
              MustSave.sendMessage(e);
             return;
          case SaveLocation.LoadBlocks:
              MustSave.sendMessage(e);
              
              return;
          default:
              window.alert( `SaveButton => ${e} is not implemented`);
              return;
      }
    };
    
    const handleMenuItemClick = (
      event: React.MouseEvent<HTMLLIElement, MouseEvent>,
      index: number,
    ) => {
      setSelectedIndex(index);
      setOpen(false);
      ClickOnIndex(index);
    };
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event: Event) => {
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }
  
      setOpen(false);
    };
    const ReInterpretOpt=(opt:string|SaveLocation)=>{
      if(!opt)
        return opt;
      if(typeof opt === "string"){
        const re=/[A-Z][a-z]+|[0-9]+/g;
        return opt.match(re)!.join(" ");
      }
      return  opt+"!";
    }

    return (
      <React.Fragment>
     
        <ButtonGroup className='stepTourDownload' variant="contained" ref={anchorRef} aria-label="split button">
          <Button onClick={handleClick}>{ReInterpretOpt(options[selectedIndex])}</Button>
          <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {ReInterpretOpt(option)}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    );
  }

export default SaveButton;