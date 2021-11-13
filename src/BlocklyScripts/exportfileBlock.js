// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }
exports.definitionBlocks = function (blocks, javaScript) {
    const ORDER_ATOMIC = 0;
    const ORDER_NONE=99;
  
    blocks['exportfile'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("ExportToFile");
            this.appendValueInput("fileName")
                .setCheck(null)
                .appendField("FileName");
            this.appendValueInput("contentFile")
                .setCheck(null)
                .appendField("Content");
            this.appendValueInput("convertToByte")
                .setCheck("Boolean")
                .appendField("ConvertToByteFromBase64");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
    
    javaScript['exportfile'] = function (block) {
    
        var value_filename = javaScript.valueToCode(block, 'fileName', /*javaScript.*/ORDER_ATOMIC);
        var value_contentfile = javaScript.valueToCode(block, 'contentFile', /*javaScript.*/ORDER_ATOMIC);
        var value_converttobyte = javaScript.valueToCode(block, 'convertToByte', /*javaScript.*/ORDER_ATOMIC);
        
        var code = 'exportToFile('+ value_filename+','+value_contentfile+','+ value_converttobyte + ');\n';
        return code;
    };
    
}

exports.fieldXML = function () {
    return `<block type="exportfile">
    <value name="fileName">
        <shadow type="text">
            <field name="TEXT">abc</field>
        </shadow>
    </value>
    <value name="convertToByte">
        <shadow type="logic_boolean">
            <field name="BOOL">FALSE</field>
        </shadow>
    </value>
</block>
`;
}
