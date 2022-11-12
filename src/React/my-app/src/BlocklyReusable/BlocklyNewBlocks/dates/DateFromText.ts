
import * as Blockly from 'blockly/core';
import IBlocks from '../../blocksInterface';
export default class DateFromTextBlock implements IBlocks {
  static nameBlock:string='DateFromText';
  category: string='Dates';
  definitionBlocks(javaScript: any) {
    // const ORDER_NONE = 99;
    Blockly.Blocks['DateFromText'] = {
      init: function () {
        this.appendValueInput('VALUE').appendField('Date from ');
        this.setOutput(true, null);
        this.setHelpUrl(
          'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format'
        );
      },
    };

    javaScript['DateFromText'] = (block:any) => {
      let data =
        javaScript.valueToCode(block, 'VALUE', javaScript.ORDER_ATOMIC) || '';
      //console.log(data);
      //console.log(data.length);
      //read about formats at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format
      //if(!(data.length ==12 || data.length ==21))// '' means 10+2 or 19+2
      //	throw " data should be yyyy-MM-dd or yyyy-MM-ddTHH:mm:ss";

      let code = 'Date.parse(' + data + ')';
      return [code, javaScript.ORDER_NONE];
    };
  }

  fieldXML() : string {
    return `<block type="DateFromText">
    <value name="VALUE">
        <shadow type="text">
            <field name="TEXT">1970-04-16T02:00:00</field>
        </shadow>
    </value>
</block>
`;
  }

  addWrapper(interpreter: any, globalObject: any) {
    
}
}
