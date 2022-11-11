
import React, { useEffect, useState } from 'react';
import './App.css';
import SendIcon from '@mui/icons-material/Send';

import logo from './logo.svg';

// import BlocklyComponent, { Block, Value, Field, Shadow } from './Blockly';

// import './Blocks/customBlocks';
// import './generator/generator';
import Blockly from 'blockly/core';
import  BlocklyComponent, { BlockReact,  CategoryReact, Field, Mutation, Shadow, Value } from './BlocklyFields';
import { Alert,  AppBar, Box, Button, IconButton,  Snackbar, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { javascriptGenerator } from 'blockly/javascript';
import waitBlock from './BlocklyReusable/BlocklyNewBlocks/wait_block';
import FindSavedBlocksComponent from './Components/Examples/FindSavedBlocksComponent';
import SaveButton from './Components/GUI/saveButton';
import DemoBlocks from './Components/Examples/DemoBlocks';
import { LoadIDService, MustSave, RunCode, RunCodeData, RunCodeMessage, ShowData } from './Components/Examples/Messages';
import CurrentDateBlock from './BlocklyReusable/BlocklyNewBlocks/CurrentDateBlock';
import BlocklyDisplayText from './Components/GUI/BlocklyDisplayText';
import BlocklyDisplayData from './Components/GUI/BlocklyDisplayData';
import OutputButton from './Components/GUI/outputButton';
import ShowCodeAndXML from './Components/GUI/ShowCodeAndXML';
import { tts } from './BlocklyReusable/BlocklyNewBlocks/tts';
import { piano } from './BlocklyReusable/BlocklyNewBlocks/piano';
import {  CredsBlocks } from './BlocklyReusable/BlocklyNewBlocks/http/WindowsCreds';
import { HttpBlocks } from './BlocklyReusable/BlocklyNewBlocks/http/xhrBlocks';
import AllNewBlocks from './BlocklyReusable/allNewBlocks';
import { SettingsBA } from './Components/GUI/settings/Settings';

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
//   waitBlockInstance.definitionBlocks(javascriptGenerator);

//   var currentDateInstance =new CurrentDateBlock();
//   currentDateInstance.definitionBlocks(javascriptGenerator);

//   var ttsBlockInstance= new tts();
//   ttsBlockInstance.definitionBlocks(javascriptGenerator);


//   var pianoBlockInstance= new piano();
//   pianoBlockInstance.definitionBlocks(javascriptGenerator);

//   var credsInstance =new CredsBlocks();
//   credsInstance.definitionBlocks(javascriptGenerator);


//   var httpInstance =new HttpBlocks();
//   httpInstance.definitionBlocks(javascriptGenerator);

AllNewBlocks.Instance.NewBlocks().forEach(it=>{
    it.definitionBlocks(javascriptGenerator);
})

//   var dark = Blockly.Theme.defineTheme('darkAndrei',darkThemeData);
const [open, setOpen] = React.useState(false);

const [disabledRun, setdisabledRun] = React.useState(false);
const [selectedValue, setSelectedValue] = React.useState("");  
const handleRun = () => {
    ShowData.sendMessage(ShowCodeAndXML.ShowOutput);
    RunCode.sendMessage({runCodeData:RunCodeData.Start});
  };

const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
    // window.alert(value);
    
    LoadIDService.sendID(value);
    
  };

  useEffect(()=>{
    var x= new SettingsBA().getSettings().subscribe(it=>{        
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
                return;
            case RunCodeData.Stop:
                setdisabledRun(false);
                setShowSnack(false);
                
                return;
            case RunCodeData.UserRequestedPrint:
                return;
            default:
                window.alert('cannot interpret '+ it +' in app.tsx');
                return;
        }
    })

  },[]);

    return <>
<Snackbar open={showSnack} anchorOrigin= {{ 
  vertical: 'top' ,
  horizontal:  'center' 
}}    
>
<Alert  severity="success" sx={{ width: '100%' }}>
    Running code
  </Alert>
</Snackbar>
      <Box sx={{ flexGrow: 1 }}>
      {/* <span>{userWantshowLeftMenu?"true":"false"}</span> */}
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
            
            
            <Button variant="contained" onClick={handleClickOpen}>Examples!</Button>

            <SaveButton />

            <OutputButton />

          </Typography>
          {/* <Button color="inherit">Login </Button> */}
          <Button variant="contained" disabled={disabledRun} color={"success"}  endIcon={<SendIcon />} onClick={handleRun}>Execute!</Button>
        </Toolbar>
      </AppBar>
    </Box>

      <div className="App">
        <header className="App-header">

        
          <BlocklyComponent readOnly={false} 
          trashcan={true} media={'media/'}
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
            
            
            <CategoryReact name="Blockly Core">
<CategoryReact id="catLogic" colour="210" name="Logic">
    <BlockReact type="controls_if"></BlockReact>
    <BlockReact type="logic_compare"></BlockReact>
    <BlockReact type="logic_operation"></BlockReact>
    <BlockReact type="logic_negate"></BlockReact>
    <BlockReact type="logic_boolean"></BlockReact>
    <BlockReact type="logic_null"></BlockReact>
    <BlockReact type="logic_ternary"></BlockReact>
