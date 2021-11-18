exports.definitionBlocks=function (blocks, javaScript){
    const ORDER_NONE= 99;
    const ORDER_ATOMIC= 0;
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
            /*javaScript.*/ORDER_NONE) || '\'\'';
        return 'open(' + msg + ');\n';
      };




      blocks['valuefromtext'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("InputFromText");
          this.appendValueInput("IdOfText")
              .setCheck("String")
              .appendField("Text id");
        this.appendValueInput("ValueToObtain")
              .setCheck("String")
              .appendField("Property");
          this.setOutput(true, null);
          this.setColour(230);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      }
        
       javaScript['valuefromtext'] = function(block) {
        var value_idoftext = javaScript.valueToCode(block, 'IdOfText', /*javaScript.*/ORDER_ATOMIC);
        var value_valuetoobtain = javaScript.valueToCode(block, 'ValueToObtain', /*javaScript.*/ORDER_ATOMIC)||'"value"';
        var code = 'getIDProp('+ value_idoftext+','+ value_valuetoobtain+')';
        return [code, /*javaScript.*/ORDER_NONE];
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
    </block>
    <block type="text_print"></block>
    <block type="text_prompt_ext">
    </block>
    `;
}