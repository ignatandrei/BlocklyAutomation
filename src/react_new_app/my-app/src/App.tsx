
import React, { useEffect, useState } from 'react';
import './App.css';
import SendIcon from '@mui/icons-material/Send';

// import logo from './logo.svg';

// import BlocklyComponent, { Block, Value, Field, Shadow } from './Blockly';

// import './Blocks/customBlocks';
// import './generator/generator';
import Blockly from 'blockly/core';
import  BlocklyComponent from './BlocklyFields';
import { Alert,  AppBar, Box, Button, IconButton,  Snackbar, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { javascriptGenerator } from 'blockly/javascript';
// import waitBlock from './BlocklyReusable/BlocklyNewBlocks/timers/wait_block';
import FindSavedBlocksComponent from './Components/Examples/FindSavedBlocksComponent';
import SaveButton from './Components/GUI/saveButton';
// import DemoBlocks from './Components/Examples/DemoBlocks';
import { LoadIDService,  LoadTourSteps,  RunCode, RunCodeData, RunCodeMessage, ShowData } from './Components/Examples/Messages';
// import CurrentDateBlock from './BlocklyReusable/BlocklyNewBlocks/dates/CurrentDateBlock';
// import BlocklyDisplayText from './Components/GUI/BlocklyDisplayText';
import BlocklyDisplayData from './Components/GUI/BlocklyDisplayData';
// import OutputButton from './Components/GUI/outputButton';
import ShowCodeAndXML from './Components/GUI/ShowCodeAndXML';
// import { tts } from './BlocklyReusable/BlocklyNewBlocks/tts';
// import { piano } from './BlocklyReusable/BlocklyNewBlocks/piano';
// import {  CredsBlocks } from './BlocklyReusable/BlocklyNewBlocks/http/WindowsCreds';
// import { HttpBlocks } from './BlocklyReusable/BlocklyNewBlocks/http/xhrBlocks';
import AllNewBlocks from './BlocklyReusable/allNewBlocks';
import { SettingsBA } from './Components/GUI/settings/Settings';


import ToolboxBlocksCore from './Components/ToolboxBlocksCore';
import ToolboxBlocksAdvanced from './Components/ToolboxBlocksAdvanced';
// import About from './Components/GUI/about';
import {  IBlocksExtMut, IBlocksSimple } from './BlocklyReusable/blocksInterface';
import TourMainPage from './Components/GUI/tour';
import OutputButton from './Components/GUI/outputButton';
// import darkThemeData from './BlocklyReusable/themeDark';
function App(props: any) {


  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [userWantshowLeftMenu, showLeftMenu] = useState(false);
  const[showSnack, setShowSnack]=useState(false);
  const showMenu = (event: React.MouseEvent<HTMLElement>) => {
    showLeftMenu((prevState) => !prevState)
  }
  const [titleBA, setTitleBA]= useState("Blockly Autopmation")
//   var waitBlockInstance=new waitBlock();
//   waitBlockInstance.definitionBlocksSimple(blocks: any,javascriptGenerator);

//   var currentDateInstance =new CurrentDateBlock();
//   currentDateInstance.definitionBlocksSimple(blocks: any,javascriptGenerator);

//   var ttsBlockInstance= new tts();
//   ttsBlockInstance.definitionBlocksSimple(blocks: any,javascriptGenerator);


//   var pianoBlockInstance= new piano();
//   pianoBlockInstance.definitionBlocksSimple(blocks: any,javascriptGenerator);

//   var credsInstance =new CredsBlocks();
//   credsInstance.definitionBlocksSimple(blocks: any,javascriptGenerator);


//   var httpInstance =new HttpBlocks();
//   httpInstance.definitionBlocksSimple(blocks: any,javascriptGenerator);

AllNewBlocks.Instance.NewBlocks().forEach(it=>{
    if(AllNewBlocks.isSimple(it)){
      (it as IBlocksSimple).definitionBlocksSimple(Blockly.Blocks,javascriptGenerator);
    }
    if(AllNewBlocks.isExtMut(it)){
      (it as IBlocksExtMut).definitionBlocksExtMut(Blockly.Blocks,javascriptGenerator, Blockly.Extensions,Blockly.Mutator);
    }
    
    //it.
})

//   var dark = Blockly.Theme.defineTheme('darkAndrei',darkThemeData);
const [open, setOpen] = React.useState(false);
const [disabledRun, setdisabledRun] = React.useState(false);
const [selectedValue, setSelectedValue] = React.useState(""); 
const [showDisplay,setShowDisplay]=  React.useState(true); 
const handleRun = () => {
  //maybe do this only if we are on inner workings?    
    ShowData.sendMessage(ShowCodeAndXML.ShowOutputRaw);
    RunCode.sendMessage({runCodeData:RunCodeData.Start});
  };

  useEffect(()=>{
    var x=ShowData.getMessage().subscribe(it=>{            
        switch(it){
            case ShowCodeAndXML.ShowOutputRaw:
            case ShowCodeAndXML.ShowOutputHtml:
            case ShowCodeAndXML.ShowOutputJson:
            case ShowCodeAndXML.ShowCodeJavascript:
            case ShowCodeAndXML.ShowCodeXml:
            case ShowCodeAndXML.ShowCodeBlocks:
              setShowDisplay(true);
              return;
            case ShowCodeAndXML.ShowOutputNone:
              setShowDisplay(false);
              return;
            default:     
                window.alert('in app.tsx not implemented '+it);
        }
    });
    return ()=>x.unsubscribe();
},[]);
const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
    // window.alert(value);
    
    // LoadIDService.sendID(value);
    const baseUrl=process.env.PUBLIC_URL+'/';
    var urlToRedirect= baseUrl+`automation/loadexample/${value}`;
    //window.open(urlToRedirect);
    console.log('send the id to '+value);
    LoadIDService.sendID(value);
    RunCode.sendSimpleMessage('the url for this sample is:' + urlToRedirect);
    //history.push(urlToRedirect);
    //return redirect(urlToRedirect);
    //return  <Redirect  to="/posts/" />
  };

  useEffect(()=>{
    var x= new SettingsBA().getSettings().subscribe(it=>{      
          document.title= it.title;
          LoadTourSteps.sendTS(it.tourSteps);

        setTitleBA(it.title);
    });
    return ()=>x.unsubscribe();
  },[setTitleBA])
//   const dataX= <>('<CategoryReact id="asdasd" colour="210" name="Loasdasgic"><BlockReact type="controls_if"></BlockReact></CategoryReact>')</>;
  useEffect(()=>{
    var x= RunCode.getMessage().subscribe((it:RunCodeMessage)=>{
        // var data=it;
        // if(!Number.isNaN(Number(it)){
        //     data=RunCodeData[it];
        // }
        switch(it.runCodeData){
            case RunCodeData.Start:
                setdisabledRun(true);
                setShowSnack(true);
                break;
            case RunCodeData.Stop:
                setdisabledRun(false);
                setShowSnack(false);
                
                break;
            case RunCodeData.CodeError:
            case RunCodeData.UserRequestedPrint:
                break;
            default:
                window.alert('cannot interpret '+ it +' in app.tsx');
                break;
        }
    });
    return ()=>x.unsubscribe();

  },[]);

    return <>
<Snackbar open={showSnack} anchorOrigin= {{ 
  vertical: 'top' ,
  horizontal:  'right' 
}}    
>
<Alert  severity="success" sx={{ width: '100%' }}>
    Running code
  </Alert>
</Snackbar>
      <Box sx={{ flexGrow: 1 }}>
      <span>{userWantshowLeftMenu?"  ":" "}</span>
      {/* <span>{isMobile ? <>(
          mobil
        )</>: <>(not mobil)</>
        }</span> */}
    <FindSavedBlocksComponent
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
      <AppBar position="static" color="secondary">
        
        <Toolbar>
          {isMobile &&
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={showMenu}
            >
              <MenuIcon />
            </IconButton>
          }
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           {titleBA}
           {/* <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small> */}
           <TourMainPage></TourMainPage>  
            <Button className='stepTourDemos' variant="contained" onClick={handleClickOpen}>Examples!</Button>

            <SaveButton />

            <OutputButton />

          </Typography>
          
          {/* <Button color="inherit">Login </Button> */}
          <Button id="execute" className='stepTourRunButton' variant="contained" disabled={disabledRun} color={"success"}  endIcon={<SendIcon />} onClick={handleRun}>Execute!</Button>
        </Toolbar>
      </AppBar>
    </Box>

      <div className="App">
        <header className="App-header">

        
          <BlocklyComponent readOnly={false} 
          trashcan={true} media={`${process.env.PUBLIC_URL}/media/`}
          renderer={'thrasos'}
        theme={Blockly.Themes.Classic}
        zoom= {{
            controls: true,
          }}

          move={{
            scrollbars: true,
            drag: true,
            wheel: true
          }}
          
          initialXml={`
<xml xmlns="http://www.w3.org/1999/xhtml">
<BlockReact type="controls_ifelse" x="0" y="0"></BlockReact>
</xml>
      `}>
            {/* {dataX} */}
            <ToolboxBlocksCore />
            <ToolboxBlocksAdvanced />
            
                      </BlocklyComponent>
                      {showDisplay &&
        <div id="blocklyDisplay">
            
          <BlocklyDisplayData></BlocklyDisplayData>
         </div>
}
        </header>
      </div>
      
    </>;
}

export default App;


