//call m  bs.filterBlocks.definitionBlocks(Blockly.Blocks, Blockly.JavaScript));
exports.definitionBlocks=function(blocks,javaScript){
    
    blocks['filterList'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("filterList");
              this.appendValueInput("LIST")
              .setCheck("Array");
              
              this.appendValueInput("Logic")
              .setCheck("String")
              .appendField("item=>");
              this.setInputsInline(true);
              this.setOutput(true, "Array");
              this.setColour(230);
              this.setTooltip("");
              this.setHelpUrl("");
        }
      };
     
      javaScript['filterList'] = function(block) {
        var list = javaScript.valueToCode(block, 'LIST',
        javaScript.ORDER_MEMBER) || '[]';
            
        var value_logic = javaScript.valueToCode(block, 'Logic', javaScript.ORDER_ATOMIC);
        if(typeof value_logic === 'string')// remove '
            value_logic = value_logic.substr(1,value_logic.length-2);
            
        var code = '';
          code += '(function(t){ if (typeof t === "string") return JSON.parse(t);  return t;}(' + list  +')).filter(function (item){ return ' + value_logic +';})';
        code += '';
        
        return [code, javaScript.ORDER_FUNCTION_CALL];
      };
      
      blocks['mapList'] = {
          init: function () {
              this.appendDummyInput()
                  .appendField("mapList");
              this.appendValueInput("LIST")
                  .setCheck("Array");
      
              this.appendValueInput("Logic")
                  .setCheck("String")
                  .appendField("item=>");
              this.setInputsInline(true);
              this.setOutput(true, "Array");
              this.setColour(230);
              this.setTooltip("");
              this.setHelpUrl("");
          }
      };
      
      javaScript['mapList'] = function (block) {
          var list = javaScript.valueToCode(block, 'LIST',
          javaScript.ORDER_MEMBER) || '[]';
      
          var value_logic = javaScript.valueToCode(block, 'Logic', javaScript.ORDER_ATOMIC);
          if (typeof value_logic === 'string')// remove '
              value_logic = value_logic.substr(1, value_logic.length - 2);
      
          var code = '';
          code += '(function(t){ if (typeof t === "string") return JSON.parse(t);  return t;}(' + list +')).map(function (item){ return ' + value_logic + ';})';
          code += '';
      
          return [code, javaScript.ORDER_FUNCTION_CALL];
      };

      blocks['reduceList'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("reduceList");
            this.appendValueInput("LIST")
                .setCheck("Array");
    
            this.appendValueInput("Logic")
                .setCheck("String")
                .appendField("callback(acc,curVal,index, array)=>");
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
    
    javaScript['reduceList'] = function (block) {
        var list = javaScript.valueToCode(block, 'LIST',
        javaScript.ORDER_MEMBER) || '[]';
    
        var value_logic = javaScript.valueToCode(block, 'Logic', javaScript.ORDER_ATOMIC);
        if (typeof value_logic === 'string')// remove '
            value_logic = value_logic.substr(1, value_logic.length - 2);
    
        var code = '';
        code += '(function(t){ if (typeof t === "string") return JSON.parse(t);  return t;}(' + list +')).reduce(function (acc,curVal,index,array){ return ' + value_logic + ';},"")';
        code += '';
    
        return [code, javaScript.ORDER_FUNCTION_CALL];
    };
}
exports.fieldXML=function(){
    return `
        <category id="catA" name="Array">
            <block type="filterList">
                <value name="LIST">
                    <block type="variables_get">
                        <field name="VAR">list</field>
                    </block>
                </value>
                <value name="Logic">
                    <shadow type="text">
                        <field name="TEXT">item.property == "value"</field>
                    </shadow>
                </value>
            </block>
            <block type="mapList">
            <value name="LIST">
                <block type="variables_get">
                    <field name="VAR">list</field>
                </block>
            </value>
            <value name="Logic">
                <shadow type="text">
                    <field name="TEXT">item.property</field>
                </shadow>
            </value>
        </block>
        <block type="reduceList">
        <value name="LIST">
        <block type="variables_get">
                <field name="VAR">list</field>
            </block>
            </value>
            <value name="Logic">
                <shadow type="text">
                    <field name="TEXT">...</field>
                </shadow>
            </value>
        </block>
        </category>

`
}
