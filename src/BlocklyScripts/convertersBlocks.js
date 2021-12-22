// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }

exports.definitionBlocks = function (blocks, javaScript) {
    const ORDER_ATOMIC = 0;
    const ORDER_NONE=99;
    blocks['converttojson'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("ConvertToJSON");
            this.appendValueInput("ValueToConvert")
                .setCheck(null);
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setTooltip("Convert to JSON");
            this.setHelpUrl("");
        }
    };
    javaScript['converttojson'] = function (block) {
        var value_ValueToConvert = javaScript.valueToCode(block, 'ValueToConvert', /*javaScript.*/ORDER_ATOMIC);
        //value_ValueToConvert = value_ValueToConvert.replace(/(\r\n|\n|\r)/gm, "")
        const code = 'JSON.parse(' + value_ValueToConvert + ')';
        return [code, /*javaScript.*/ORDER_NONE];

    };

            blocks['converttostring'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("ConvertToString");
            this.appendValueInput("ValueToConvert")
                .setCheck(null);
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setTooltip("Convert to String");
            this.setHelpUrl("");
        }
    };
    javaScript['converttostring'] = function (block) {
        var value_ValueToConvert = javaScript.valueToCode(block, 'ValueToConvert', /*javaScript.*/ORDER_ATOMIC);
        var code = 'JSON.stringify(' + value_ValueToConvert + ')';
        return [code, /*javaScript.*/ORDER_NONE];
    };

    blocks['convertcsv'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Convert To CSV");
            this.appendValueInput("ArrayToConvert")
                .setCheck(null)
                .appendField("Array to convert");
            //this.setPreviousStatement(true, null);
            //this.setNextStatement(true, null);
            this.setOutput(true, null);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
    javaScript['convertcsv'] = function (block) {
        var data = javaScript.valueToCode(block, 'ArrayToConvert', javaScript.ORDER_ATOMIC);
        var code = 'convertToCSV(' + data+')';
        //return code;
        return [code, /*javaScript.*/ORDER_NONE];
    };
    
    const convertCSV = function (arrayOrString) {
        
        
        let arr = typeof arrayOrString != 'object' ? JSON.parse(arrayOrString) : objArray;
    
        arr = [Object.keys(arr[0])].concat(arr)
        var data = arr.map(it => {
            return Object.values(it).toString()
        }).join('\n');
        // console.log(data);
        return data;
    }
}

exports.fieldXML = function () {
 return `<block type="converttojson"></block>
 <block type="converttostring"></block>
 <block type="convertcsv"></block>
`
}