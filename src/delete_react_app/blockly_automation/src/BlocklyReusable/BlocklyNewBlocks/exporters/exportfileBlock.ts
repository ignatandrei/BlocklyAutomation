import * as  FileSaver from "file-saver";
// import * as Blockly from 'blockly/core';
import { IBlocksSimple } from '../../blocksInterface';

export class exportFileBlock implements IBlocksSimple {
  
  addWrapper(interpreter: any, globalObject: any) {
    var self=this;
    var wrapper90 = (it:any, content:any, toByte:any) => self.exportToFile(it, content, toByte);
            interpreter.setProperty(globalObject, 'exportToFile',
                    interpreter.createNativeFunction(wrapper90));
  }
  category: string = "Exporters";
  definitionBlocksSimple(blocks: any, javaScript: any) {
    const ORDER_ATOMIC = javaScript.ORDER_ATOMIC;
    //const ORDER_NONE = javaScript.ORDER_NONE;

    blocks['exportfile'] = {
      init: function () {
        this.appendDummyInput().appendField('ExportToFile');
        this.appendValueInput('fileName')
          .setCheck(null)
          .appendField('FileName');
        this.appendValueInput('contentFile')
          .setCheck(null)
          .appendField('Content');
        this.appendValueInput('convertToByte')
          .setCheck('Boolean')
          .appendField('ConvertToByteFromBase64');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };

    javaScript['exportfile'] = function (block: any) {
      var value_filename = javaScript.valueToCode(
        block,
        'fileName',
        /*javaScript.*/ ORDER_ATOMIC
      );
      var value_contentfile = javaScript.valueToCode(
        block,
        'contentFile',
        /*javaScript.*/ ORDER_ATOMIC
      );
      var value_converttobyte = javaScript.valueToCode(
        block,
        'convertToByte',
        /*javaScript.*/ ORDER_ATOMIC
      );

      var code =
        'exportToFile(' +
        value_filename +
        ',' +
        value_contentfile +
        ',' +
        value_converttobyte +
        ');\n';
      return code;
    };
  }

  fieldXML() : string {
    return `<block type="exportfile">
    <value name="fileName">
        <shadow type="text">
            <field name="TEXT">abc</field>
        </shadow>
    </value>
    <value name="convertToByte">
        <shadow type="logic_boolean">
            <field name="BOOL">FALSE</field>
        </shadow>
    </value>
</block>
`;
  }
  b64toBlob1(b64Data:any, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

  exportToFile (nameFile:any, content:any, toByte:boolean) {

    // try {
    //     var isFileSaverSupported = !!new Blob;
    // } catch (e) {
    //     window.alert('file saving not supported');
    //     return;
    // }
  //   var FileSaver = require('file-saver');

    var blob ;
    
    if (toByte === true) {
        blob = this.b64toBlob1(content,'',512);
    }
    else {
        blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    }    
    FileSaver.saveAs(blob, nameFile);    
    return nameFile;
}
}
