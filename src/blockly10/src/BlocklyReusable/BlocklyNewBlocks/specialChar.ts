import * as Blockly from "blockly/core";
import { IBlocksSimple } from "../blocksInterface";
//imported from
//https://groups.google.com/g/blockly/c/1g2rfcgm-aM
export class SpecialCharBlock implements IBlocksSimple {
    definitionBlocksSimple(blocks: any, javascriptGenerator: any): void {
        blocks[SpecialCharBlock.nameBlock] = {
            init: function () {
            this.setOutput(true, 'String');
            this.appendDummyInput('')
            .appendField('Special character:')
            .appendField(new Blockly.FieldDropdown([['Line Feed (\\n)', '\\n'], ['Carriage Return (\\r)', '\\r'], ['Carriage Return Line Feed (\\r\\n)', '\\r\\n'], ['Tab (\\t)', '\\t']]), 'character');
            this.setColour(Blockly.Msg.TEXTS_HUE ? Blockly.Msg.TEXTS_HUE : Blockly.Blocks.texts.HUE);
            this.setTooltip('');
            this.setHelpUrl('');
            }
           };   
           javascriptGenerator[SpecialCharBlock.nameBlock] = function (block:any) {
            var code = '\'' + (block.getFieldValue('character') || '') + '\'';
            return [code, javascriptGenerator.ORDER_ATOMIC];
           };
    }
    addWrapper(interpreter: any, globalObject: any) {
    }
    fieldXML(): string {
        return `<block type="${SpecialCharBlock.nameBlock}">
        </block>
`;
    }
    category: string='other';
    public static nameBlock: string = "SpecialChar";
}  