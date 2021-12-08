exports.definitionBlocks = function (blocks, javaScript) {
    const ORDER_ATOMIC = 0;
    const ORDER_NONE=99;


    blocks['trycatchfinally'] = {
      init: function() {
        this.appendStatementInput('TRY')
        .appendField('try');
    this.appendStatementInput('CATCH')
        .appendField('catch');
    this.appendStatementInput('FINALLY')
        .appendField('finally');
    
        this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
        //this.setColour(230);
     //this.setTooltip("");
     //this.setHelpUrl("");
      }
    };
    javaScript['trycatchfinally'] = function(block) {
      var statements_try = javaScript.statementToCode(block, 'TRY');
      var statements_catch = javaScript.statementToCode(block, 'CATCH');
      var statements_finally = javaScript.statementToCode(block, 'FINALLY');
      
      var code = 'try {\n' + statements_try + '}\n'; 
      code += 'catch(err){\n errHandler(JSON.stringify(err));\n' + statements_catch + '\n}';
      code += 'finally{\n ' + statements_finally + '\n}\n';

      return code;
    };
  };
exports.fieldXML =function(){
    return `
    
    <block type="trycatchfinally">
    
</block>
`
}