//import * as Blockly from 'blockly/core';
import { IBlocksSimple } from '../../blocksInterface';
export default class convertersBlocks implements IBlocksSimple {
    addWrapper(interpreter: any, globalObject: any) {
        var wrapper100 = (arrayOrString:any) => {             
            //console.log('z',arrayOrString,typeof arrayOrString);
            var arr= null;
            if(Array.isArray(arrayOrString)){
                arr = arrayOrString;
            }
            else{
                arr = typeof arrayOrString != 'object' ? JSON.parse(arrayOrString) : {};
                if(arr && arr.table0){//compatibility with table parser blocks
                    arr = arr.table0;
                }
                if(arr && arr.list0){//compatibility with list parser blocks
                    arr = arr.list0;
                }
            }
            if(arr.length === 0)
                return "";

            arr = [Object.keys(arr[0])].concat(arr)
            var data = arr.map(it => {
                return Object.values(it).toString()
            }).join('\n');
            return data;
        
        }
        interpreter.setProperty(globalObject, 'convertToCSV',
            interpreter.createNativeFunction(wrapper100));


            var wrapper101 = (arrayOrString:any) => {             
                //console.log('z',arrayOrString,typeof arrayOrString);
                var arr= null;
                if(Array.isArray(arrayOrString)){
                    arr = arrayOrString;
                }
                else{
                    arr = typeof arrayOrString != 'object' ? JSON.parse(arrayOrString) : {};
                    if(arr && arr.table0){//compatibility with table parser blocks
                        arr = arr.table0;
                    }
                    if(arr && arr.list0){//compatibility with list parser blocks
                        arr = arr.list0;
                    }
                }
                if(arr.length === 0)
                    return "";
                var keys=Object.keys(arr[0]);
                var data= "<table border='1'><tr><th>No</th>";
                data += keys.map((it :any )=> `<th>${it}</th>\n`).join('');
                data+="</tr>";
                data+= arr.map((it:any, index:number)=> `<tr><td>${index+1}</td>${Object.values(it).map(it=>`<td>${it}</td>`).join('')}</tr>`).join('');
                data+="</table>";
                
                
                return data;
            
            }
            interpreter.setProperty(globalObject, 'convertArrToTable',
                interpreter.createNativeFunction(wrapper101));
    }
    
    category: string ="Converters"; 

    definitionBlocksSimple (blocks:any, javaScript:any) { 
    const ORDER_ATOMIC = javaScript.ORDER_ATOMIC;
    const ORDER_NONE=javaScript.ORDER_NONE;
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
    javaScript['converttojson'] = function (block:any) {
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
    javaScript['converttostring'] = function (block:any) {
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
    javaScript['convertcsv'] = function (block:any) {
        var data = javaScript.valueToCode(block, 'ArrayToConvert', javaScript.ORDER_ATOMIC);
        var code = 'convertToCSV(' + data+')';
        //return code;
        return [code, /*javaScript.*/ORDER_NONE];
    };



    blocks['convertToTable'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Convert To Table");
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
    javaScript['convertToTable'] = function (block:any) {
        var data = javaScript.valueToCode(block, 'ArrayToConvert', javaScript.ORDER_ATOMIC);
        var code = 'convertArrToTable(' + data+')';
        //return code;
        return [code, /*javaScript.*/ORDER_NONE];
    };
    
    // const convertCSV = function (arrayOrString) {
        
        
    //     let arr = typeof arrayOrString != 'object' ? JSON.parse(arrayOrString) : objArray;
    
    //     arr = [Object.keys(arr[0])].concat(arr)
    //     var data = arr.map(it => {
    //         return Object.values(it).toString()
    //     }).join('\n');
    //     // console.log(data);
    //     return data;
    // }
}

fieldXML() : string {
 return `<block type="converttojson"></block>
 <block type="converttostring"></block>
 <block type="convertcsv"></block>
 <block type="convertToTable"></block>

`
}
}