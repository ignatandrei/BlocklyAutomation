import * as Blockly from 'blockly';

export class chartBlocks {
  definitionBlocks(blocks: any, javaScript: any) {
    // const value_json = javaScript.valueToCode(block, 'JSON', ORDER_ATOMIC);
    //     const code = `JSON.parse(${value_json})`;
    //     return [code, ORDER_NONE];
    blocks['chart_js'] = {
      init: function () {
        this.appendDummyInput()
          .appendField('ChartType')
          .appendField(
            new Blockly.FieldDropdown([
              ['HBar', 'HBar'],
              ['VBar', 'VBar'],
            ]),
            'ChartTypeValue'
          );
        this.appendValueInput('ChartTitleValue')
          .setCheck(null)
          .appendField(
            new Blockly.FieldLabelSerializable('Title'),
            'ChartTitle'
          );
        this.appendValueInput('LabelsValue')
          .setCheck('Array')
          .appendField(
            new Blockly.FieldLabelSerializable('Labels'),
            'ChartLabels'
          );
        this.appendValueInput('DataSet1Label')
          .setCheck('String')
          .appendField(
            new Blockly.FieldLabelSerializable('DataSet1 Label'),
            'DataSetLabel1'
          );
        this.appendValueInput('DataSet1Data')
          .setCheck('Array')
          .appendField(
            new Blockly.FieldLabelSerializable('DataSet1 Data'),
            'DataSetData1'
          );
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };

    javaScript['chart_js'] = function (block:any) {
      var dropdown_charttypevalue = block.getFieldValue('ChartTypeValue');
      var value_charttitlevalue = javaScript.valueToCode(
        block,
        'ChartTitleValue',
        javaScript.ORDER_ATOMIC
      );
      var value_labelsvalue = javaScript.valueToCode(
        block,
        'LabelsValue',
        javaScript.ORDER_ATOMIC
      );
      var value_dataset1label = javaScript.valueToCode(
        block,
        'DataSet1Label',
        javaScript.ORDER_ATOMIC
      );
      var value_dataset1data = javaScript.valueToCode(
        block,
        'DataSet1Data',
        javaScript.ORDER_ATOMIC
      );
      //var backgroundColor: ["red", "blue", "green", "blue", "red", "blue"],
      var barType = '';
      var indexAxis = 'x';
      switch (dropdown_charttypevalue) {
        case 'HBar':
          barType = 'bar';
          indexAxis = 'y';
          break;
        case 'VBar':
          barType = 'bar';
          break;
        default:
          throw 'Unknown chart type:' + dropdown_charttypevalue;
      }
      // window.alert(indexAxis);
      var code = `JSON.stringify({ 'type': '${barType}', 'options':{ 'indexAxis':'${indexAxis}'},  'data': {  'labels': ${value_labelsvalue}, 'datasets': [{ 'backgroundColor': ['green','blue'],'label': ${value_dataset1label}, 'data': ${value_dataset1data} }] } })`;

      return [code, javaScript.ORDER_NONE];
    };
  }

  fieldXML() : string {
    return `<block type="chart_js"></block>`;
  }
}
