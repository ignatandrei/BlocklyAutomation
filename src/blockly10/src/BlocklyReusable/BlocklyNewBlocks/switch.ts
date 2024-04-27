import * as Blockly from "blockly/core";
import { IBlocksExtMut } from "../blocksInterface";
//imported from
//https://github.com/bartbutenaers/node-red-contrib-blockly =>/extra/extraBlocksDefs.js
export class SwitchBlock implements IBlocksExtMut {
    category: string='other';
    public static nameBlock: string = "SwitchCaseBlock";
  
    definitionBlocksExtMut(blocks: any,javaScript:any,BlocklyExtensions:any) : void {

        blocks[SwitchBlock.nameBlock] = {
            init: function() {
                
                this.jsonInit({
                    "type": "switch_case",
                    "message0":  "switch %1 in case of %2 do %3",
                    "args0": [
                        {
                            "type": "input_value",
                            "name": "CONDITION"
                        },
                        {
                            "type": "input_value",
                            "name": "CASECONDITION0"
                        },
                        {
                            "type": "input_statement",
                            "name": "CASE0"
                        }
                    ],
                    "inputsInline": true,
                    "previousStatement": null,
                    "nextStatement": null,
                    "mutator": "switch_case_mutator", 
                    "colour": "#5C81A6",
                    //"tooltip": Blockly.Msg.SWITCH_TOOLTIP,
                    "helpUrl": null
                });
                    
                (this as any).caseCount_ = 0;
                (this as any).defaultCount_ = 0;
            }
        };



        var switchCaseMutator = {
            mutationToDom: function() {
              if(!(this as any).caseCount_ && !(this as any).defaultCount_) {
                  return null;
              }
              var container = document.createElement('mutation');
              if ((this as any).caseCount_) {
                  container.setAttribute('case', (this as any).caseCount_);
              }
              if ((this as any).defaultCount_) {
                  container.setAttribute('default', "1");
              }
              return container;
            },
          
            domToMutation: function(xmlElement:any) {
              (this as any).caseCount_ = parseInt(xmlElement.getAttribute('case'), 10);
              (this as any).defaultCount_ = parseInt(xmlElement.getAttribute('default'), 10);
              for (var x = 1; x <= (this as any).caseCount_; x++) {
                  (this as any).appendValueInput('CASECONDITION' + x)
                      .appendField("case ");
                  (this as any).appendStatementInput('CASE' + x)
                      .appendField("do ");
              }
              if ((this as any).defaultCount_) {
                  (this as any).appendStatementInput('ONDEFAULT')
                      .appendField("default ");
              }
            },
          
            decompose: function(workspace: any) {
              var containerBlock = workspace.newBlock('control_case');
              containerBlock.initSvg();
              var connection = containerBlock.getInput('STACK').connection;
              for (var x = 1; x <= (this as any).caseCount_; x++) {
                  var caseBlock = workspace.newBlock('case_incaseof');
                  caseBlock.initSvg();
                  connection.connect(caseBlock.previousConnection);
                  connection = caseBlock.nextConnection;
              }
              if((this as any).defaultCount_) {
                  var defaultBlock = workspace.newBlock('case_default');
                  defaultBlock.initSvg();
                  connection.connect(defaultBlock.previousConnection);
              }
              return containerBlock;
            },
          
            compose: function(containerBlock:any) {
              //Disconnect all input blocks and remove all inputs.
              if ((this as any).defaultCount_) {
                  (this as any).removeInput('ONDEFAULT');
              }
              (this as any).defaultCount_ = 0;
              for (var x = (this as any).caseCount_; x > 0; x--) {
                  (this as any).removeInput('CASECONDITION' + x);
                  (this as any).removeInput('CASE' + x);
              }
              (this as any).caseCount_ = 0;
              var caseBlock = containerBlock.getInputTargetBlock('STACK');
              while (caseBlock) {
                  switch(caseBlock.type) {
                      case 'case_incaseof':
                          (this as any).caseCount_++;
                          var caseconditionInput = (this as any).appendValueInput('CASECONDITION' + (this as any).caseCount_)
                                                       .appendField("case ");   
                          var caseInput = (this as any).appendStatementInput('CASE' + (this as any).caseCount_)
                                              .appendField("do ");
                          if (caseBlock.valueConnection_) {
                              caseconditionInput.connection.connect(caseBlock.valueConnection_);
                          }
                          if (caseBlock.statementConnection_) {
                              caseInput.connection.connect(caseBlock.statementConnection_);
                          }
                          break;
                      case 'case_default':
                          (this as any).defaultCount_++;
                          var defaultInput = (this as any).appendStatementInput('ONDEFAULT')
                                                 .appendField("default ");
                          if(caseBlock.statementConnection_) {
                              defaultInput.connection.connect(caseBlock.statementConnection_);
                          }
                          break;
                      default:
                          throw new Error('Unknown block type.');
                  }
                  caseBlock = caseBlock.nextConnection &&
                            caseBlock.nextConnection.targetBlock();
              }
            },
          
            saveConnections: function(containerBlock:any) {
              var caseBlock = containerBlock.getInputTargetBlock('STACK');
              var x = 1;
              while (caseBlock) {
                  switch (caseBlock.type) {
                      case'case_incaseof':
                          var caseconditionInput = (this as any).getInput('CASECONDITION' + x);  
                          var caseInput = (this as any).getInput('CASE' + x);
                          caseBlock.valueConnection_ = caseconditionInput && caseconditionInput.connection.targetConnection;
                          caseBlock.statementConnection_ = caseInput && caseInput.connection.targetConnection;
                          x++;
                          break;
                      case'case_default':
                          var defaultInput = (this as any).getInput('ONDEFAULT');
                          caseBlock.satementConnection_ = defaultInput && defaultInput.connection.targetConnection;
                          break;
                      default:
                        throw new Error( 'Unknown block type');
                  }
                  caseBlock = caseBlock.nextConnection &&
                              caseBlock.nextConnection.targetBlock();
              }
            }
          };
          
        try{
            BlocklyExtensions.registerMutator('switch_case_mutator', switchCaseMutator, null, ['case_incaseof', 'case_default']);
            
        }
            catch(e){
              //already registered
            }
        javaScript[SwitchBlock.nameBlock] = function(block:any) {
            var code = '';
            var do_n;
            var case_n;
        
            const switchVariable = javaScript.valueToCode(block, 'CONDITION', javaScript.ORDER_NONE) || null;
            
            if (switchVariable){
                code = '\nswitch (' + switchVariable + '){\n';
                var case_0 = javaScript.valueToCode(block, 'CASECONDITION0', javaScript.ORDER_NONE) || null;
                var do_0 = javaScript.statementToCode(block, 'CASE0');
                code += '  case ' + case_0 + ':\n  ' + do_0 + '    break;\n';
                
                for (var n = 1; n <= block.caseCount_; n++) {
                    case_n = javaScript.valueToCode(block, 'CASECONDITION' + n,
                        javaScript.ORDER_NONE) || null;
                    if (case_n){
                        do_n = javaScript.statementToCode(block, 'CASE' + n);
                        code += '  case ' + case_n + ':\n  ' + do_n + '    break;\n';
                    }
                }
                if (block.defaultCount_) {
                    do_n = javaScript.statementToCode(block, 'ONDEFAULT');
                    code += '  default:\n  ' + do_n + '    break;\n';
                }
                code += '}\n';
            }
            return code;
        };

        // Internally used in SWITCH_CASE block mutator (so not available in the toolbox)
Blockly.Blocks['control_case'] = {
    init: function () {
        this.jsonInit({
            "type": "control_case",
            "message0": "the case is %1",
            "args0": [
                {
                    "type": "input_statement",
                    "name": "STACK"
                }
            ],
            "colour": "#5C81A6",
            //"tooltip": Blockly.Msg.SWITCH_CASE_TOOLTIP,
            "helpUrl": ""
        });
        this.contextMenu = false;
    }
};

        // Internally used in SWITCH_CASE block mutator (so not available in the toolbox)
        blocks['case_incaseof'] = {
    init: function () {
        this.jsonInit({
            "type": "case_incaseof",
            "message0": "in case of",
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#5C81A6",
            //"tooltip": Blockly.Msg.SWITCH_CASE_LIST_TOOLTIP,
            "helpUrl": ""
        });
        this.contextMenu = false;
    }
};

// Internally used in SWITCH_CASE block mutator (so not available in the toolbox)
blocks['case_default'] = {
    init: function () {
        this.jsonInit({
            "type": "case_default",
            "message0": "default",
            "previousStatement": null,
            "colour": "#5C81A6",
            //"tooltip": Blockly.Msg.SWITCH_DEFAULT_TOOLTIP,
            "helpUrl": ""
        });
        this.contextMenu = false;
    }
};
    }
    addWrapper(interpreter: any, globalObject: any) {
        
    }
    fieldXML(): string {
        return `<block type="${SwitchBlock.nameBlock}">
        </block>
`;
    }

}