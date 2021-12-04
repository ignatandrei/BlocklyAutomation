// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }

exports.definitionBlocks = function (blocks, javaScript,BlocklyFieldDropdown ) {
    const ORDER_NONE=99;
    blocks['blockemail'] = {
        init: function() {
          this.appendValueInput("from")
              .setCheck(null)
              .appendField("From:");
          this.appendValueInput("to")
              .setCheck(null)
              .appendField("To:");
          this.appendValueInput("cc")
              .setCheck(null)
              .appendField("CC:");
          this.appendValueInput("bcc")
              .setCheck(null)
              .appendField("BCC:");
          this.appendValueInput("subject")
              .setCheck(null)
              .appendField("Subject:");
          this.appendValueInput("body")
              .setCheck(null)
              .appendField("Body:")
              .appendField(new BlocklyFieldDropdown ([["HTML","Html"], ["TEXT","Text"]]), "NAME");
          this.setOutput(true, null);
          this.setColour(230);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      };

      blocks['sendinblue'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("SendInBlue");
          this.appendValueInput("APIKey")
              .setCheck(null)
              .appendField("ApiKey");
          this.appendValueInput("email")
              .setCheck("blockemail")
              .appendField("Email");
        //   this.setPreviousStatement(true, null);
        //   this.setNextStatement(true, null);
          this.setColour(230);
       this.setTooltip("Please see https://account.sendinblue.com/advanced/api");
       this.setHelpUrl("https://account.sendinblue.com/advanced/api");
       this.setOutput(true, null);

        }
      };

      javaScript['sendinblue'] = function(block) {
        var value_apikey = javaScript.valueToCode(block, 'APIKey', javaScript.ORDER_ATOMIC);
        var value_email = javaScript.valueToCode(block, 'email', javaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = 'window.alert("SendInBlue");\n';
        // "(function(url,data){ var res=JSON.parse(postXhr(url,JSON.stringify(data))); if(res.statusOK) return res.text;errHandler(JSON.stringify(res)); throw res;}(" +
        //   value_theurl ;
        // if (value_data) {
        //   operation+="," +value_data           
        // }
        // operation += ") )";
        var domain="api.sendinblue.com";
        code = `(function(apiKey,email){if(!('${domain}' in headersForDomain)){ headersForDomain['${domain}']=[]; };\n`;
        code += `headersForDomain['${domain}'].push({"name":"api-key","value":apiKey});\n`;
        code += `headersForDomain['${domain}'].push({"name":"Content-Type","value":"application/json"});\n`;
        code += `headersForDomain['${domain}'].push({"name":"Accept","value":"application/json"});\n`;
        code += `var sendinblueData={"sender":{"email": email.from }, "to":[{"email":email.to }],"subject":email.subject,"htmlContent": email.body} ;\n`;
        code += `\nwindow.alert(JSON.stringify(sendinblueData));\n`;
        code += `var res=JSON.parse(postXhr("https://${domain}/v3/smtp/email",JSON.stringify(sendinblueData)));if(res.statusOK) return res.text;errHandler(JSON.stringify(res)); throw res;\n`;
        
        code+="})("+value_apikey+","+value_email+")";
        return [code, javaScript.ORDER_NONE];

      };

    javaScript['blockemail'] = function(block) {
        var value_from = javaScript.valueToCode(block, 'from', javaScript.ORDER_ATOMIC);
        var value_to = javaScript.valueToCode(block, 'to', javaScript.ORDER_ATOMIC);
        var value_cc = javaScript.valueToCode(block, 'cc', javaScript.ORDER_ATOMIC);
        var value_bcc = javaScript.valueToCode(block, 'bcc', javaScript.ORDER_ATOMIC);
        var value_subject = javaScript.valueToCode(block, 'subject', javaScript.ORDER_ATOMIC);
        var dropdown_name = block.getFieldValue('NAME');
        var value_body = javaScript.valueToCode(block, 'body', javaScript.ORDER_ATOMIC);
        var value_json = '{';
        value_json += '"from":' + value_from + ',';
        value_json += '"to":' + value_to + ',';
        value_json += '"cc":' + value_cc + ',';
        value_json += '"bcc":' + value_bcc + ',';
        value_json += '"subject":' + value_subject + ',';
        value_json += '"body":' + value_body + ',';
        value_json += '"typeEmail":' + '"' + dropdown_name + '"' ;
        value_json += '}';
        // console.log(value_json);
        var code = `${value_json}`;
        return [code, javaScript.ORDER_NONE];
      };
      
}

exports.fieldXML = function () {
    return `<block type="blockemail">
        <value name="from">
            <shadow type="text">
                <field name="TEXT">test@test.com</field>
            </shadow>
        </value>
        <value name="to">
            <shadow type="text">
                <field name="TEXT">ignatandrei@yahoo.com</field>
            </shadow>
        </value>
        <value name="cc">
            <shadow type="text">
                <field name="TEXT"></field>
            </shadow>
        </value>
        <value name="bcc">
            <shadow type="text">
                <field name="TEXT"></field>
            </shadow>
        </value>
        <value name="subject">
            <shadow type="text">
                <field name="TEXT">My test email</field>
            </shadow>
        </value>
        <value name="body">
            <shadow type="text">
                <field name="TEXT">This is the body</field>
            </shadow>
        </value>
            </block>
        <block type="sendinblue">
        <value name="APIKey">
            <shadow type="text">
                <field name="TEXT">Please put here the API Key from SendInBlue</field>
            </shadow>
            
        </value>
        <value name="email">
            <shadow type="blockemail">
            </shadow>
            
        </value>
        
        </block>
`;
}