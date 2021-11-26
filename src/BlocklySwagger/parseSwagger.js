// import parseSwaggerDocumentation from '@api-platform/api-doc-parser/lib/swagger/parseSwaggerDocumentation';
// import parseOpenApi3Documentation from '@api-platform/api-doc-parser/lib/openapi3/parseOpenApi3Documentation';
exports.parseSwagger =async function(swaggerUrl) {
    // const SwaggerParser = require("@apidevtools/swagger-parser");
    const BlocklyReturnSwagger= require('./blocklySwaggerData');
    var b=new BlocklyReturnSwagger(swaggerUrl);
    var result=[];
    
const SwaggerParser = require('@api-platform/api-doc-parser/lib/openapi3/parseOpenApi3Documentation');
    var q= await SwaggerParser.default(swaggerUrl);
    var r  = q.response;    
    if(r.components?.schemas){
        Object.keys(r.components.schemas).forEach(function(key) {
            // console.log(key);   
            var schema = r.components.schemas[key];            
            result.push(GenerateBlock(schema,key));
            
        });
        };
        return result;
    };

function GenerateBlock(schema,key){
    var blocklyTypeName=key;

    if(schema.properties){
        Object.keys(schema.properties).forEach(key => {
            var t = TranslateToBlocklyType(schema.properties[key].type);
            
        });
    }
 return function(blocks,javascript){
    // console.log(blocklyTypeName);
    blocks[blocklyTypeName] = {
        init: function() {
//this.setInputsInline(true);
            this.appendDummyInput()
                .appendField(key);
            //{tooltipAndpropsDef.propsDef}
            //this.setTooltip('{tooltipAndpropsDef.tooltip}');

            this.setOutput(true,blocklyTypeName);
                }  
        };;
 }
}

function TranslateToBlocklyType(t){
        
           if (t == "integer") 
                return "Number";
            if (t == "string")
                return "String";

            if (t == "bool")
                return "Boolean";

            if (t == "array")
                return "Array";

            return "not found type" +t;
           
        }

exports.parseSwagger1 = function(swaggerUrl) {
    // const SwaggerParser = require("@apidevtools/swagger-parser");
const SwaggerParser = require('@api-platform/api-doc-parser/lib/openapi3/parseOpenApi3Documentation');
    return SwaggerParser.default(swaggerUrl);
} 
