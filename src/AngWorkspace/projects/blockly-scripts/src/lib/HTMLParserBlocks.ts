const Blockly =require('blockly');

exports.definitionBlocks = function (blocks, javaScript) {
  blocks['simpleHtmlparser'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck(null)
          .appendField("Find ")
          .appendField(new Blockly.FieldDropdown([["Tables","table"], ["Links","a"], ["Images","img"], ["List","ul,ol"],["Headers","h1,h2,h3,h4,h5,h6"]]), "To");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  javaScript['simpleHtmlparser'] = function(block) {
    var dropdown_to = block.getFieldValue('To');
    var value_name = javaScript.valueToCode(block, 'NAME', javaScript.ORDER_ATOMIC);
    var code = '(function(value){ \n';    
    code +=`var doc  = parseDOMFromStringElements(value,"text/html","${dropdown_to}");\n`;        
    // code +='consoleLog("x",doc)\n';      
    code += 'return doc;\n';
    code += '})('+ value_name+')';
      return [code, javaScript.ORDER_NONE];
  };



};


exports.fieldXML = function () {
    return `
    <block type='text_print'>" 
               <value name='TEXT'>" 
                 
    <block type="simpleHtmlparser">
        <value name="NAME">
            <shadow type="text">
                <field name="TEXT"></field>
            </shadow>
        </value>
    </block>    
      </value>


      </block>
        `;      
}