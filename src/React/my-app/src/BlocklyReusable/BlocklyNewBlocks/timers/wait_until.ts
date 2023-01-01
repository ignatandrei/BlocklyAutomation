
// import * as Blockly from 'blockly/core';
import { IBlocksSimple } from '../../blocksInterface';

export  default class waitUntilBlock implements IBlocksSimple {
    public static nameBlock:string =  'wait_until';
    category: string='Timers';
  definitionBlocksSimple(blocks: any,javaScript: any) {
   
    // blocks['wait'] = {
    //   init: function () {
    //     this.appendValueInput('VALUE').appendField('wait secs');
    //     // .appendField("delay")
    //     // .appendField(new Blockly.FieldNumber(10, 0), "wait")
    //     // .appendField("secs");
    //     this.setPreviousStatement(true, null);
    //     this.setNextStatement(true, null);
    //     //this.setColour();
    //     //this.setTooltip('');
    //     //this.setHelpUrl('');
    //   },
    // };

    // javaScript['wait'] = function (block: any) {
    //   var number_wait =
    //     javaScript.valueToCode(block, 'VALUE', javaScript.ORDER_ATOMIC) || '';
    //   var code = 'waitTime(' + number_wait + ');';
    //   return code;
    // };

    blocks['wait_until'] = {
      init: function () {
        this.appendValueInput('VALUE').appendField('wait until date');

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        //this.setColour();
        //this.setTooltip('');
        //this.setHelpUrl('');
      },
    };

    javaScript['wait_until'] = function (block: any) {
      var number_wait =
        javaScript.valueToCode(block, 'VALUE', javaScript.ORDER_ATOMIC) ||
        '';
      //console.log(number_wait);

      var code = 'waitTime((' + number_wait + '-new Date())/1000);';
      return code;
    };
  }

  fieldXML(): string {
    return `   
<block type="wait_until">

</block>`;
  }

  addWrapper(interpreter: any, globalObject: any) {
    var wrapper70 = (nr:any, callback:any) => {
        console.log(`waiting seconds ${nr}`);
        setTimeout(callback, nr * 1000);
    };
    interpreter.setProperty(globalObject, 'waitTime',
        interpreter.createAsyncFunction(wrapper70));
}
}
