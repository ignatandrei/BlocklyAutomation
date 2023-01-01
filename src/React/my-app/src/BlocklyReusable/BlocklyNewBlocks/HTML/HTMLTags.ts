import * as Blockly from 'blockly/core';
import { IBlocksSimple } from '../../blocksInterface';


export class HTMLTags implements IBlocksSimple{
  addWrapper(interpreter: any, globalObject: any) {
    
  }
  category: string='HTML';
  definitionBlocksSimple(blocks: any, javaScript: any) {
    blocks['HTMLheaders'] = {
      init: function () {
        this.appendValueInput('NAME')
          .setCheck(null)
          .appendField('Header')
          .appendField(
            new Blockly.FieldDropdown([
              ['H1', 'H1'],
              ['H2', 'H2'],
              ['H3', 'H3'],
            ]),
            'NAME'
          );
        this.setOutput(true, null);
        this.setColour(240);
        this.setTooltip('string to Header ');
        this.setHelpUrl('');
      },
    };

    javaScript['HTMLheaders'] = function (block: any) {
      var dropdown_name = block.getFieldValue('NAME');
      var value_name = javaScript.valueToCode(
        block,
        'NAME',
        javaScript.ORDER_ATOMIC
      );
      // if(value_name.startsWith("'") && value_name.endsWith("'")){
      //   value_name= value_name.substring(1,value_name.length-1);
      // }
      // console.log('_x',value_name);

      var code = `'<${dropdown_name}>'+ ${value_name} + '</${dropdown_name}>'`;
      return [code, javaScript.ORDER_NONE];
    };

    blocks['HTMLlist'] = {
      init: function () {
        this.appendDummyInput()
          .appendField('List ')
          .appendField(
            new Blockly.FieldDropdown([
              ['OL', 'ol'],
              ['UL', 'ul'],
            ]),
            'listType'
          );
        this.appendStatementInput('Content').setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(240);
        this.setTooltip('list - please add li block ');
        this.setHelpUrl('');
      },
    };

    javaScript['HTMLlist'] = function (block: any) {
      var dropdown_listtype = block.getFieldValue('listType');
      // var value_listtype = javaScript.valueToCode(
      //   block,
      //   'ListType',
      //   javaScript.ORDER_ATOMIC
      // );
      var statements_content = javaScript.statementToCode(block, 'Content');

      var code = `window.alert('<${dropdown_listtype}>');\n;${statements_content};\n;window.alert('</${dropdown_listtype}>');\n`;

      return code;
    };

    blocks['HTMLli'] = {
      init: function () {
        this.appendValueInput('NAME').setCheck(null).appendField('LI');
        this.setOutput(true, null);
        this.setColour(240);
        this.setTooltip('string to LI');
        this.setHelpUrl('');
      },
    };

    javaScript['HTMLli'] = function (block: any) {
      var value_name = javaScript.valueToCode(
        block,
        'NAME',
        javaScript.ORDER_ATOMIC
      );
      // if(value_name.startsWith("'") && value_name.endsWith("'")){
      //   value_name= value_name.substring(1,value_name.length-1);
      // }
      // console.log('_x',value_name);

      var code = `'<li>'+ ${value_name} + '</li>'`;
      return [code, javaScript.ORDER_NONE];
    };

    blocks['HTMLliStart'] = {
      init: function () {
        this.appendDummyInput()
          .appendField('List')
          .appendField(
            new Blockly.FieldDropdown([
              ['OL', 'OL'],
              ['UL', 'UL'],
            ]),
            'NAME'
          );
        this.setColour(240);
        this.setOutput(true, null);
        this.setTooltip('LI start');
        this.setHelpUrl('');
      },
    };
    javaScript['HTMLliStart'] = function (block: any) {
      var dropdown_name = block.getFieldValue('NAME');
      var code = `'<${dropdown_name}>'`;
      return [code, javaScript.ORDER_NONE];
    };

    blocks['HTMLliStop'] = {
      init: function () {
        this.appendDummyInput()
          .appendField('/List')
          .appendField(
            new Blockly.FieldDropdown([
              ['OL', 'OL'],
              ['UL', 'UL'],
            ]),
            'NAME'
          );
        this.setColour(240);
        this.setOutput(true, null);
        this.setTooltip('LI stop');
        this.setHelpUrl('');
      },
    };
    javaScript['HTMLliStop'] = function (block: any) {
      var dropdown_name = block.getFieldValue('NAME');
      var code = `'</${dropdown_name}>'`;
      return [code, javaScript.ORDER_NONE];
    };


    blocks['HTMLlinkFromObject'] = {
      init: function () {
        this.appendDummyInput()
          .appendField('Object=>Link')
          .appendField('target')
          .appendField(
            new Blockly.FieldDropdown([
              ['_blank', '_blank'],
              ['_self', '_self'],
              ['_parent', '_parent'],
              ['_top', '_top'],
            ]),
            'targetDrop'
          );
        this.appendValueInput('objectProp').setCheck(null).appendField('objectProp');
        this.appendValueInput('textProp').setCheck(null).appendField('textProp');
        this.appendValueInput('hrefProp').setCheck(null).appendField('hrefProp');
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };

    javaScript['HTMLlinkFromObject'] = function (block: any) {
      var dropdown_targetdrop = block.getFieldValue('targetDrop');
      var value_href = javaScript.valueToCode(
        block,
        'hrefProp',
        javaScript.ORDER_MEMBER
      );
      var value_text = javaScript.valueToCode(
        block,
        'textProp',
        javaScript.ORDER_ATOMIC
      );
      var value_object = javaScript.valueToCode(
        block,
        'objectProp',
        javaScript.ORDER_ATOMIC
      );
      value_text = value_text || value_href;
      var code: string = "(function(obj,text,href){\n" ;      
      code+=`return '<a href="'+ obj[href] `;
      code += `+ '" target="${dropdown_targetdrop}"'`;
      code += `+ '>'+ obj[text] + '</a>' `;
      code += "}("+ value_object + "," + value_text + "," + value_href + "))";
      // code= javaScript.quote_(code);
      return [code, javaScript.ORDER_FUNCTION_CALL];
    };


    blocks['HTMLlink'] = {
      init: function () {
        this.appendDummyInput()
          .appendField('A')
          .appendField('target')
          .appendField(
            new Blockly.FieldDropdown([
              ['_blank', '_blank'],
              ['_self', '_self'],
              ['_parent', '_parent'],
              ['_top', '_top'],
            ]),
            'targetDrop'
          );
        this.appendValueInput('HREF').setCheck(null).appendField('href');
        this.appendValueInput('text').setCheck(null).appendField('text');
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };

    javaScript['HTMLlink'] = function (block: any) {
      var dropdown_targetdrop = block.getFieldValue('targetDrop');
      var value_href = javaScript.valueToCode(
        block,
        'HREF',
        javaScript.ORDER_ATOMIC
      );
      var value_text = javaScript.valueToCode(
        block,
        'text',
        javaScript.ORDER_ATOMIC
      );
      value_text = value_text || value_href;
      var code = `'<a href="'+` + value_href;
      code += `+ '" target="${dropdown_targetdrop}"'`;
      code += `+ '>'+` + value_text + `+ '</a> '`;
      // code= javaScript.quote_(code);
      return [code, javaScript.ORDER_NONE];
    };
  }

  fieldXML(): string {
    return `
<category name='Generator'>
    <block type='text_print'>" 
               <value name='TEXT'>" 
                 
    <block type="HTMLheaders">
        <value name="NAME">
            <shadow type="text">
                <field name="TEXT"></field>
            </shadow>
        </value>
    </block>    
      </value>


      </block>
        
<block type="HTMLlist"></block>

<block type='text_print'>" 
<value name='TEXT'>" 
  
<block type="HTMLli">
</block>    
</value>
</block>
<block type='text_print'>" 
<value name='TEXT'>" 

<block type="HTMLliStart"></block>
</value>
</block>    
<block type='text_print'>" 
<value name='TEXT'>" 

<block type="HTMLliStop"></block>

</value>
</block>    

<block type='text_print'>" 
<value name='TEXT'>" 

<block type="HTMLlink">
<value name="HREF">
<shadow type="text">
    <field name="TEXT">http://</field>
</shadow>

</value>
<value name="text">
<shadow type="text">
    <field name="TEXT">My Text</field>
</shadow>

</value>

</block>
</value>
</block>    


<block type='text_print'>" 
<value name='TEXT'>" 

<block type="HTMLlinkFromObject">
<value name="hrefProp">
<shadow type="text">
    <field name="TEXT">prop</field>
</shadow>

</value>
<value name="textProp">
<shadow type="text">
    <field name="TEXT">prop</field>
</shadow>

</value>

</block>
</value>
</block>    
</category>
`;
  }
}
