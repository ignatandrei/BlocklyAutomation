exports.definitionBlocks = function (blocks, javaScript, BlocklyFieldDropdown) {
    console.log(BlocklyFieldDropdown);
    const ORDER_ATOMIC = 0;
    const ORDER_NONE=99;
  blocks["httprequest"] = {
    init: function () {
      this.appendDummyInput()
        .appendField(
          /*new*/ BlocklyFieldDropdown([
            ["JSON", "JSON"],
            ["Text", "Text"],
          ]),
          "TypeOutput"
        )
        .appendField("HttpRequest");
      this.appendValueInput("TheUrl")
        .setCheck(null)
        .appendField(
          /*new*/ BlocklyFieldDropdown([
            ["GET", "GET"],
            ["POST", "POST"],
          ]),
          "TypeRequest"
        )
        .appendField("URL");
      this.appendValueInput("Data").setCheck(null).appendField("Data");
      this.setOutput(true, null);
      //this.setColour(230);
      //this.setTooltip("");
      //this.setHelpUrl("");
    },
  };

  javaScript["httprequest"] = function (block) {
    var dropdown_typeoutput = block.getFieldValue("TypeOutput");
    var dropdown_typerequest = block.getFieldValue("TypeRequest");
    var value_theurl = javaScript.valueToCode(
      block,
      "TheUrl",
      /*javaScript.*/ORDER_ATOMIC
    );
    var value_data = javaScript.valueToCode(
      block,
      "Data",
      javaScript.ORDER_ATOMIC
    );
    var operation = "";
    switch (dropdown_typerequest.toString()) {
      case "GET":
        operation =
          "(function(url){ var res=JSON.parse(getXhr(url)); if(res.statusOK) return res.text;errHandler(JSON.stringify(res)); throw res;}(" +
          value_theurl +
          ") )";
        break;
      case "POST":
        operation =
          "(function(url,data){ var res=JSON.parse(postXhr(url,JSON.stringify(data))); if(res.statusOK) return res.text;errHandler(JSON.stringify(res)); throw res;}(" +
          value_theurl +
          "," +
          value_data +
          ") )";
        break;
    }

    var code = operation;
    switch (dropdown_typeoutput) {
      case "JSON":
        code = "JSON.parse(" + code + ")";
    }

    return [code, /*javaScript.*/ORDER_NONE];
  };
};

exports.xhrXML =function(){
    return `
    <category id="XHR" name="Request">
    <block type="httprequest">
    <value name="TheUrl">
        <shadow type="text">
            <field name="TEXT">https://httpbin.org/get</field>
        </shadow>
    </value>
    
</block>

</category>
`
}