import * as Blockly from 'blockly/core';
import { IBlocksSimple } from '../../blocksInterface';


export default class metaShw implements IBlocksSimple {
  
  addWrapper(interpreter: any, globalObject: any) {
    var wrapper = function(val:number) {
        (globalThis as any)["VisualAPIShow"](val);
    };
    interpreter.setProperty(globalObject, 'metaShow',
        interpreter.createNativeFunction(wrapper));

  }
  category: string="meta";
  definitionBlocksSimple(blocks: any, javaScript: any) {
    blocks['metadisplay'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("Show=>")
              .appendField(new Blockly.FieldDropdown([["None","6"], ["Output","0"], ["HTML","4"], ["JSON","5"], ["Blocks","1"], ["Code","3"], ["XML","2"]]), "what");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      };
    javaScript['metadisplay'] = function(block: any) {
        var dropdown_what = block.getFieldValue('what');
        
        var code = '\n;metaShow('+ dropdown_what+ ');\n';
        return code;
      };
  };

  fieldXML(): string {
    return `<block type="metadisplay"></block>`;
  }
}
