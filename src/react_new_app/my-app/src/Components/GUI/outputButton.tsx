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
// import { saveLoadService } from '../../AppFiles/saveLoadService';
import { ShowData } from '../Examples/Messages';
import ShowCodeAndXML from './ShowCodeAndXML';
import { useEffect } from 'react';
const options =Object.values(ShowCodeAndXML).filter(it=> isNaN(Number(it)));

function OutputButton(props: any) {

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedValue, setselectedValue] = React.useState(ShowCodeAndXML.ShowOutputRaw);
  
    useEffect(()=>{
      var x=ShowData.getMessage().subscribe((it:ShowCodeAndXML)=>{                        
          console.log("received "+it);
          setselectedValue(it);
          
      });
      return ()=>x.unsubscribe();
  },[])
    
    var optionsSave=new Map<string,ShowCodeAndXML|string>();
    Object.entries(ShowCodeAndXML).map(([number, word]) => ({ number, word })).forEach(it=>optionsSave.set(it.number,it.word));
    // console.log(optionsSave);


    const handleClick = () => {
      ClickOnIndex(selectedValue);
    };

    const ClickOnIndex=(e:ShowCodeAndXML)=>{
      // var sel=options[index].toString();
      // var e= optionsSave.get(sel) ;
      switch(e){
        case ShowCodeAndXML.ShowCodeBlocks:
        case ShowCodeAndXML.ShowCodeJavascript:
        case ShowCodeAndXML.ShowOutputRaw:
        case ShowCodeAndXML.ShowOutputHtml:
        case ShowCodeAndXML.ShowCodeXml:  
        case ShowCodeAndXML.ShowOutputJson: 
        case ShowCodeAndXML.ShowOutputNone:
        case ShowCodeAndXML.ShowCodeJson:
          // console.log('send'+ e);        
          ShowData.sendMessage(e);
          return;
        
        default:
            window.alert( `OutputButton => ${e} is not implemented`);
            return;
    }
    }
    
    const handleMenuItemClick = (
      event: React.MouseEvent<HTMLLIElement, MouseEvent>,
      index: number,
      key: string | ShowCodeAndXML
    ) => {
      var data=ShowCodeAndXML.ShowOutputNone;
      if(typeof(key)=== "string"){
        data=Object.values(ShowCodeAndXML).indexOf(key as unknown as ShowCodeAndXML);
      }
      else{
        data=key;
      }
      
      setselectedValue(data);
      setOpen(false);
      ClickOnIndex(data);
    };
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
    const ReInterpretOpt=(opt:string|ShowCodeAndXML):string=>{
      if(typeof opt === "string"){
        const re=/[A-Z][a-z]+|[0-9]+/g;
        return opt.match(re)!.join(" ");
      }
      //it is the enum
      console.log(opt, typeof(opt),Object.keys(ShowCodeAndXML));
      return  ReInterpretOpt(ShowCodeAndXML[opt]as string);
    }
    const handleClose = (event: Event) => {
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }
  
      setOpen(false);
    };
  
    return (
      <React.Fragment>
        <ButtonGroup className="stepTourOutputButton" variant="contained" ref={anchorRef} aria-label="split button">
          <Button onClick={handleClick}>{ReInterpretOpt(selectedValue)}</Button>
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
                    {options.sort((a,b)=>-a.toLocaleString().localeCompare(b.toLocaleString())).map((option, index)=> (
                      <MenuItem
                        key={option}
                        // disabled={index === 0}
                        selected={index === selectedValue}
                        onClick={(event) => handleMenuItemClick(event, index, option)}
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

export default OutputButton;