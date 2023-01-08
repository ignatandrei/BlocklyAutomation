import { IBlocksSimple } from '../../blocksInterface';


export default class HTMLParserAttributeValue implements IBlocksSimple{
 
  addWrapper(interpreter: any, globalObject: any) {
    var self=this;
    var wrapper20 = function(html:any,type:any, attrName:any, value:any) {                
      html= html ? html.toString() : '';
      return self.parseDOMFromStringToAttrVal(html,type,attrName,value);
    };
    interpreter.setProperty(globalObject, 'parseDOMFromStringToAttrVal',
        interpreter.createNativeFunction(wrapper20));
  }
  category: string='HTMLParser';
  definitionBlocksSimple(blocks: any, javaScript: any) {
    blocks['htmlParserAttrVal'] = {
      init: function () {
            this.appendDummyInput()
                .appendField("Find ");
                this.appendValueInput("html")
                .setCheck("String")
                .appendField("HTMLText");
                this.appendValueInput("Attr")
                .setCheck("String")
                .appendField("Attribute");
            this.appendValueInput("Val")
                .setCheck("String")
                .appendField("Value");
            this.setOutput(true, null);
            this.setColour(230);
         this.setTooltip("");
         this.setHelpUrl("");
      },
    };

    javaScript['htmlParserAttrVal'] = function (block: any) {
      var value_html = javaScript.valueToCode(block, 'html', javaScript.ORDER_ATOMIC);
  
      var value_attr = javaScript.valueToCode(block, 'Attr', javaScript.ORDER_ATOMIC);

  var value_val = javaScript.valueToCode(block, 'Val', javaScript.ORDER_ATOMIC);
  var code = '(function(value){ \n';
  code += `var doc  = parseDOMFromStringToAttrVal(value,"text/html",${value_attr},${value_val});\n`;
  // code +='consoleLog("x",doc)\n';
  code += 'return doc;\n';
  code += '})(' + value_html + ')';
  return [code, javaScript.ORDER_NONE];
    };
  }

  fieldXML(): string {
    return `
    
    <block type="htmlParserAttrVal">
    </block>    
        `;
  }

  parseDOMFromStringToAttrVal (htmlString:any, type:any, attrName:any, value:any){
    
    var doc = new DOMParser().parseFromString(htmlString, type);
    var selector=`[${attrName}='${value}']`;
    // window.alert(selector);
    var sel =doc.querySelectorAll(selector)
    var nodes=Array.prototype.slice.call( sel);
    var ret=nodes.map(it=>( { innerText:it.innerText,innerHTML: it.innerHTML, outerHTML:it.outerHTML}));    
    return JSON.stringify(ret);
}


}
