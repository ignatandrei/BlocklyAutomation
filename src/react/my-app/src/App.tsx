
import React, { useState } from 'react';
import './App.css';

import logo from './logo.svg';

// import BlocklyComponent, { Block, Value, Field, Shadow } from './Blockly';

// import './blocks/customblocks';
// import './generator/generator';
import BlocklyComponent from './Blockly/BlocklyComponent';
import { Block, Field, Shadow, Value } from './Blockly';
import { AppBar, Box, Button, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
function App(props: any) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [userWantshowLeftMenu, showLeftMenu] = useState(false);
  const showMenu = (event: React.MouseEvent<HTMLElement>) => {
    showLeftMenu((prevState) => !prevState)
  }
    return <>

      <Box sx={{ flexGrow: 1 }}>
      {/* <span>{userWantshowLeftMenu?"true":"false"}</span> */}
      {/* <span>{isMobile ? <>(
          mobil
        )</>: <>(not mobil)</>
        }</span> */}

      <AppBar position="static">
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
          </Typography>
          <Button color="inherit">Login </Button>
        </Toolbar>
      </AppBar>
    </Box>

      <div className="App">
        <header className="App-header">
          <BlocklyComponent readOnly={false} 
          trashcan={true} media={'media/'}
          move={{
            scrollbars: true,
            drag: true,
            wheel: true
          }}
          initialXml={`
<xml xmlns="http://www.w3.org/1999/xhtml">
<block type="controls_ifelse" x="0" y="0"></block>
</xml>
      `}>
            {/* <Block type="test_react_field" /> */}
            {/* <Block type="test_react_date_field" /> */}
            <Block type="controls_ifelse" />
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
              <Value name="VALUE">
                <Block type="variables_get">
                  <Field name="VAR">text</Field>
                </Block>
              </Value>
            </Block>
          </BlocklyComponent>
        </header>
      </div>
    </>;
}

export default App;
