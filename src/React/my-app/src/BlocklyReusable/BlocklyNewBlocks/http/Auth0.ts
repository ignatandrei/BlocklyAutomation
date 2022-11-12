import * as Blockly from 'blockly/core';
import { IBlocksSimple } from '../../blocksInterface';


export default class auth0Blocks implements IBlocksSimple {
 
  addWrapper(interpreter: any, globalObject: any) {
      
  }
  category: string="REST Requests";
  definitionBlocksSimple(blocks: any, javaScript: any) {
    const ORDER_ATOMIC = 0;
    const ORDER_NONE = 99;
    blocks['auth0webapidata'] = {
      init: function () {
        this.appendDummyInput().appendField('Auth0');
        this.appendValueInput('client_id')
          .setCheck(null)
          .appendField('client_id');
        this.appendValueInput('client_secret')
          .setCheck(null)
          .appendField('client_secret');
        this.appendValueInput('audience')
          .setCheck(null)
          .appendField('audience');
        this.appendValueInput('grant_type')
          .setCheck(null)
          .appendField('grant_type');
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };

    javaScript['auth0webapidata'] = function (block: any) {
      var value_client_id = javaScript.valueToCode(
        block,
        'client_id',
        /*javaScript.*/ ORDER_ATOMIC
      );
      var value_client_secret = javaScript.valueToCode(
        block,
        'client_secret',
        /*javaScript.*/ ORDER_ATOMIC
      );
      var value_audience = javaScript.valueToCode(
        block,
        'audience',
        /*javaScript.*/ ORDER_ATOMIC
      );
      var value_grant_type = javaScript.valueToCode(
        block,
        'grant_type',
        /*javaScript.*/ ORDER_ATOMIC
      );

      var code = '{"client_id":' + value_client_id;
      code += ',"client_secret":' + value_client_secret;
      code += ',"audience":' + value_audience;
      code += ',"grant_type":' + value_grant_type;
      code += '}';

      return [code, /*javaScript.*/ ORDER_NONE];
    };
  }

  fieldXML(): string {
    return `<category id="Auth0" name="Auth0">
    <block type="auth0webapidata">
        <value name="client_id">
            <shadow type="text">
                <field name="TEXT">client_id?</field>
            </shadow>

        </value>
        <value name="client_secret">
            <shadow type="text">
                <field name="TEXT">client_secret?</field>
            </shadow>

        </value>
        <value name="audience">
            <shadow type="text">
                <field name="TEXT">audience</field>
            </shadow>

        </value>
        <value name="grant_type">
            <shadow type="text">
                <field name="TEXT">grant_type?</field>
            </shadow>

        </value>
    </block>
</category>
`;
  }
}
