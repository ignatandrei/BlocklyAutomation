// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }
exports.definitionBlocks = function (blocks, javaScript,BlocklyFieldDropdown , BlocklyFieldLabelSerializable) {


    // const value_json = javaScript.valueToCode(block, 'JSON', ORDER_ATOMIC);
    //     const code = `JSON.parse(${value_json})`;
    //     return [code, ORDER_NONE];

    blocks['chart_js'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("ChartType")
              .appendField(BlocklyFieldDropdown ([["HBar","HBar"], ["VBar","VBar"]]), "ChartTypeValue");
          this.appendValueInput("ChartTitleValue")
              .setCheck(null)
              .appendField(BlocklyFieldLabelSerializable("Title"), "ChartTitle");
          this.appendValueInput("LabelsValue")
              .setCheck("Array")
              .appendField(BlocklyFieldLabelSerializable("Labels"), "ChartLabels");
          this.appendValueInput("DataSet1Label")
              .setCheck("String")
              .appendField(BlocklyFieldLabelSerializable("DataSet1 Label"), "DataSetLabel1");
          this.appendValueInput("DataSet1Data")
              .setCheck("Array")
              .appendField(BlocklyFieldLabelSerializable("DataSet1 Data"), "DataSetData1");
          this.setOutput(true, null);
          this.setColour(230);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      };

      javaScript['chart_js'] = function(block) {
        var dropdown_charttypevalue = block.getFieldValue('ChartTypeValue');
        var value_charttitlevalue = javaScript.valueToCode(block, 'ChartTitleValue', javaScript.ORDER_ATOMIC);
        var value_labelsvalue = javaScript.valueToCode(block, 'LabelsValue', javaScript.ORDER_ATOMIC);
        var value_dataset1label = javaScript.valueToCode(block, 'DataSet1Label', javaScript.ORDER_ATOMIC);
        var value_dataset1data = javaScript.valueToCode(block, 'DataSet1Data', javaScript.ORDER_ATOMIC);
        var barType= "";
        switch (dropdown_charttypevalue) {
            case "HBar":
                barType="bar";
                break;
            case "VBar":
                barType="bar";
                break;
            default:
                throw "Unknown chart type:"+dropdown_charttypevalue;
        }
        var code = `{ 'type': '${barType}', 'data': { 'labels': ${value_labelsvalue}, 'datasets': [{ 'label': ${value_dataset1label}, 'data': ${value_dataset1data} }] }, 'options': { 'title': { 'display': true, 'text': ${value_charttitlevalue} } } }`;
        
        return [code, javaScript.ORDER_NONE];
      };


}

exports.fieldXML = function () {
    return `<block type="chart_js"></block>`;
 
}