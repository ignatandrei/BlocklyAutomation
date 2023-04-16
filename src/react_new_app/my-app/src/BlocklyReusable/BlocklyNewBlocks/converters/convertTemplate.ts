import { IBlocksSimple } from '../../blocksInterface';
export default class converterTemplate implements IBlocksSimple {
    public static nameBlock: string = "converterTemplate";
    category: string = 'Converters;Object Funcs';

    interpolate = function(template :string, objectToParse:string) {
                
        var obj=JSON.parse(objectToParse);
        const names = Object.keys(obj);
        const vals = Object.values(obj);
        // eslint-disable-next-line no-new-func
        return new Function(...names, `return \`${template}\`;`)(...vals);
      }
    addWrapper(interpreter: any, globalObject: any) {
        var self=this;
        var interpolateTemplate= self.interpolate;
    
        interpreter.setProperty(globalObject, 'interpolateTemplate',
                      interpreter.createNativeFunction(interpolateTemplate));
    
    }
    fieldXML(): string {
        return `<block type="${converterTemplate.nameBlock}"></block>`;
       
    }
    
    definitionBlocksSimple(blocks: any, javaScript: any) {
        blocks[converterTemplate.nameBlock] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("Transform");
                this.appendValueInput("object")
                    .setCheck(null)
                    .appendField("object (o)");
                this.appendValueInput("text")
                    .setCheck("String")
                    .appendField("Template");
                this.setOutput(true, "String");
                this.setColour(30);
                this.setTooltip("Templating");
                this.setHelpUrl("");
            }
        }
        javaScript[converterTemplate.nameBlock] = function(block:any) {
            var value_object = javaScript.valueToCode(block, 'object', javaScript.ORDER_ATOMIC);
            var value_text = javaScript.valueToCode(block, 'text', javaScript.ORDER_ATOMIC);
            var code = `interpolateTemplate(${value_text},JSON.stringify(${value_object}))`;
            return [code, javaScript.ORDER_NONE];
          };

    }
}
