// export class { definitionBlocks (blocks:any, javaScript:any) {
// }

// fieldXML() : string {
// }
import * as Blockly from 'blockly';

// const a = require('./audioTest.js');
export class tts {
  definitionBlocks(blocks: any, javaScript: any) {
    blocks['ttsBlock'] = {
      init: function () {
        this.appendValueInput('NAME')
          .setCheck(null)
          .appendField('Voice')
          .appendField(
            new Blockly.FieldDropdown(this.generateOptions),
            'voiceSelected'
          );

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
      },
      generateOptions: function () {
        var options = [];
        if (window.speechSynthesis) {
          var s = window.speechSynthesis
            .getVoices()
            .map((it, index) => [it.name, 'voice' + index]);
          if (s.length > 0) return s;
        }
        return [['no voice', 'NoVoice']];
      },
    };
    javaScript['ttsBlock'] = function (block: any) {
      var dropdown_voice = block.getFieldValue('voiceSelected');
      dropdown_voice = dropdown_voice.replace('voice', '');
      var value_name = javaScript.valueToCode(
        block,
        'NAME',
        javaScript.ORDER_ATOMIC
      );
      var code = 'speakDefault(' + value_name + ',' + dropdown_voice + ');\n';
      // console.log(a);
      // var piano = a.Synth.createInstrument('piano');
      // piano.play('C', 4, 2);
      return code;
    };
  }

  fieldXML(): string {
    return `<block type="ttsBlock">
        <value name="NAME">
            <shadow type="text">
            <field name="TEXT">Hello</field></shadow>
        </value>       
        </block>
`;
  }
}
