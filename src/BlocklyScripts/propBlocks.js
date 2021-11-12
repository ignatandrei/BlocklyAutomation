exports.definitionBlocks = function (blocks, javaScript, fieldLabelSerializable) {
    const ALIGN_RIGHT=1;
    const ALIGN_CENTRE=0;
    const ORDER_ATOMIC = 0;
    const ORDER_NONE= 99;
  blocks["modifyproperty"] = {
    init: function () {
      this.appendDummyInput().appendField("Modify ");
      this.appendValueInput("ObjectToChange")
        .setCheck(null)
        .setAlign(/*Blockly.*/ALIGN_CENTRE)
        .appendField(
            fieldLabelSerializable("object"),
          "objectName"
        );
      this.appendValueInput("PropertyName")
        .setCheck(null)
        .setAlign(/*Blockly.*/ALIGN_RIGHT)
        .appendField(fieldLabelSerializable(",property"), "prop");
      this.appendValueInput("NewValue")
        .setCheck(null)
        .setAlign(/*Blockly.*/ALIGN_RIGHT)
        .appendField(fieldLabelSerializable("toValue"), "newValue");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
  javaScript["modifyproperty"] = function (block) {
    var value_objecttochange = javaScript.valueToCode(
      block,
      "ObjectToChange",
      /*javaScript.*/ORDER_ATOMIC
    );
    var value_propertyname = javaScript.valueToCode(
      block,
      "PropertyName",
      /*javaScript.*/ORDER_ATOMIC
    );
    var value_newvalue = javaScript.valueToCode(
      block,
      "NewValue",
      /*javaScript.*/ORDER_ATOMIC
    );
    var code =
      value_objecttochange +
      "[" +
      value_propertyname +
      "]=" +
      value_newvalue +
      ";";
    return code;
  };
  blocks["getproperty"] = {
    init: function () {
      this.appendDummyInput().appendField("Get from");
      this.appendValueInput("ObjectToChange")
        .setCheck(null)
        .setAlign(/*Blockly.*/ALIGN_CENTRE)
        .appendField(
          fieldLabelSerializable("object"),
          "objectName"
        );
      this.appendValueInput("PropertyName")
        .setCheck(null)
        .setAlign(/*Blockly.*/ALIGN_RIGHT)
        .appendField(fieldLabelSerializable("property"), "prop");
      this.setInputsInline(true);
      this.setOutput(true, null);
      //this.setTooltip("");
      //this.setHelpUrl("");
    },
  };
  javaScript["getproperty"] = function (block) {
    var value_objecttochange = javaScript.valueToCode(
      block,
      "ObjectToChange",
      /*javaScript.*/ORDER_ATOMIC
    );

    var value_propertyname = javaScript.valueToCode(
      block,
      "PropertyName",
      /*javaScript.*/ORDER_ATOMIC
    );

    var code =
      '(function(t){ if (typeof t === "string") return JSON.parse(t);  return t;}(' +
      value_objecttochange +
      "))[" +
      value_propertyname +
      "]";

    return [code, /*javaScript.*/ORDER_NONE];
  };
};


exports.fieldXML = function () {
    return `
    <category name="Objects" id="Objects">
    <block type="modifyproperty">
        <value name="PropertyName">
            <shadow type="text">
                <field name="TEXT">enter property name</field>
            </shadow>
        </value>
    </block>
    <block type="getproperty">
        <value name="PropertyName">
            <shadow type="text">
                <field name="TEXT">enter property name</field>
            </shadow>
        </value>

    </block>    
</category>
`
}