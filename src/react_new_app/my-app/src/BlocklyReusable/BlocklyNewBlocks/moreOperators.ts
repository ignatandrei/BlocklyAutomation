// import * as Blockly from "blockly/core";
import {  IBlocksSimple } from "../blocksInterface";
//imported from
//https://github.com/carloslfu/ =>/javascript/blocks/expressions.j
export class MoreOperators implements IBlocksSimple {
    definitionBlocksSimple(blocks: any, javascriptGenerator: any): void {
        blocks[MoreOperators.nameBlock] = {
            init: function() {
              var OPERATORS = [
                ['=', '='],
                ['+=', '+='],
                ['-=', '-='],
                ['*=', '*='],
                ['/=', '/='],
                ['%=', '%='],
                ['&=', '&='],
                ['^=', '^='],
                ['|=', '|='],
                ['>>=', '>>='],
                ['<<=', '<<='],
                ['>>>=', '>>>=']
              ];
              this.jsonInit({
                "id": "js_assignment_expression",
                "message0": "set %1 %2 %3",
                "args0": [
                  {
                    "type": "input_value",
                    "name": "VAR"
                  },
                  {
                    "type": "field_dropdown",
                    "name": "OPERATOR",
                    "options": OPERATORS
                  },
                  {
                    "type": "input_value",
                    "name": "VALUE",
                    "align": "RIGHT"
                  }
                ],
                "colour": 330,
                "previousStatement": "Statement",
                "nextStatement": "Statement",
                "inputsInline": true,
                "tooltip": "Assignment expression."
              });
            }
          };

          javascriptGenerator['js_assignment_expression'] = function(block:any) {
  var variable = javascriptGenerator.valueToCode(block, 'VAR',
      javascriptGenerator.ORDER_ASSIGNMENT);
  var operator = block.getFieldValue('OPERATOR');
  var value = javascriptGenerator.valueToCode(block, 'VALUE',
      javascriptGenerator.ORDER_ASSIGNMENT);
  var code = variable + ' ' + operator + ' ' + value;
  //If has output returns a tuple with the order of precedence
  if (block.outputConnection) {
    return [code, javascriptGenerator.ORDER_ASSIGNMENT];
  } else {
    return code + ';\n';
  }
};
          
    }
    addWrapper(interpreter: any, globalObject: any) {
        
    }
    fieldXML(): string {
        return `<block type="${MoreOperators.nameBlock}">
        </block>`;
    }
    category: string='other';
    public static nameBlock: string = "js_assignment_expression";
}
