import * as Blockly from 'blockly';

export class guiBlocks {
  definitionBlocks = function (blocks: any, javaScript: any) {
    const ORDER_NONE = 99;
    const ORDER_ATOMIC = 0;
    blocks['window_open'] = {
      init: function () {
        this.jsonInit({
          message0: 'Open %1',
          args0: [
            {
              type: 'input_value',
              name: 'TEXT',
            },
          ],
          previousStatement: null,
          nextStatement: null,
          style: 'text_blocks',
        });
      },
    };

    javaScript['window_open'] = function (block: any) {
      // Print statement.
      var msg =
        javaScript.valueToCode(block, 'TEXT', /*javaScript.*/ ORDER_NONE) ||
        "''";

      return (
        'if((typeof ' +
        msg +
        ' == "object") && ("to" in ' +
        msg +
        ')){open("mailto:' +
        msg.to +
        '")}else{ open(' +
        msg +
        ')};\n'
      );
    };

    blocks['text_message'] = {
      init: function () {
        this.jsonInit({
          message0: 'alert %1',
          args0: [
            {
              type: 'input_value',
              name: 'TEXT',
            },
          ],
          previousStatement: null,
          nextStatement: null,
          style: 'text_blocks',
        });
      },
    };
    javaScript['text_message'] = function (block: any) {
      // Print statement.
      var msg =
        javaScript.valueToCode(block, 'TEXT', /*javaScript.*/ ORDER_NONE) ||
        "''";

      var code = 'alert1(' + msg + ');\n';
      return code;
    };

    blocks['text_print_return'] = {
      init: function () {
        this.appendValueInput('TEXT')
          .setCheck(null)
          .appendField('print return')
          .appendField(new Blockly.FieldLabelSerializable(''), 'NAME');
        this.setOutput(true, null);

        this.setTooltip('');
        this.setHelpUrl('');
      },
    };

    javaScript['text_print_return'] = function (block: any) {
      // Print statement.
      var msg =
        javaScript.valueToCode(block, 'TEXT', /*javaScript.*/ ORDER_ATOMIC) ||
        "''";

      var code =
        '(function(){window.alert(' + msg + ');\n;return (' + msg + ');}())\n';
      return [code, /*javaScript.*/ ORDER_NONE];
    };

    blocks['valuefromtext'] = {
      init: function () {
        this.appendDummyInput().appendField('InputFromText');
        this.appendValueInput('IdOfText')
          .setCheck('String')
          .appendField('Text id');
        this.appendValueInput('ValueToObtain')
          .setCheck('String')
          .appendField('Property');
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };

    javaScript['valuefromtext'] = function (block: any) {
      var value_idoftext = javaScript.valueToCode(
        block,
        'IdOfText',
        /*javaScript.*/ ORDER_ATOMIC
      );
      var value_valuetoobtain =
        javaScript.valueToCode(
          block,
          'ValueToObtain',
          /*javaScript.*/ ORDER_ATOMIC
        ) || '"value"';
      var code =
        'getIDProp(' + value_idoftext + ',' + value_valuetoobtain + ')';
      return [code, /*javaScript.*/ ORDER_NONE];
    };
  };

  fieldXML(): string {
    return `<block type="window_open"></block>
    <block type="valuefromtext">
        <value name="IdOfText">
            <shadow type="text">
                <field name="TEXT">output</field>
            </shadow>
        </value>
        <value name="ValueToObtain">
            <shadow type="text">
                <field name="TEXT">value</field>
            </shadow>
        </value>
    </block>
    <block type="text_print"></block>
    <block type="text_print_return"></block>  
    <block type="text_prompt_ext"></block>
    <block type="text_message"></block>
    
    `;
  }
}
