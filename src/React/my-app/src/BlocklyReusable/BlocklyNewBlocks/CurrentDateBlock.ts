// export class { definitionBlocks (blocks:any, javaScript:any) {
// }

// fieldXML() : string {
// }
import * as Blockly from 'blockly/core';
import IBlocks from '../blocksInterface';

export class CurrentDateBlock implements IBlocks  {

  public static nameBlock:string =  'displayCurrentDate';

  public definitionBlocks(javascriptGenerator: any) {
    /*
     * Block that display the current date time
     * @Author: Popescu Ionut Cosmin (cosmin.popescu93@gmail.com)
     * https://github.com/cosminpopescu14
     */
    const ORDER_NONE = javascriptGenerator.ORDER_NONE;
    Blockly.Blocks[CurrentDateBlock.nameBlock] = {
      init: function () {
        this.appendDummyInput().appendField('Current Date');
        this.appendDummyInput()
          .appendField('Pick date format:')
          .appendField(
            new Blockly.FieldDropdown([
              ['Unix format', 'unix'],
              ['ISO format', 'iso'],
              ['Human format', 'human'],
            ]),
            'dateFormat'
          );

        this.setOutput(true, null);
        this.setColour(100);
        this.setTooltip('Show current date.');
        this.setHelpUrl('https://www.w3schools.com/jsref/jsref_obj_date.asp');
      },
    };
    const dateFormats = {
      UNIX: 'unix',
      ISO: 'iso',
      HUMAN: 'human',
    };
    javascriptGenerator.addReservedWords(CurrentDateBlock.nameBlock);
    javascriptGenerator[CurrentDateBlock.nameBlock] = (block: any) => {
      let dropdownOption = block.getFieldValue('dateFormat');

      let operation = '';
      switch (dropdownOption.toString()) {
        case dateFormats.HUMAN:
          operation = `displayDateFormatted('${dateFormats.HUMAN}')`;
          break;
        case dateFormats.ISO:
          operation = `displayDateFormatted('${dateFormats.ISO}')`;
          break;
        case dateFormats.UNIX:
          operation = `displayDateFormatted('${dateFormats.UNIX}')`;
          break;

        default:
          console.log('Date time format not suported');
      }

      let code = operation;
      return [code, /*javaScript.*/ ORDER_NONE];
    };
  }

  public fieldXML(): string {
    return `<block type="displayCurrentDate"></block>`;
  }

  public addWrapper(interpreter: any, globalObject:any){
    var self=this;
    var wrapperdisplayDateFormatted = (it:any) => self.displayDateFormatted(it);

    interpreter.setProperty(globalObject, 'displayDateFormatted',
                  interpreter.createNativeFunction(wrapperdisplayDateFormatted));

  }
  displayDateFormatted(format:any) {

    switch (format) {
        case 'human':
          {
            // console.log("calling displayDateCurrentAsHuman")
            let today = new Date().toLocaleDateString(undefined, {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
          });
          return today;
        }
        case 'iso':
         {   //console.log("calling displayDateCurrentAsIso")
            let today = new Date().toISOString();
            return today;
         }
         case 'unix':
         {   // console.log("calling displayDateCurrentAsUnix")
          return Date.now();
         }
        default:
            console.log('Date time format not suported');
            return '';

    }
}
}

export default CurrentDateBlock;