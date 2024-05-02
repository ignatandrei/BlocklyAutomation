import * as Blockly from 'blockly/core';
import { IBlocksSimple } from '../../blocksInterface';



export class comment implements IBlocksSimple {
    addWrapper(interpreter: any, globalObject: any) {
        
    }
    category: string= "meta";
    definitionBlocksSimple (blocks:any, javaScript:any):void {
    const ORDER_ATOMIC = 0;
    blocks['comment'] = {
        init: function() {
          this.appendValueInput("TEXT")
              .setCheck(null)
              .appendField("comment /* */")
              .appendField(new Blockly.FieldLabelSerializable(""), "NAME");
          //this.setOutput(true, null);
            this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      };
      
      javaScript['comment'] = function(block: any) {
        // Print statement.
        var msg = javaScript.valueToCode(block, 'TEXT',
        /*javaScript.*/ORDER_ATOMIC) || '\'\'';
        var code= '/*\n' + msg+'\n*/;\n';
        return code;
      };
      
      blocks['debugger'] = {
        init: function() {
          this.appendValueInput("TEXT")
              .setCheck(null)
              .appendField("debugger")
              .appendField(new Blockly.FieldLabelSerializable(""), "NAME");
          //this.setOutput(true, null);
            this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      };
      
      javaScript['debugger'] = function(block: any) {
        // Print statement.
        var msg = javaScript.valueToCode(block, 'TEXT',
        /*javaScript.*/ORDER_ATOMIC) || '\'\'';
        var code= 'startDebugger('+ msg+",'"+ block.id+"',this);\n";
        return code;
      };
}

fieldXML() : string {
    return `<block type="comment">
    <value name="TEXT">
        <shadow type="text">
            <field name="TEXT">Put here comments</field>
        </shadow>
    </value>
</block>
<block type="debugger">
    <value name="TEXT">
        <shadow type="text">
            <field name="TEXT">my message for debug</field>
        </shadow>
    </value>
</block>
`
}
}