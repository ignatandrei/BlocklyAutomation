import * as Blockly from 'blockly';

export class tryCat {
  definitionBlocks(blocks: any, javaScript: any) {
    const ORDER_ATOMIC = 0;
    const ORDER_NONE = 99;

    blocks['trycatchfinally'] = {
      init: function () {
        this.appendStatementInput('TRY').appendField('try');
        this.appendStatementInput('CATCH').appendField('catch');
        this.appendStatementInput('FINALLY').appendField('finally');

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        //this.setColour(230);
        //this.setTooltip("");
        //this.setHelpUrl("");
      },
    };
    javaScript['trycatchfinally'] = function (block: any) {
      var statements_try = javaScript.statementToCode(block, 'TRY');
      var statements_catch = javaScript.statementToCode(block, 'CATCH');
      var statements_finally = javaScript.statementToCode(block, 'FINALLY');

      var code = 'try {\n' + statements_try + '}\n';
      code +=
        'catch(err){\n ' +
        statements_catch +
        '\n}';
      code += 'finally{\n ' + statements_finally + '\n}\n';

      return code;
    };
  }
  fieldXML() {
    return `
    
    <block type="trycatchfinally">
    
</block>
`;
  }
}