</CategoryReact>
<CategoryReact id="catLoops" colour="120" name="Loops">
    <BlockReact type="controls_repeat_ext">
        <Value name="TIMES">
            <Shadow type="math_number">
                <Field name="NUM">10</Field>
            </Shadow>
        </Value>
    </BlockReact>
    <BlockReact type="controls_whileUntil"></BlockReact>
    <BlockReact type="controls_for">
        <Value name="FROM">
            <Shadow type="math_number">
                <Field name="NUM">1</Field>
            </Shadow>
        </Value>
        <Value name="TO">
            <Shadow type="math_number">
                <Field name="NUM">10</Field>
            </Shadow>
        </Value>
        <Value name="BY">
            <Shadow type="math_number">
                <Field name="NUM">1</Field>
            </Shadow>
        </Value>
    </BlockReact>
    <BlockReact type="controls_forEach"></BlockReact>
    <BlockReact type="controls_flow_statements"></BlockReact>
</CategoryReact>
<CategoryReact id="catMath" colour="230" name="Math">
        <BlockReact type="math_number"></BlockReact>
        <BlockReact type="math_arithmetic">
            <Value name="A">
                <Shadow type="math_number">
                    <Field name="NUM">1</Field>
                </Shadow>
            </Value>
            <Value name="B">
                <Shadow type="math_number">
                    <Field name="NUM">1</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_single">
            <Value name="NUM">
                <Shadow type="math_number">
                    <Field name="NUM">9</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_trig">
            <Value name="NUM">
                <Shadow type="math_number">
                    <Field name="NUM">45</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_constant"></BlockReact>
        <BlockReact type="math_number_property">
            <Value name="NUMBER_TO_CHECK">
                <Shadow type="math_number">
                    <Field name="NUM">0</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_change">
            <Value name="DELTA">
                <Shadow type="math_number">
                    <Field name="NUM">1</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_round">
            <Value name="NUM">
                <Shadow type="math_number">
                    <Field name="NUM">3.1</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_on_list"></BlockReact>
        <BlockReact type="math_modulo">
            <Value name="DIVIDEND">
                <Shadow type="math_number">
                    <Field name="NUM">64</Field>
                </Shadow>
            </Value>
            <Value name="DIVISOR">
                <Shadow type="math_number">
                    <Field name="NUM">10</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_constrain">
            <Value name="value">
                <Shadow type="math_number">
                    <Field name="NUM">50</Field>
                </Shadow>
            </Value>
            <Value name="LOW">
                <Shadow type="math_number">
                    <Field name="NUM">1</Field>
                </Shadow>
            </Value>
            <Value name="HIGH">
                <Shadow type="math_number">
                    <Field name="NUM">100</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_random_int">
            <Value name="FROM">
                <Shadow type="math_number">
                    <Field name="NUM">1</Field>
                </Shadow>
            </Value>
            <Value name="TO">
                <Shadow type="math_number">
                    <Field name="NUM">100</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_random_float"></BlockReact>
    </CategoryReact>
    <CategoryReact id="catText" colour="160" name="Text">
        <BlockReact type="text"></BlockReact>
        <BlockReact type="text_join"></BlockReact>
        <BlockReact type="text_append">
            <Value name="TEXT">
                <Shadow type="text"></Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="text_length">
            <Value name="Value">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="text_isEmpty">
            <Value name="Value">
                <Shadow type="text">
                    <Field name="TEXT"></Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="text_indexOf">
            <Value name="Value">
                <BlockReact type="variables_get">
                    <Field name="VAR">text</Field>
                </BlockReact>
            </Value>
            <Value name="FIND">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="text_charAt">
            <Value name="Value">
                <BlockReact type="variables_get">
                    <Field name="VAR">text</Field>
                </BlockReact>
            </Value>
        </BlockReact>
        <BlockReact type="text_getSubstring">
            <Value name="STRING">
                <BlockReact type="variables_get">
                    <Field name="VAR">text</Field>
                </BlockReact>
            </Value>
        </BlockReact>
        <BlockReact type="text_changeCase">
            <Value name="TEXT">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="text_trim">
            <Value name="TEXT">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="text_print">
            <Value name="TEXT">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="text_prompt_ext">
            <Value name="TEXT">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </BlockReact>
    </CategoryReact>
    <CategoryReact id="catLists" colour="260" name="Lists">
        <BlockReact type="lists_create_with">
            <Mutation items="0"></Mutation>
        </BlockReact>
        <BlockReact type="lists_create_with"></BlockReact>
        <BlockReact type="lists_repeat">
            <Value name="NUM">
                <Shadow type="math_number">
                    <Field name="NUM">5</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="lists_length"></BlockReact>
        <BlockReact type="lists_isEmpty"></BlockReact>
        <BlockReact type="lists_indexOf">
            <Value name="Value">
                <BlockReact type="variables_get">
                    <Field name="VAR">list</Field>
                </BlockReact>
            </Value>
        </BlockReact>
        <BlockReact type="lists_getIndex">
            <Value name="Value">
                <BlockReact type="variables_get">
                    <Field name="VAR">list</Field>
                </BlockReact>
            </Value>
        </BlockReact>
        <BlockReact type="lists_setIndex">
            <Value name="LIST">
                <BlockReact type="variables_get">
                    <Field name="VAR">list</Field>
                </BlockReact>
            </Value>
        </BlockReact>
        <BlockReact type="lists_getSublist">
            <Value name="LIST">
                <BlockReact type="variables_get">
                    <Field name="VAR">list</Field>
                </BlockReact>
            </Value>
        </BlockReact>
        <BlockReact type="lists_split">
            <Value name="DELIM">
                <Shadow type="text">
                    <Field name="TEXT">,</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="lists_sort"></BlockReact>
    </CategoryReact>
    <CategoryReact id="catColour" colour="20" name="Color">
        <BlockReact type="colour_picker"></BlockReact>
        <BlockReact type="colour_random"></BlockReact>
        <BlockReact type="colour_rgb">
            <Value name="RED">
                <Shadow type="math_number">
                    <Field name="NUM">100</Field>
                </Shadow>
            </Value>
            <Value name="GREEN">
                <Shadow type="math_number">
                    <Field name="NUM">50</Field>
                </Shadow>
            </Value>
            <Value name="BLUE">
                <Shadow type="math_number">
                    <Field name="NUM">0</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="colour_blend">
            <Value name="COLOUR1">
                <Shadow type="colour_picker">
                    <Field name="COLOUR">#ff0000</Field>
                </Shadow>
            </Value>
            <Value name="COLOUR2">
                <Shadow type="colour_picker">
                    <Field name="COLOUR">#3333ff</Field>
                </Shadow>
            </Value>
            <Value name="RATIO">
                <Shadow type="math_number">
                    <Field name="NUM">0.5</Field>
                </Shadow>
            </Value>
        </BlockReact>
    </CategoryReact>
    <CategoryReact id="catVariables" colour="330" custom="VARIABLE" name="Variables"></CategoryReact>
    <CategoryReact id="catFunctions" colour="290" custom="PROCEDURE" name="Functions"></CategoryReact>

