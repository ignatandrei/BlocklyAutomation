
exports.definitionBlocks = function (blocks, javaScript) {
    // console.log(BlocklyFieldDropdown);
    const ORDER_ATOMIC = 0;
    const ORDER_NONE=99;


    blocks['credsforhttp'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Http with Creds");
            this.appendValueInput("HttpDomain")
                .setCheck("String")
                .appendField("Domain");
            this.appendValueInput("WithCreds")
                .setCheck("Boolean")
                .appendField("With Creds ?");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            //this.setColour(230);
            //this.setTooltip("");
            //this.setHelpUrl("");
        }
    };
    javaScript['credsforhttp'] = function (block) {
        var value_httpdomain = javaScript.valueToCode(block, 'HttpDomain', /*javaScript.*/ORDER_ATOMIC) || '(localSite)';
        var value_headername = javaScript.valueToCode(block, 'WithCreds', /*javaScript.*/ORDER_ATOMIC);
        var code = 'withCredsForDomain[' + value_httpdomain + ']=' + value_headername + ';\n';
        return code;
    };
};

exports.fieldXML =function(){
    return `<block type="credsforhttp">
    <value name="HttpDomain">
        <shadow type="text">
            <field name="TEXT">(localSite)</field>
        </shadow>
    </value>
    <value name="WithCreds">
        <shadow type="logic_boolean">
            <field name="BOOL">FALSE</field>
        </shadow>
    </value>
</block>
`
}