// import * as Blockly from "blockly/core";
import {  IBlocksSimple } from "../blocksInterface";
//imported from
//https://github.com/carloslfu/ =>/javascript/blocks/expressions.j
export class UnaryOperator implements IBlocksSimple {
    definitionBlocksSimple(blocks: any, javascriptGenerator: any): void {
        blocks[UnaryOperator.nameBlock] = {
            init: function() {
              var OPERATORS = [
                ['++', '++'],
                ['--', '--'],
                ];
              this.jsonInit({
                "id": UnaryOperator.nameBlock,
                "message0": "set %1 %2",
                "args0": [
                  {
                    "type": "input_value",
                    "name": "VAR"
                  },
                  {
                    "type": "field_dropdown",
                    "name": "OPERATOR",
                    "options": OPERATORS
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

          javascriptGenerator[UnaryOperator.nameBlock] = function(block:any) {
  var variable = javascriptGenerator.valueToCode(block, 'VAR',
      javascriptGenerator.ORDER_ASSIGNMENT);
  var operator = block.getFieldValue('OPERATOR');
  var code = variable + ' ' + operator ;
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
        return `<block type="${UnaryOperator.nameBlock}">
        </block>`;
    }
    category: string='MoreMath';
    public static nameBlock: string = "unaryOperator";
}
