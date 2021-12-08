const Blockly =require('blockly');

exports.definitionBlocks = function (blocks, javaScript) {
  blocks['HTMLheaders'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck(null)
          .appendField("Header")
          .appendField(new  Blockly.FieldDropdown([["H1","H1"], ["H2","H2"], ["H3","H3"]]), "NAME");
      this.setOutput(true, null);
      this.setColour(240);
   this.setTooltip("string to Header ");
   this.setHelpUrl("");
    }
  };

  javaScript['HTMLheaders'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var value_name = javaScript.valueToCode(block, 'NAME', javaScript.ORDER_ATOMIC);
    // if(value_name.startsWith("'") && value_name.endsWith("'")){
    //   value_name= value_name.substring(1,value_name.length-1);
    // }
    // console.log('_x',value_name);

    var code = `'<${dropdown_name}>'+ ${value_name} + '</${dropdown_name}>'`;
    return [code, javaScript.ORDER_NONE];
  };

  blocks['HTMLlist'] = {
    init: function() {
      this.appendDummyInput()
        .appendField("List ")
        .appendField(new Blockly.FieldDropdown([["OL","ol"],["UL","ul"] ]), "listType");
      this.appendStatementInput("Content")
          .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(240);
  this.setTooltip("list - please add li block ");
   this.setHelpUrl("");
    }
  };

  javaScript['HTMLlist'] = function(block) {
    var dropdown_listtype = block.getFieldValue('listType');
    var value_listtype = javaScript.valueToCode(block, 'ListType', javaScript.ORDER_ATOMIC);
    var statements_content = javaScript.statementToCode(block, 'Content');
    
    var code = `window.alert('<${dropdown_listtype}>');\n;${statements_content};\n;window.alert('</${dropdown_listtype}>');\n`;
    
    return code;
  };

  blocks['HTMLli'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck(null)
          .appendField("LI")
      this.setOutput(true, null);
      this.setColour(240);
   this.setTooltip("string to LI");
   this.setHelpUrl("");
    }
  };

  javaScript['HTMLli'] = function(block) {
    var value_name = javaScript.valueToCode(block, 'NAME', javaScript.ORDER_ATOMIC);
    // if(value_name.startsWith("'") && value_name.endsWith("'")){
    //   value_name= value_name.substring(1,value_name.length-1);
    // }
    // console.log('_x',value_name);

    var code = `'<li>'+ ${value_name} + '</li>'`;
    return [code, javaScript.ORDER_NONE];
  };




};


exports.fieldXML = function () {
    return `
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
<value name="NAME">
<shadow type="text">
 <field name="TEXT"></field>
</shadow>
</value>
</block>    
</value>


</block>


`

      
}