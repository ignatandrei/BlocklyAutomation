// export class { definitionBlocks (blocks:any, javaScript:any) {
// }import { IBlocksSimple }

// fieldXML() : string {
// }
import * as Blockly from 'blockly/core';
import { IBlocksSimple } from '../../blocksInterface';

export class windowBlock implements IBlocksSimple  {
  category: string='Browser';

  public static nameBlock:string =  'windowBlock';

  public definitionBlocksSimple(blocks: any,javascriptGenerator: any) {
    const ORDER_NONE = javascriptGenerator.ORDER_NONE;
    blocks[windowBlock.nameBlock] = {
      init: function () {
        
            this.appendDummyInput()
                .appendField("window.");
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["location","location"], ["localStorage","localStorage"], ["sessionStorage","sessionStorage"]]), "propWindow");
            this.setInputsInline(true);
            this.setOutput(true, "String");
            this.setColour(230);
         this.setTooltip("window properties");
         this.setHelpUrl("")
        
    }
    };
    
    javascriptGenerator.addReservedWords(windowBlock.nameBlock);
    javascriptGenerator[windowBlock.nameBlock] = (block: any) => {

        var dropdown_propwindow = block.getFieldValue('propWindow');
        // var value_object=window[dropdown_propwindow];        
      const code = `wrapperWindow('${dropdown_propwindow}')`;
      return [code, ORDER_NONE];
    };
  }

  public fieldXML(): string {
    return `<block type="${windowBlock.nameBlock}"></block>`;
  }

  public addWrapper(interpreter: any, globalObject:any){
    // var self=this;
    var wrapperWindow = (it:any) => JSON.stringify(window[it]);

    interpreter.setProperty(globalObject, 'wrapperWindow',
                  interpreter.createNativeFunction(wrapperWindow));

  }

}

export default windowBlock;