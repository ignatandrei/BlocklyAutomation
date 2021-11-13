// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }
 exports.definitionBlocks = function (blocks, javaScript, BlocklyFieldLabelSerializable) {
    const ORDER_ATOMIC = 0;
    blocks['comment'] = {
        init: function() {
          this.appendValueInput("TEXT")
              .setCheck(null)
              .appendField("comment /* */")
              .appendField(BlocklyFieldLabelSerializable(""), "NAME");
          //this.setOutput(true, null);
            this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      };
      
      javaScript['comment'] = function(block) {
        // Print statement.
        var msg = javaScript.valueToCode(block, 'TEXT',
        /*javaScript.*/ORDER_ATOMIC) || '\'\'';
          
        var code= '/*\n' + msg+'\n*/;\n';
        return code;
      };
      
       
}

exports.fieldXML = function () {
    return `<block type="comment">
    <value name="TEXT">
        <shadow type="text">
            <field name="TEXT">Put here comments</field>
        </shadow>
    </value>
</block>
`
}
