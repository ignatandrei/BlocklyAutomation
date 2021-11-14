class BlocklyReturnSwagger {
  constructor(url) {
      
    this.swaggerUrl = url;
  }
  GenerateBlocks=[];

  async ParseSwagger() {
    var self=this;
    const SwaggerParser = require("@api-platform/api-doc-parser/lib/openapi3/parseOpenApi3Documentation");
    var q = await SwaggerParser.default(this.swaggerUrl);
    var r = q.response;
    // console.log(r.components.schemas);
    if (r.components?.schemas) {
      Object.keys(r.components.schemas).forEach(function (key) {
        console.log(key);
        var schema = r.components.schemas[key];
        self.GenerateBlocks.push(self.GenerateBlock(schema, key));
      });
    }
    return self;
  }

  GenerateBlock(schema, key) {
      var self=this;
    var blocklyTypeName = key;

    if (schema.properties) {
      Object.keys(schema.properties).forEach((key) => {
        var t = self.TranslateToBlocklyType(schema.properties[key].type);
      });
    }
    return function (blocks, javascript) {
      console.log(blocklyTypeName);
      blocks[blocklyTypeName] = {
        init: function () {
          //this.setInputsInline(true);
          this.appendDummyInput().appendField(key);
          //{tooltipAndpropsDef.propsDef}
          //this.setTooltip('{tooltipAndpropsDef.tooltip}');

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
