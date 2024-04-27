import * as Blockly from 'blockly/core';
import { IBlocksSimple } from '../../blocksInterface';

export default class propBlockly implements IBlocksSimple {
 
  
  category: string= "Object Funcs";
  definitionBlocksSimple(blocks: any, javaScript: any) {
    const ALIGN_RIGHT = javaScript.ALIGN_RIGHT;
    const ALIGN_CENTRE = javaScript.ALIGN_CENTRE;
    const ORDER_ATOMIC = javaScript.ORDER_ATOMIC;
    const ORDER_NONE = javaScript.ORDER_NONE;
    blocks['modifyproperty'] = {
      init: function () {
        this.appendDummyInput().appendField('Modify ');
        this.appendValueInput('ObjectToChange')
          .setCheck(null)
          .setAlign(/*Blockly.*/ ALIGN_CENTRE)
          .appendField(
            new Blockly.FieldLabelSerializable('object'),
            'objectName'
          );
        this.appendValueInput('PropertyName')
          .setCheck(null)
          .setAlign(/*Blockly.*/ ALIGN_RIGHT)
          .appendField(new Blockly.FieldLabelSerializable(',property'), 'prop');
        this.appendValueInput('NewValue')
          .setCheck(null)
          .setAlign(/*Blockly.*/ ALIGN_RIGHT)
          .appendField(
            new Blockly.FieldLabelSerializable('toValue'),
            'newValue'
          );
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };
    javaScript['modifyproperty'] = function (block: any) {
      var value_objecttochange = javaScript.valueToCode(
        block,
        'ObjectToChange',
        /*javaScript.*/ ORDER_ATOMIC
      );
      var value_propertyname = javaScript.valueToCode(
        block,
        'PropertyName',
        /*javaScript.*/ ORDER_ATOMIC
      );
      var value_newvalue = javaScript.valueToCode(
        block,
        'NewValue',
        /*javaScript.*/ ORDER_ATOMIC
      );
      var code =
        value_objecttochange +
        '[' +
        value_propertyname +
        ']=' +
        value_newvalue +
        ';';
      return code;
    };
    blocks['getproperty'] = {
      init: function () {
        this.appendDummyInput().appendField('Get from');
        this.appendValueInput('ObjectToChange')
          .setCheck(null)
          .setAlign(/*Blockly.*/ ALIGN_CENTRE)
          .appendField(
            new Blockly.FieldLabelSerializable('object'),
            'objectName'
          );
        this.appendValueInput('PropertyName')
          .setCheck(null)
          .setAlign(/*Blockly.*/ ALIGN_RIGHT)
          .appendField(new Blockly.FieldLabelSerializable('property'), 'prop');
        this.setInputsInline(true);
        this.setOutput(true, null);
        //this.setTooltip("");
        //this.setHelpUrl("");
      },
    };
    javaScript['getproperty'] = function (block: any) {
      var value_objecttochange = javaScript.valueToCode(
        block,
        'ObjectToChange',
        /*javaScript.*/ ORDER_ATOMIC
      );

      var value_propertyname = javaScript.valueToCode(
        block,
        'PropertyName',
        /*javaScript.*/ ORDER_ATOMIC
      );

        const code = `${value_objecttochange}[${value_propertyname}]`;
        return [code, ORDER_NONE];
      /*
      this works for just 1 property - but does not use hack for multiple properties 
      see comment with
      acorn object passed
      
      var code =
        '(function(t){ if (typeof t === "string") return JSON.parse(t);  return t;}(' +
        value_objecttochange +
        '))[' +
        value_propertyname +
        ']';
      */

      // var code =
      // '(function(t, val){   return findPropValue(val,t);})(' +
      // value_propertyname +','+
      // value_objecttochange +
      // ')';

      //return [code, javaScript.ORDER_NONE];
    };
  }

  fieldXML(): string {
    return `
    
    <block type="modifyproperty">
        <value name="PropertyName">
            <shadow type="text">
                <field name="TEXT">enter property name</field>
            </shadow>
        </value>
    </block>
    <block type="getproperty">
        <value name="PropertyName">
            <shadow type="text">
                <field name="TEXT">enter property name</field>
            </shadow>
        </value>

    </block>    
`;
  }

  findPropValue(obj:any, [first, ...rest]:any) : any {
    console.log('this is',obj)
    return rest.length ? this.findPropValue(obj[first], rest) : obj[first];
  }

  findPropValue1(obj:any, [first, ...rest]:any[]){
   
    //  console.log('searchin object ',obj );
    //  console.log(' for property ',first);
    //  console.log(' the rest is ', rest);             
     if(typeof obj === 'string'){
        obj=JSON.parse(obj);
    }
    //acorn object passed
    if(obj.a && obj.L && obj.O ){
        obj=obj.a;
    }

    return rest.length>0 ? this.findPropValue(obj[first], rest) : obj[first];
}
  addWrapper(interpreter: any, globalObject: any) {
    var self=this;
    var findPropValue1= self.findPropValue1;

    var wrapper220 = function(path:any,jsonData:any) {
            
      return interpreter.createPrimitive(findPropValue1(path,jsonData.split('.')));
    };
    interpreter.setProperty(globalObject, 'findPropValue',
        interpreter.createNativeFunction(wrapper220));
  }
}
