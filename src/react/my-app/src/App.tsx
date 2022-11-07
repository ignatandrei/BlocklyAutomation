
import React, { useEffect, useState } from 'react';
import './App.css';
import SendIcon from '@mui/icons-material/Send';

import logo from './logo.svg';

// import BlocklyComponent, { Block, Value, Field, Shadow } from './Blockly';

// import './Blocks/customBlocks';
// import './generator/generator';
import Blockly from 'blockly/core';
import  BlocklyComponent, { Block, Category, Field, Mutation, Shadow, Value } from './BlocklyFields';
import { Alert,  AppBar, Box, Button, IconButton,  Snackbar, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { javascriptGenerator } from 'blockly/javascript';
import waitBlock from './BlocklyReusable/BlocklyNewBlocks/wait_block';
import FindSavedBlocksComponent from './Components/Examples/FindSavedBlocksComponent';
import SaveButton from './Components/GUI/saveButton';
import DemoBlocks from './Components/Examples/DemoBlocks';
import { LoadIDService, MustSave, RunCode, RunCodeData, RunCodeMessage } from './Components/Examples/Messages';
import CurrentDateBlock from './BlocklyReusable/BlocklyNewBlocks/CurrentDateBlock';
import BlocklyDisplayText from './Components/GUI/BlocklyDisplayText';
// import darkThemeData from './BlocklyReusable/themeDark';
function App(props: any) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [userWantshowLeftMenu, showLeftMenu] = useState(false);
  const[showSnack, setShowSnack]=useState(false);
  const showMenu = (event: React.MouseEvent<HTMLElement>) => {
    showLeftMenu((prevState) => !prevState)
  }
  var waitBlockInstance=new waitBlock();
  waitBlockInstance.definitionBlocks(javascriptGenerator);

  var currentDateInstance =new CurrentDateBlock();
  currentDateInstance.definitionBlocks(javascriptGenerator);
  
//   var dark = Blockly.Theme.defineTheme('darkAndrei',darkThemeData);
const [open, setOpen] = React.useState(false);

const [disabledRun, setdisabledRun] = React.useState(false);
const [selectedValue, setSelectedValue] = React.useState("");  
const handleRun = () => {
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
            Blockly Automation 
            
            
            <Button variant="contained" onClick={handleClickOpen}>Examples</Button>

            <SaveButton />

          </Typography>
          {/* <Button color="inherit">Login </Button> */}
          <Button variant="contained" disabled={disabledRun} color={"success"}  endIcon={<SendIcon />} onClick={handleRun}>Run!</Button>
        </Toolbar>
      </AppBar>
    </Box>

      <div className="App">
        <header className="App-header">

        
          <BlocklyComponent readOnly={false} 
          trashcan={true} media={'media/'}
          renderer={'thrasos'}
        theme={Blockly.Themes.Classic}

          move={{
            scrollbars: true,
            drag: true,
            wheel: true
          }}
          initialXml={`
<xml xmlns="http://www.w3.org/1999/xhtml">
<Block type="controls_ifelse" x="0" y="0"></Block>
</xml>
      `}>
            {/* <Block type="test_react_Field" /> */}
            {/* <Block type="test_react_date_Field" /> */}
            <Category name="Blockly Core">

<Category id="catLogic" colour="210" name="Logic">
    <Block type="controls_if"></Block>
    <Block type="logic_compare"></Block>
    <Block type="logic_operation"></Block>
    <Block type="logic_negate"></Block>
    <Block type="logic_boolean"></Block>
    <Block type="logic_null"></Block>
    <Block type="logic_ternary"></Block>
</Category>
<Category id="catLoops" colour="120" name="Loops">
    <Block type="controls_repeat_ext">
        <Value name="TIMES">
            <Shadow type="math_number">
                <Field name="NUM">10</Field>
            </Shadow>
        </Value>
    </Block>
    <Block type="controls_whileUntil"></Block>
    <Block type="controls_for">
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
    </Block>
    <Block type="controls_forEach"></Block>
    <Block type="controls_flow_statements"></Block>
</Category>
<Category id="catMath" colour="230" name="Math">
        <Block type="math_number"></Block>
        <Block type="math_arithmetic">
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
        </Block>
        <Block type="math_single">
            <Value name="NUM">
                <Shadow type="math_number">
                    <Field name="NUM">9</Field>
                </Shadow>
            </Value>
        </Block>
        <Block type="math_trig">
            <Value name="NUM">
                <Shadow type="math_number">
                    <Field name="NUM">45</Field>
                </Shadow>
            </Value>
        </Block>
        <Block type="math_constant"></Block>
        <Block type="math_number_property">
            <Value name="NUMBER_TO_CHECK">
                <Shadow type="math_number">
                    <Field name="NUM">0</Field>
                </Shadow>
            </Value>
        </Block>
        <Block type="math_change">
            <Value name="DELTA">
                <Shadow type="math_number">
                    <Field name="NUM">1</Field>
                </Shadow>
            </Value>
        </Block>
        <Block type="math_round">
            <Value name="NUM">
                <Shadow type="math_number">
                    <Field name="NUM">3.1</Field>
                </Shadow>
            </Value>
        </Block>
        <Block type="math_on_list"></Block>
        <Block type="math_modulo">
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
        </Block>
        <Block type="math_constrain">
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
        </Block>
        <Block type="math_random_int">
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
        </Block>
        <Block type="math_random_float"></Block>
    </Category>
    <Category id="catText" colour="160" name="Text">
        <Block type="text"></Block>
        <Block type="text_join"></Block>
        <Block type="text_append">
            <Value name="TEXT">
                <Shadow type="text"></Shadow>
            </Value>
        </Block>
        <Block type="text_length">
            <Value name="Value">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </Block>
        <Block type="text_isEmpty">
            <Value name="Value">
                <Shadow type="text">
                    <Field name="TEXT"></Field>
                </Shadow>
            </Value>
        </Block>
        <Block type="text_indexOf">
            <Value name="Value">
                <Block type="variables_get">
                    <Field name="VAR">text</Field>
                </Block>
            </Value>
            <Value name="FIND">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </Block>
        <Block type="text_charAt">
            <Value name="Value">
                <Block type="variables_get">
                    <Field name="VAR">text</Field>
                </Block>
            </Value>
        </Block>
        <Block type="text_getSubstring">
            <Value name="STRING">
                <Block type="variables_get">
                    <Field name="VAR">text</Field>
                </Block>
            </Value>
        </Block>
        <Block type="text_changeCase">
            <Value name="TEXT">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </Block>
        <Block type="text_trim">
            <Value name="TEXT">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </Block>
        <Block type="text_print">
            <Value name="TEXT">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </Block>
        <Block type="text_prompt_ext">
            <Value name="TEXT">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </Block>
    </Category>
    <Category id="catLists" colour="260" name="Lists">
        <Block type="lists_create_with">
            <Mutation items="0"></Mutation>
        </Block>
        <Block type="lists_create_with"></Block>
        <Block type="lists_repeat">
            <Value name="NUM">
                <Shadow type="math_number">
                    <Field name="NUM">5</Field>
                </Shadow>
            </Value>
        </Block>
        <Block type="lists_length"></Block>
        <Block type="lists_isEmpty"></Block>
        <Block type="lists_indexOf">
            <Value name="Value">
                <Block type="variables_get">
                    <Field name="VAR">list</Field>
                </Block>
            </Value>
        </Block>
        <Block type="lists_getIndex">
            <Value name="Value">
                <Block type="variables_get">
                    <Field name="VAR">list</Field>
                </Block>
            </Value>
        </Block>
        <Block type="lists_setIndex">
            <Value name="LIST">
                <Block type="variables_get">
                    <Field name="VAR">list</Field>
                </Block>
            </Value>
        </Block>
        <Block type="lists_getSublist">
            <Value name="LIST">
                <Block type="variables_get">
                    <Field name="VAR">list</Field>
                </Block>
            </Value>
        </Block>
        <Block type="lists_split">
            <Value name="DELIM">
                <Shadow type="text">
                    <Field name="TEXT">,</Field>
                </Shadow>
            </Value>
        </Block>
        <Block type="lists_sort"></Block>
    </Category>
    <Category id="catColour" colour="20" name="Color">
        <Block type="colour_picker"></Block>
        <Block type="colour_random"></Block>
        <Block type="colour_rgb">
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
        </Block>
        <Block type="colour_blend">
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
        </Block>
    </Category>
    <Category id="catVariables" colour="330" custom="VARIABLE" name="Variables"></Category>
    <Category id="catFunctions" colour="290" custom="PROCEDURE" name="Functions"></Category>

</Category>
<Category name="Advanced">
    {/* TODO:register from fieldXML */}
<Category id="catTimers"  name="Timers">
    <Block type={waitBlock.nameBlock}></Block>
</Category>
</Category>
            {/* <Block type="controls_ifelse" />
            <Block type="logic_compare" />
            <Block type="logic_operation" />
            <Block type="controls_repeat_ext">
              <Value name="TIMES">
                <Shadow type="math_number">
                  <Field name="NUM">10</Field>
                </Shadow>
              </Value>
            </Block>
            <Block type="logic_operation" />
            <Block type="logic_negate" />
            <Block type="logic_boolean" />
            <Block type="logic_null" disabled="true" />
            <Block type="logic_ternary" />
            <Block type="text_charAt">
              <Value name="Value">
                <Block type="variables_get">
                  <Field name="VAR">text</Field>
                </Block>
              </Value>
            </Block> */}
          </BlocklyComponent>
        <div id="blocklyDisplay">
            asdasd
          <BlocklyDisplayText></BlocklyDisplayText>
         </div>

        </header>
      </div>
    </>;
}

export default App;
