class BlocklyReturnSwagger {
  constructor(url) {
      
    this.swaggerUrl = url;
  }
  GenerateBlocks=[];
  GenerateFunctions=[];
  fieldXMLObjects=[];
  fieldXMLFunctions=[];

  nameCategSwagger(){
    
    return `catSwagger${this.findHostNameRegular()}`;
  }
  categSwagger(){
    var h=this.findHostNameRegular();
    h=h.replaceAll('.','');
    var max= 5;
    if(h.length>max)
    var first= h.substring(0,max);
    var categ=this.nameCategSwagger();
    return '<category name="obj_'+ first +'" custom="objects_'+ categ +'"></category>' 
    + '<category name="api_'+ first +'" custom="api_'+ categ +'"></category>' 
    ;
    
  }
  findRootSite(){
    var href=this.swaggerUrl;
    var hostname = '';
    if (href.startsWith('http://') || href.startsWith('https://')) {
      var url=  (new URL(href));
      
      hostname = url.protocol+"//"+url.hostname;
      if(url.port.length>0)
      hostname += url.port;
    }
    return hostname;
  }
  
  findHostNameRegular(){
    var href=this.swaggerUrl;
    var hostname = '(localSite)';
    if (href.startsWith('http://') || href.startsWith('https://')) {
      var url=  (new URL(href));
      var port=url.port??80;
      hostname = url.hostname+port;
    }
    return hostname.replaceAll('.','');
  }
  openApiDocument = null;
  async ParseSwagger() {
    var self=this;
    const SwaggerParser = require("@api-platform/api-doc-parser/lib/openapi3/parseOpenApi3Documentation");
    var q = await SwaggerParser.default(this.swaggerUrl);
    var r = q.response;
    console.log(r.paths);
    self.fieldXMLObjects.push(`<label text="${self.swaggerUrl}"></label>`);
    if (r.components?.schemas) {
      Object.keys(r.components.schemas).forEach(function (key) {
        // console.log(key);
        
        self.fieldXMLObjects.push(`<block type="${key}"></block>`);
        
        var schema = r.components.schemas[key];
        self.GenerateBlocks.push(self.GenerateBlock(schema, key));
        
      });
    }
    if(r.paths){
      Object.keys(r.paths).forEach(function (key) {
        var path = r.paths[key]; 
        Object.keys(path).forEach(function(oo) {  
          var ops=path[oo];
          self.GenerateFunctions.push(self.GenerateFunction(path, key, ops,oo));
        });
      });
    }
    self.openApiDocument=r;
    return self;
  }
  // findPath(key){
  //   return this.openApiDocument.paths[key];
  // }
  findProperties(schema){
    var objPropString=[];
    if (schema.properties) {
      Object.keys(schema.properties).forEach((key) => {
        //var t = self.TranslateToBlocklyType(schema.properties[key].type);
        // console.log(key, schema.properties[key]);
        objPropString.push({key:key, value:schema.properties[key]});
      });
    }
    return objPropString;
  }
  GenerateNameFunction(path, key, operation, operationKey){
    var ret= key.replaceAll("/","_").replaceAll("{","__");
    return operationKey+"_"+ret;
    
  }
  
