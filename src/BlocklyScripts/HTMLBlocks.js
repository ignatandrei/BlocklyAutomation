exports.definitionBlocks = function (blocks, javaScript, BlocklyFieldDropdown) {
  blocks['headers'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck(null)
          .appendField("Header")
          .appendField(new BlocklyFieldDropdown([["H1","H1"], ["H2","H2"], ["H3","H3"]]), "NAME");
      this.setOutput(true, null);
      this.setColour(240);
   this.setTooltip("string to Header ");
   this.setHelpUrl("");
    }
  };

  javaScript['headers'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var value_name = javaScript.valueToCode(block, 'NAME', javaScript.ORDER_ATOMIC);
    // if(value_name.startsWith("'") && value_name.endsWith("'")){
    //   value_name= value_name.substring(1,value_name.length-1);
    // }
    // console.log('_x',value_name);

    var code = `'<${dropdown_name}>'+ ${value_name} + '</${dropdown_name}>'`;
    return [code, javaScript.ORDER_NONE];
  };
 
};


exports.fieldXML = function () {
    return `
    <block type='text_print'>" 
               <value name='TEXT'>" 
                 
    <block type="headers">
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