import * as Blockly from 'blockly/core';
import { IBlocksSimple } from '../../blocksInterface';


export default class container implements IBlocksSimple {

  addWrapper(interpreter: any, globalObject: any) {

  }
  category: string = "meta";
  definitionBlocksSimple(blocks: any, javaScript: any) {
    blocks["container"] = {
      init: function () {
        this.appendDummyInput()
          .appendField("Container");
        this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput("Name"), "nameContainer");
        this.appendStatementInput("Stmts")
          .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      }
    };
    javaScript["container"] = function (block: any) {
      var text_namecontainer = block.getFieldValue('nameContainer');
      var statements_stmts = javaScript.statementToCode(block, 'Stmts');
      var code = `\n/*${text_namecontainer} start*/\n ${statements_stmts} \n/*${text_namecontainer} end*/\n;\n`;
      return code;
    };
  };

  fieldXML(): string {
    return `<block type="container"></block>`;
  }
}
