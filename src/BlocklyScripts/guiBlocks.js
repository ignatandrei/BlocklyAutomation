exports.definitionBlocks=function (blocks, javaScript){
    const ORDER_NONE= 99;
    blocks['window_open'] = {
  
        init: function() {
          this.jsonInit({
            "message0": 'Open %1',
            "args0": [
              {
                "type": "input_value",
                "name": "TEXT"
              }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "text_blocks"
            
          });
        }
      };
          
      
          
      javaScript['window_open'] = function(block) {
        // Print statement.
        var msg = javaScript.valueToCode(block, 'TEXT',
            /*Blockly.JavaScript.*/ORDER_NONE) || '\'\'';
        return 'open(' + msg + ');\n';
      };
}

exports.fieldXML = function () {
    return `<block type="window_open"></block>
    <block type="valuefromtext">
        <value name="IdOfText">
            <shadow type="text">
                <field name="TEXT">output</field>
            </shadow>
        </value>
        <value name="ValueToObtain">
            <shadow type="text">
                <field name="TEXT">value</field>
            </shadow>
        </value>
    </block>`;
}