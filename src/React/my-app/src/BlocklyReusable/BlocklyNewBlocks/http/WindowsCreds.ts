import * as Blockly from 'blockly/core';
import { IBlocksSimple } from '../../blocksInterface';

export class CredsBlocks implements IBlocksSimple {
  category: string='REST Requests';
  public static nameBlock:string='credsforhttp';

  definitionBlocksSimple( javaScript: any) {
    const ORDER_ATOMIC = javaScript.ORDER_ATOMIC;
    const ORDER_NONE = javaScript.ORDER_NONE;
    
    Blockly.Blocks[CredsBlocks.nameBlock] = {
      init: function () {
        this.appendDummyInput().appendField('Http with Creds');
        this.appendValueInput('HttpDomain')
          .setCheck('String')
          .appendField('Domain');
        this.appendValueInput('WithCreds')
          .setCheck('Boolean')
          .appendField('With Creds ?');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        //this.setColour(230);
        //this.setTooltip("");
        //this.setHelpUrl("");
      },
    };
    javaScript[CredsBlocks.nameBlock] = function (block: any) {
      var value_httpdomain =
        javaScript.valueToCode(
          block,
          'HttpDomain',
          /*javaScript.*/ ORDER_ATOMIC
        ) || '(localSite)';
      var value_headername = javaScript.valueToCode(
        block,
        'WithCreds',
        /*javaScript.*/ ORDER_ATOMIC
      );
      var code =
        'withCredsForDomain[' +
        value_httpdomain +
        ']=' +
        value_headername +
        ';\n';
      return code;
    };
  }

  fieldXML(): any {
    return `<block type="${CredsBlocks.nameBlock}">
    <value name="HttpDomain">
        <shadow type="text">
            <field name="TEXT">(localSite)</field>
        </shadow>
    </value>
    <value name="WithCreds">
        <shadow type="logic_boolean">
            <field name="BOOL">FALSE</field>
        </shadow>
    </value>
</block>
`;
  }

  public addWrapper(interpreter: any, globalObject:any){
    
    var withCredsForDomain = interpreter.nativeToPseudo({ '(localSite)': false });
    interpreter.setProperty(globalObject, 'withCredsForDomain', withCredsForDomain);

  }
}
