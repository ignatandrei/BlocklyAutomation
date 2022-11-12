import * as Blockly from 'blockly/core';
import IBlocks from '../blocksInterface';
// import {Synth} from './audioTest';
// declare var require: any;
const synthPiano = require('./audioTest');
// declare var synthPiano : any;
// const a = require('./audioTest.js');
export class piano implements IBlocks{
    public static nameBlock: string = "pianoBlock";
    category: string='Audio';
  definitionBlocks(javaScript: any) {
    Blockly.Blocks[piano.nameBlock] = {
      init: function () {
        this.appendValueInput('Note')
          .setCheck('String')
          .appendField('Note(A-G)');
        this.appendValueInput('Sharp').setCheck('Boolean').appendField('#');
        this.appendValueInput('Octave')
          .setCheck('Number')
          .appendField('Octave');
        this.appendValueInput('Duration')
          .setCheck('Number')
          .appendField('Duration');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('https://github.com/keithwhor/audiosynth');
      },
    };
    javaScript['pianoBlock'] = function (block: any) {
      // var dropdown_voice = block.getFieldValue('Voice');
      var value_note = javaScript.valueToCode(
        block,
        'Note',
        javaScript.ORDER_ATOMIC
      );
      var value_sharp =
        javaScript.valueToCode(block, 'Sharp', javaScript.ORDER_ATOMIC) ||
        false;
      var value_octave = javaScript.valueToCode(
        block,
        'Octave',
        javaScript.ORDER_ATOMIC
      );
      var value_duration =
        javaScript.valueToCode(block, 'Duration', javaScript.ORDER_ATOMIC) || 2;

      var valSharp = '';
      if (value_sharp === 'true') {
        valSharp = '#';
      }
      var code =
        'playPiano(' +
        value_note +
        valSharp +
        ',' +
        value_octave +
        ',' +
        value_duration +
        ');\n';
      return code;
    };

    Blockly.Blocks['cmajor'] = {
      init: function () {
        this.appendDummyInput().appendField('CMajor ');
        this.setOutput(true, 'Array');
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };
    javaScript['cmajor'] = function (block: any) {
      var code = '["C","D","E","F","G","A","B"]';
      return [code, javaScript.ORDER_NONE];
    };
  }

  fieldXML(): string {
    return `<block type="pianoBlock">
        <value name="Note">
            <shadow type="text">
            <field name="TEXT">C</field></shadow>
        </value>       
        <value name="Octave">
            <shadow type="math_number">
            <field name="NUM">4</field></shadow>
        </value>       
        <value name="Sharp">
            <shadow type="logic_boolean">
            <field name="BOOL">FALSE</field></shadow>
        </value>       
        
        <value name="Duration">
            <shadow type="math_number">
            <field name="NUM">2</field></shadow>
        </value>       
        </block>
        <block type="cmajor"></block>

`;
  }

  public addWrapper(interpreter: any, globalObject:any){
    var self=this;
    var wrapperPiano= self.playPiano;

    interpreter.setProperty(globalObject, 'playPiano',
                  interpreter.createNativeFunction(wrapperPiano));
  }
  public playPiano(note:any, octave:any, duration:any) {
    var piano = synthPiano.Synth.createInstrument('piano');
    piano.play(note,octave,duration);
    //window.alert(text);
  };
}