</CategoryReact>
<CategoryReact name="Advanced">
    {/* TODO:register from fieldXML */}
    <CategoryReact id="Audio" name="Audio">
    <BlockReact type="ttsBlock">
        <Value name="NAME">
            <Shadow type="text">
            <Field name="TEXT">Hello</Field></Shadow>
        </Value>       
        </BlockReact>

        <BlockReact type="pianoBlock">
        <Value name="Note">
            <Shadow type="text">
            <Field name="TEXT">C</Field></Shadow>
        </Value>       
        <Value name="Octave">
            <Shadow type="math_number">
            <Field name="NUM">4</Field></Shadow>
        </Value>       
        <Value name="Sharp">
            <Shadow type="logic_boolean">
            <Field name="BOOL">FALSE</Field></Shadow>
        </Value>       
        
        <Value name="Duration">
            <Shadow type="math_number">
            <Field name="NUM">2</Field></Shadow>
        </Value>       
        </BlockReact>
        <BlockReact type="cmajor"></BlockReact>
    </CategoryReact>

<CategoryReact id="catTimers"  name="Timers">
    <BlockReact type={waitBlock.nameBlock}></BlockReact>
</CategoryReact>

<CategoryReact id="catDates"  name="Dates">
<BlockReact type="text_print" >
    <Value name="TEXT">
    <BlockReact type="displayCurrentDate"></BlockReact>
    </Value>
    </BlockReact>
</CategoryReact>

<CategoryReact id="XHR" name="HTTP Request">

<BlockReact type="headersbeforehttp">
    <Value name="HttpDomain">
        <Shadow type="text">
            <Field name="TEXT">(localSite)</Field>
        </Shadow>
    </Value>
    <Value name="HeaderName">
        <Shadow type="text">
            <Field name="TEXT">Authorization</Field>
        </Shadow>
    </Value>
    <Value name="HeaderValue">
        <Shadow type="text_join">

        </Shadow>
    </Value>
</BlockReact>
<BlockReact type="text_print">
<Value name="TEXT">

    <BlockReact type="httprequest">
    <Value name="TheUrl">
        <Shadow type="text">
            <Field name="TEXT">https://httpbin.org/get</Field>
        </Shadow>
    </Value>
</BlockReact>
</Value>
</BlockReact>    



<BlockReact type="credsforhttp">
    <Value name="HttpDomain">
        <Shadow type="text">
            <Field name="TEXT">(localSite)</Field>
        </Shadow>
    </Value>
    <Value name="WithCreds">
        <Shadow type="logic_boolean">
            <Field name="BOOL">FALSE</Field>
        </Shadow>
    </Value>
</BlockReact>

</CategoryReact>

</CategoryReact>

          </BlocklyComponent>
        <div id="blocklyDisplay">
            
          <BlocklyDisplayData></BlocklyDisplayData>
         </div>

        </header>
      </div>
    </>;
}

export default App;
function renderToString(arg0: string) {
    throw new Error('Function not implemented.');
}