  GenerateFunction(path, key, operation, operationKey) {
  
    var self=this;
    var blocklyTypeName = self.GenerateNameFunction(path, key, operation, operationKey) ;
    var props='';
    var op= operation;
    //console.log(key);
    //console.log(operationKey);
    // console.log(`assets/httpImages/${operationKey}.png`);        
    // console.log(operation);
    self.fieldXMLFunctions.push(`<block type="${blocklyTypeName}"></block>`);

    return function (blocks, javaScript, BlocklyFieldImage) {
      
      blocks[blocklyTypeName] = {
        init: function () {
          //this.setInputsInline(true);
          var str=key;
          if(str.length>15)
            str=str.substring(0,25)+'...';
          this.appendDummyInput()
          .appendField(BlocklyFieldImage(operationKey))
          .appendField(`${operationKey} ${str}`)       
          ;    
          var root=self.findRootSite();
          if(op.parameters)
              op.parameters.forEach(it=>{

            //console.log(it);
            this.appendValueInput(`val_${it.name}`)
                .appendField(`${it.name}`);

          });


          this.setTooltip(`${operationKey} ${root}${key}`);
          this.setOutput(true,'');
        },
      };
      javaScript[blocklyTypeName] = function(block) {
        //https://netcoreblockly.herokuapp.com/blocklyAPIFunctions?v=version
        const ORDER_NONE=99;
        const ORDER_ATOMIC=0;
        var code ='function(';
        var obj={};
        var objBody={};
        var path=self.openApiDocument.paths[key];
        var operation = path[operationKey];
        // console.log('a' , key);
        // console.log('a' , operationKey);
        // console.log('b',path);
        // console.log('b',operation);
        // console.log('c',operation.parameters);        
        if('parameters' in operation){
             var parameterFunctionDefinition = operation.parameters.map(it=>it.name +',');
             code +=parameterFunctionDefinition ;
             code +="notUsed";
              operation.parameters.forEach(it=>{

            console.log(it);
            obj[`val_{it.name}`] = javaScript.valueToCode(block, `val_{it.name}`, /*javaScript.*/ORDER_ATOMIC);
            

          });
        }
          code +="){\n";
          code +='var strUrl ="'+ self.findRootSite() + key + '";\n';
          code +='return strUrl;\n';
          code += '}()';
        //var code =`{GenerateGet(actionInfo)}({argsXHR})`;
        //console.log(code);
        return [code, /*javaScript.*/ORDER_NONE];
      }
    };
  }
  GenerateBlock(schema, key) {
      var self=this;
    var blocklyTypeName = key;
    var props='';
    var objPropString=self.findProperties(schema);
    
    return function (blocks, javaScript) {
    //   console.log(blocklyTypeName);
    
      blocks[blocklyTypeName] = {
        init: function () {
          //this.setInputsInline(true);
          this.appendDummyInput().appendField(key);
          //{tooltipAndpropsDef.propsDef}
          //console.log('init', objPropString);
            objPropString.forEach((item) => {
              //var t = self.TranslateToBlocklyType(key.type);
              
              this.appendValueInput(`val_${item.key}`)
            //   .setCheck('{property.PropertyType.TranslateToNewTypeName()}')
              .appendField(`${item.key}`)
              ;
            });                
          //this.setTooltip(`${this.swaggerUrl}`);
          this.setOutput(true, blocklyTypeName);
        },
      };

      javaScript[blocklyTypeName] = function(block) {{
        //console.log(blocklyTypeName, self.openApiDocument);
        // var actualSchema = self.openApiDocument.components.schemas[blocklyTypeName];
        // console.log(blocklyTypeName, actualSchema);
        var objPropStringFound=self.findProperties(schema);
        //console.log(blocklyTypeName, objPropStringFound);
        const ORDER_NONE=99;
        const ORDER_ATOMIC=0;
        var code ='';
        var objPropString=[];
        objPropStringFound.forEach((it) => {
          let val = javaScript.valueToCode(block, `val_${it.key}`, /*javaScript.*/ORDER_ATOMIC);
          //console.log('found ' + val, val);
          if(val ==='')
          {
            val='null';
          }
          if(val == null){
            val = 'null';
          }
          objPropString.push(`"${it.key}\":${val}`);
        });
        var code ='{ '+ objPropString.join(',') +' }';
        //console.log(code);
        return [code, /*javaScript.*/ORDER_NONE];
        }};

    };
  }

  TranslateToBlocklyType(t) {

    if (t == "integer") return "Number";
    if (t == "string") return "String";

    if (t == "bool") return "Boolean";

    if (t == "array") return "Array";
    console.error("not found TranslateToBlocklyType item" + t);
    return "not found type" + t;
  }
}
module.exports = BlocklyReturnSwagger;

