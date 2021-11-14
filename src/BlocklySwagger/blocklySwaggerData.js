class BlocklyReturnSwagger {
  constructor(url) {
      
    this.swaggerUrl = url;
  }
  GenerateBlocks=[];
  fieldXML=[];

  nameCategSwagger(){
    
    return `catSwagger${this.findHostName()}`;
  }
  categSwagger(){
    var h=this.findHostName();
    h=h.replaceAll('.','');
    var categ=this.nameCategSwagger();
    return '<category name="'+ h+'" custom="'+ categ +'"></category>';
    
  }
  findHostName(){
    var href=this.swaggerUrl;
    var hostname = '(localSite)';
    if (href.startsWith('http://') || href.startsWith('https://')) {
      var url=  (new URL(href));
      var port=url.port??80;
      hostname = url.hostname+port;
    }
    return hostname.replaceAll('.','');
  }
  async ParseSwagger() {
    var self=this;
    const SwaggerParser = require("@api-platform/api-doc-parser/lib/openapi3/parseOpenApi3Documentation");
    var q = await SwaggerParser.default(this.swaggerUrl);
    var r = q.response;
    // console.log(r.components.schemas);
    if (r.components?.schemas) {
      Object.keys(r.components.schemas).forEach(function (key) {
        // console.log(key);
        self.fieldXML.push(`<block type="${key}"></block>`);
        var schema = r.components.schemas[key];
        self.GenerateBlocks.push(self.GenerateBlock(schema, key));
        
      });
    }
    return self;
  }

  GenerateBlock(schema, key) {
      var self=this;
    var blocklyTypeName = key;
    var props='';
    
    return function (blocks, javascript) {
    //   console.log(blocklyTypeName);
      blocks[blocklyTypeName] = {
        init: function () {
          //this.setInputsInline(true);
          this.appendDummyInput().appendField(key);
          //{tooltipAndpropsDef.propsDef}
          if (schema.properties) {
            Object.keys(schema.properties).forEach((key) => {
              var t = self.TranslateToBlocklyType(schema.properties[key].type);
              this.appendValueInput(`val_{key}`)
            //   .setCheck('{property.PropertyType.TranslateToNewTypeName()}')
              .appendField(`${key}`)
              ;
            });
          }      
          this.setTooltip(`${this.swaggerUrl}`);

          this.setOutput(true, blocklyTypeName);
        },
      };
    };
  }

  TranslateToBlocklyType(t) {
    if (t == "integer") return "Number";
    if (t == "string") return "String";

    if (t == "bool") return "Boolean";

    if (t == "array") return "Array";

    return "not found type" + t;
  }
}
module.exports = BlocklyReturnSwagger;

