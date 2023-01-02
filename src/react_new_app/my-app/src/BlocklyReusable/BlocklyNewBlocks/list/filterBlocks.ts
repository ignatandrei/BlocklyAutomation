//call m  bs.filterBlocks.definitionBlocksSimple(Blockly.Blocks, Blockly.JavaScript));

// import * as Blockly from "blockly/core";
import { IBlocksSimple } from "../../blocksInterface";

export class FilterBlocks implements IBlocksSimple {
  category: string='Array';
  definitionBlocksSimple(blocks: any,javaScript: any) {
    blocks["concatList"] = {
      init: function () {
        this.appendDummyInput().appendField("concatArray");
        this.appendValueInput("LIST1").setCheck("Array");

        this.appendValueInput("LIST2").setCheck("Array");

        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    };

    javaScript["concatList"] = function (block: any) {
      var list1 =
        javaScript.valueToCode(block, "LIST1", javaScript.ORDER_MEMBER) || "[]";
      var list2 =
        javaScript.valueToCode(block, "LIST2", javaScript.ORDER_MEMBER) || "[]";

      var code = "";
      code +=
        "JSON.stringify(function(a1,a2){ return [].concat(a1).concat(a2);})(" +
        list1 +
        "," +
        list2 +
        "))";
      code += "";

      return [code, javaScript.ORDER_FUNCTION_CALL];
    };

    blocks["filterList"] = {
      init: function () {
        this.appendDummyInput().appendField("filterList");
        this.appendValueInput("LIST").setCheck("Array");

        this.appendValueInput("Logic").setCheck("String").appendField("item=>");
        this.setInputsInline(true);
        this.setOutput(true, "Array");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    };

    javaScript["filterList"] = function (block: any) {
      var list =
        javaScript.valueToCode(block, "LIST", javaScript.ORDER_MEMBER) || "[]";

      var value_logic = javaScript.valueToCode(
        block,
        "Logic",
        javaScript.ORDER_ATOMIC
      );
      if (typeof value_logic === "string")
        // remove '
        value_logic = value_logic.substr(1, value_logic.length - 2);

      var code = "";
      code +=
        'JSON.stringify((function(t){ if (typeof t === "string") return JSON.parse(t);  return t;}(' +
        list +
        ")).filter(function (item){ return " +
        value_logic +
        ";}))";
      code += "";


      return [code, javaScript.ORDER_FUNCTION_CALL];
    };

    blocks["mapList"] = {
      init: function () {
        this.appendDummyInput().appendField("mapList");
        this.appendValueInput("LIST").setCheck("Array");

        this.appendValueInput("Logic").setCheck("String").appendField("item=>");
        this.setInputsInline(true);
        this.setOutput(true, "Array");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    };

    javaScript["mapList"] = function (block: any) {
      var list =
        javaScript.valueToCode(block, "LIST", javaScript.ORDER_MEMBER) || "[]";

      var value_logic = javaScript.valueToCode(
        block,
        "Logic",
        javaScript.ORDER_ATOMIC
      );
      if (typeof value_logic === "string")
        // remove '
        value_logic = value_logic.substr(1, value_logic.length - 2);

      var code = "";
      code +=
        'JSON.stringify((function(t){ if (typeof t === "string") return JSON.parse(t);  return t;}(' +
        list +
        ")).map(function (item){ return " +
        value_logic +
        ";}))";
      code += "";

      return [code, javaScript.ORDER_FUNCTION_CALL];
    };

    blocks["reduceList"] = {
      init: function () {
        this.appendDummyInput().appendField("reduceList");

        this.appendValueInput("LIST").setCheck("Array");

        this.appendValueInput("initValue")
          .setCheck(null)
          .appendField("initialValue");

        this.appendValueInput("Logic")
          .setCheck("String")
          .appendField("callback(acc,curVal,index, array)=>");

        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    };

    javaScript["reduceList"] = function (block: any) {
      var list =
        javaScript.valueToCode(block, "LIST", javaScript.ORDER_MEMBER) || "[]";

      var value_initvalue = "";
      try {
        value_initvalue = javaScript.valueToCode(
          block,
          "initValue",
          javaScript.ORDER_ATOMIC
        );
      } catch (e) {
        window.alert(e);
      }

      var value_logic = javaScript.valueToCode(
        block,
        "Logic",
        javaScript.ORDER_ATOMIC
      );
      if (typeof value_logic === "string")
        // remove '
        value_logic = value_logic.substr(1, value_logic.length - 2);

      var code = "";
      code +=
        'JSON.stringify((function(t){ if (typeof t === "string") return JSON.parse(t);  return t;}(' +
        list +
        ")).reduce(function (acc,curVal,index,array){ " +
        value_logic +
        ";}";
      if (value_initvalue && value_initvalue.toString().length > 0) {
        code += "," + value_initvalue;
      }
      code += "))";
      code += "";

      return [code, javaScript.ORDER_FUNCTION_CALL];
    };
  };
  fieldXML(): string {
    return `
        
            <block type="filterList">
                <value name="LIST">
                    <block type="variables_get">
                        <field name="VAR">list</field>
                    </block>
                </value>
                <value name="initValue">
                    <shadow type="text">
                        <field name="TEXT"> </field>
                    </shadow>
                </value>
                <value name="Logic">
                    <shadow type="text">
                        <field name="TEXT">item.property == "value"</field>
                    </shadow>
                </value>
            </block>
            <block type="concatList"></block>
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
                    <field name="TEXT">return ...</field>
                </shadow>
            </value>
        </block>
        

`;
  }

  addWrapper(interpreter: any, globalObject: any) {}
}

export default FilterBlocks;