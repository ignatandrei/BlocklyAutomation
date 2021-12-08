// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }
const Blockly =require('blockly');
// const a = require('./audioTest.js');
exports.definitionBlocks = function (blocks, javaScript) {
    
    blocks['ttsBlock'] = {
        init: function() {
            this.appendValueInput("NAME")
            .setCheck(null)
            .appendField("Voice");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
     this.setTooltip("");
     this.setHelpUrl("");
        }
      };
      javaScript['ttsBlock'] = function(block) {
        // var dropdown_voice = block.getFieldValue('Voice');
        var value_name = javaScript.valueToCode(block, 'NAME', javaScript.ORDER_ATOMIC);
        var code = 'speakDefault('+ value_name+');\n';
        // console.log(a);
        // var piano = a.Synth.createInstrument('piano');
        // piano.play('C', 4, 2);
        return code;
      };
      
}

exports.fieldXML = function () {
    return `<block type="ttsBlock">
        <value name="NAME">
            <shadow type="text">
            <field name="TEXT">Hello</field></shadow>
        </value>       
        </block>
`;
}