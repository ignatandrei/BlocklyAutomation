import * as Blockly from "blockly/core";
import { IBlocksSimple } from "../blocksInterface";

export class tts implements IBlocksSimple {
 
  category: string='Audio';
  public static nameBlock: string = "ttsBlock";
  definitionBlocksSimple(blocks: any,javascriptGenerator: any) {
    blocks[tts.nameBlock] = {
      init: function () {
        this.appendValueInput("NAME")
          .setCheck(null)
          .appendField("Voice")
          .appendField(
            new Blockly.FieldDropdown(this.generateOptions),
            "voiceSelected"
          );

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      },
      generateOptions: function () {
        if (window.speechSynthesis) {
          var s = window.speechSynthesis
            .getVoices()
            .map((it, index) => [it.name, "voice" + index]);
          if (s.length > 0) return s;
        }
        return [["no voice", "NoVoice"]];
      },
    };
    javascriptGenerator[tts.nameBlock] = function (block: any) {
      var dropdown_voice = block.getFieldValue("voiceSelected");
      dropdown_voice = dropdown_voice.replace("voice", "");
      var value_name = javascriptGenerator.valueToCode(
        block,
        "NAME",
        javascriptGenerator.ORDER_ATOMIC
      );
      if (dropdown_voice == "NoVoice") {
        dropdown_voice = "-1";
      }
      var code = "speakDefault(" + value_name + "," + dropdown_voice + ");\n";
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
  public addWrapper(interpreter: any, globalObject:any){
    var self=this;
    var wrapperSpeakDefault= self.speakDefault;

    interpreter.setProperty(globalObject, 'speakDefault',
                  interpreter.createNativeFunction(wrapperSpeakDefault));

  }
  public speakDefault(
    text: any,
    voiceNr: any,
    rate: any,
    pitch: any,
    volume: any
  ) {
    var msg = new SpeechSynthesisUtterance(text);
    var nr = parseInt(voiceNr);
    if (nr < 0) {
      console.log(" no voice selected");
      return;
    }
    var voice = window.speechSynthesis.getVoices()[nr];
    //window.alert(nr);
    msg.voice = voice;
    window.speechSynthesis.speak(msg);
  }
}
