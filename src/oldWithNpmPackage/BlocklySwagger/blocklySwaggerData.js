const Blockly=require('blockly');
// const vex = require('vex-js');
class TagsFunctions{
  functionName= '';
  tags=[];
}
class BlocklyReturnSwagger {
  constructor(url) {
    this.swaggerUrl = url;
  }
  GenerateBlocks = [];
  GenerateFunctions = [];
  fieldXMLObjects = [];
  fieldXMLFunctions = [];
  hasError = true;
  paths= [];
  name='';
  operations=[];

  tagsSwagger=[];

  nameCategSwagger() {
    return `catSwagger${this.findHostNameRegular()}_${this.name}`;
  }


  metaBlocks(){
    var self=this;
    return function (blocks, javaScript) {
      var nameBlock =`meta_swagger_controllers_${self.name}`;
      blocks[nameBlock] = {
        init: function() {
          this.appendDummyInput()
              .appendField("categories_"+self.name);
          this.setOutput(true, null);
          this.setColour(30);
          this.setTooltip("");
          this.setHelpUrl(self.swaggerUrl);
      }
    };
      javaScript[nameBlock] = function(block) {

        var categ=self.findCategSwaggerFromPaths();
        var obj= categ.map(it=>{
          return {
            name:it
            //ops:self.operations.filter(op=>op.controller==it).map(op=>op.id)
          }
        });
      obj ={'name':self.name,'categories':obj};
      var code = JSON.stringify(obj);
      return [code, javaScript.ORDER_NONE];
    } ;
    
    var nameBlock =`meta_swagger_controllers_actions_${self.name}`;
      blocks[nameBlock] = {
        init: function() {
          this.appendDummyInput()
              .appendField("categories_actions"+self.name);
          this.setOutput(true, null);
          this.setColour(30);
          this.setTooltip("");
          this.setHelpUrl(self.swaggerUrl);
      }
    };
      javaScript[nameBlock] = function(block) {

        var categ=self.findCategSwaggerFromPaths();
        var obj= categ.map(it=>{
          return {
            name:it,
            ops:self.findfieldXMLFunctions(it).map(op=>op.id).filter(op=>op.length>0)
          }
        });
      obj ={'name':self.name,'categories':obj};
      var code = JSON.stringify(obj);
      return [code, javaScript.ORDER_NONE];
    } ;
   };

  }
  cacheCategSwaggerFromPaths = [];
  findfieldXMLFunctions(controllerName){
    var allPaths=this.openApiDocument.paths;
    var keys= Object.keys(allPaths);
    
    var urls = this.operations.filter((it) => it.controller == controllerName);
    //console.log(urls);
    var xmlList = this.fieldXMLFunctions
      .filter((it) => {
        if (it.id == '') return true;
        var val = it.id + '/';
        var existInfields = false;
        urls.forEach((url) => {
          if (val.startsWith(url.id)) existInfields = true;
        });
        if(existInfields) return true;
        
        urls.forEach((url) => {
          //url has latest / , but can have also {  for parameters
            var str=url.id.substring(0,url.id.lastIndexOf('/'))+'{';
          if (val.startsWith(str)) existInfields = true;
        });

        return existInfields;
      });
      // console.log('x',xmlList);
      return xmlList;
  }
  findCategsFromTags(){
    
    var allPaths=this.openApiDocument.paths;
    var keys= Object.keys(allPaths);
    var self=this;
    keys.forEach(function (key) {
      var path= allPaths[key];
      // console.log('x',path);

      if(path ){
        var objKeys= Object.keys(path);
        objKeys.forEach(function (objKey) {
          //console.log('z',path[objKey]);

          var tags=path[objKey].tags;
        if(tags && tags.length>0)
        tags.forEach(function (tag) {
          if(!self.cacheCategSwaggerFromPaths.includes(tag)){
            self.cacheCategSwaggerFromPaths.push(tag);
            
          }
          self.operations.push({ controller:tag, id:key});
            });
        });
        
      }
    });
  }
  findCategSwaggerFromPaths(){
    
    this.findCategsFromTags();
    if(this.cacheCategSwaggerFromPaths.length>0) return this.cacheCategSwaggerFromPaths;
    

    var normalized= this.paths
      .filter(it=> it && it.id && it.id.length >0 )
      .map(it=>{
          var len=it.id.length;
          var i=it.id.indexOf("{");
          while(i>0) {
            // /api/v{version}
            var closing=it.id.indexOf("}",i);
            if(len-closing<2) {
              it.id=it.id.substring(0,i); 
              break;
            }
            i=it.id.indexOf("{",closing);
          }
            
          
          return it;
      })
       .map(it=>{
         if(it.id.lastIndexOf("/") != it.id.length-1)
             it.id +="/";

         return it;
       });
      
    ;
    this.operations=normalized
          .filter(it=>it.nrOps>1)
          //.map(it=>it.id)
          .map(it=> {
            
            var ret= {arr :  it.id.split('/').filter(a=>a.length>0),id : it.id};
            
            return ret;
          })          
          .map(it=>{return { controller:it.arr[it.arr.length-1], id:it.id};} ) ;

         
    var others = normalized
          .filter(it=>it.nrOps==1)
          .map(it=>
            {
            return { arr : it.id.split('/').filter(a=>a.length>0), id : it.id}
            }
            )
          .map(it=>{
             if(it.arr.length ==1)
                return { controller : it.arr[0], id:it.id};
            return { controller:it.arr[it.arr.length-2], id:it.id};
          })
          ;
          this.operations.push(...others);
          
          this.cacheCategSwaggerFromPaths= [...new Set(this.operations.map(it=>it.controller))];
         
    return  this.cacheCategSwaggerFromPaths;
}
  categSwagger() {
    var h = this.findHostNameRegular();
    h = h.replaceAll(".", "");
    var max = 5;
    if (h.length > max) var first = h.substring(0, max);
    var categ = this.nameCategSwagger();
    return (
      '<category name="Objects' +
      '" custom="objects_' +
      categ +
      '"></category>' +
      '<category name="AllApi' +
      '" custom="AllApi_' +
      categ +
      '"></category>'
    );
    
  }
  findRootSite() {
    var href = "";
    // console.log('in find root ', this.openApiDocument)
    if(this.openApiDocument?.host?.length>0){
      var hostData=this.openApiDocument.host;
      if(Array.isArray(hostData))
        href=this.openApiDocument.schemes[0]+"://"+hostData[0];
      else
        href=this.openApiDocument.schemes[0]+"://"+hostData;
      // console.log('yyy',href);
    }
    else
    {
      href = this.swaggerUrl;
    }
    
    var hostname = "";
    if (href.startsWith("http://") || href.startsWith("https://")) {
      var url = new URL(href);

      hostname = url.protocol + "//" + url.hostname;
      if (url.port.length > 0) hostname +=":"+ url.port;
    }
    return hostname;
  }

  findHostNameRegular() {
    var href="";
    if(this.openApiDocument?.host?.length>0){
      
      var hostData=this.openApiDocument.host;
      if(Array.isArray(hostData))
        href=this.openApiDocument.schemes[0]+"://"+hostData[0];
      else
        href=this.openApiDocument.schemes[0]+"://"+hostData;
      
      // href=this.openApiDocument.schemes[0]+"://"+this.openApiDocument.host[0];
      // console.log('xxx',href);
    }
    else
    {
      href = this.swaggerUrl;
    }
    var hostname = "(localSite)";
    if (href.startsWith("http://") || href.startsWith("https://")) {
      var url = new URL(href);
      var port = url.port ?? 80;
      hostname = url.hostname + port;
    }
    return hostname.replaceAll(".", "");
  }
  openApiDocument = null;
  basePath = "";
  showWindowToLoad(defaultPrompt, callback) { 
    var self = this;
    try{
      vex.registerPlugin(require('vex-dialog'));

    }
    catch(e){
      //do nothing
    }
    //vex.defaultOptions.className = 'vex-theme-os';
    //vex.dialog.prompt( { message:"Swagger url?",placeholder:  defaultPrompt,callback: callback } );
    var res= window.prompt("Swagger url",defaultPrompt);
    callback(res);

  }


  async ParseSwagger() {
    var self = this;
    self.fieldXMLObjects.push(`<label text="${self.swaggerUrl}"></label>`);
    self.fieldXMLFunctions.push({id:'',gui:`<label text="${self.swaggerUrl}"></label>`});
    var r =null;
    try{
    // const SwaggerParser = require("@api-platform/api-doc-parser/lib/openapi3/parseOpenApi3Documentation");
    // var q = await SwaggerParser.default(this.swaggerUrl);
    //var r = q.response;
    const SwaggerParser  = require('swagger-client');
    var q = await SwaggerParser.default(this.swaggerUrl);
    // if(this.swaggerUrl.indexOf('blockly')>0){
    //   console.log("b__",q.spec.paths);
    //     console.log("b__",q.spec.paths["MathDivideRest"]);
    //     console.log("b__",q.apis["MathDivideRest"]);
    // }
      var r=q.spec;
    }
    catch(e){
      console.error(`parseSwagger ${this.swaggerUrl}`,e);      
      self.fieldXMLObjects.push(`<label text='Error parsing!'></label>`); 
      return this;
    }
    
    this.hasError = false;
    
    this.basePath= r.basePath ||'';
    // console.log("basepath"+ this.swaggerUrl,this.basePath);
    //var r = q.response;
    // console.log(r.paths);
    var data=r.components?.schemas;
    if(data == null || data == undefined){
      //console.log(this.swaggerUrl,data);
      data=r.definitions;
    }
    
    if (data) {
      var keys = Object.keys(data).sort();
      keys.forEach(function (key) {
        // console.log(key);

        var schema = data[key];
        var objPropString = self.findProperties(schema);
        var xmlBlockShow=`<block type="${key}">`;
        objPropString.forEach(function (prop) {
          //console.log('y_'+prop.key,prop);
          if(prop.value && prop.value.type){
            var shadow=self.GenerateShadowField(prop.value.type, prop.key);
            
            if(shadow.length>0){
              //xmlBlockShow += `<field name="${prop.key}">${shadow}</field>`;
              var shadowBlock=`<value name="val_${prop.key}">${shadow}</value>`;
              // if(prop.key=='authority'){
              //   console.log('z'+prop.key,shadowBlock);
              // }
              xmlBlockShow+=shadowBlock;
            }
          }
        });
        xmlBlockShow+='</block>';
        self.fieldXMLObjects.push(xmlBlockShow);

        
        self.GenerateBlocks.push(self.GenerateBlock(schema, key));
      });
    }
    else{
      console.log("_A",r);
    }

    if (r.paths) {
      Object.keys(r.paths).forEach(function (key) {
        var path = r.paths[key];
        self.paths.push({id: key, nrOps: Object.keys(path).length});
        Object.keys(path).forEach(function (oo) {
          var ops = path[oo];
          // if(ops && ops["tags"]){
          //     console.log('z_',ops["tags"]);0
          // }
          self.GenerateFunctions.push(
            self.GenerateFunction(path, key, ops, oo)
          );
        });
      });
    }
    self.openApiDocument = r;
    // console.log(self.openApiDocument);
    return self;
  }
  // findPath(key){
  //   return this.openApiDocument.paths[key];
  // }
  findProperties(schema) {
    var objPropString = [];
    if (schema.properties) {
      Object.keys(schema.properties).forEach((key) => {
        //var t = self.TranslateToBlocklyType(schema.properties[key].type);
        // console.log(key, schema.properties[key]);
        objPropString.push({ key: key, value: schema.properties[key] });
      });
    }
    return objPropString;
  }
  GenerateNameFunction(path, key, operation, operationKey) {
    var ret = key.replaceAll("/", "_").replaceAll("{", "__").replaceAll("}","");
    return operationKey + "_" + ret;
  }

  GenerateShadowField(blockShadowType,key, defaultValue) {
         
            switch (blockShadowType)
            {
                case "integer":
                    var val=defaultValue?defaultValue:0;            
                    return `<block type='math_number'><field name='NUM'>${val}</field></block>`;

                case "string":
                    var val = defaultValue?defaultValue:`please enter ${key}`;
                    return `<block type='text'><field name='TEXT'>${val}</field></block>`;

                case "boolean":
                    var val= defaultValue?defaultValue:"FALSE";
                    return `<block type='logic_boolean'><field name='BOOL'>${val}</field></block>`;
                case "array":
                    return '<block type="lists_create_with"> <mutation items="0"></mutation></block>';
                
                default:
                    
                    return "";
            }
        }
  GenerateFunction(path, key, operation, operationKey) {
   
    var self = this;

    var blocklyTypeName = self.GenerateNameFunction(
      path,
      key,
      operation,
      operationKey
    );
    var props = "";
    var op = operation;
    //console.log(key);
    //console.log(operationKey);
    // console.log(`assets/httpImages/${operationKey}.png`);
    // console.log(operation);

    var xmlBlockShow=`<block type="text_print"> <value name="TEXT"><block type="${blocklyTypeName}">`;
    if (op.parameters){
      op.parameters.forEach((it) => {        
        if(it.type){
          var shadow=self.GenerateShadowField(it.type, it.name);
          if(shadow.length>0){
            xmlBlockShow += `<value name="val_${it.name}">${shadow}</value>`;
          }

        }
        else{
          if(it.schema && it.schema.type){
            var shadow=self.GenerateShadowField(it.schema.type, it.name);
            if(shadow.length>0){
              xmlBlockShow += `<value name="val_${it.name}">${shadow}</value>`;
            }
          };
      }
      });
    };
   // add override host
   var host="";
   var port="";
   try{
     var root=self.findRootSite();
     if((root||'').length>0){
      var url = new URL(root);
      host=url.hostname;
      port= url.port;
      // console.log('find root', url, host , port);
     }
   }
   catch(e){
     //do nothing
     console.log('find root error',e);
   }
   host=host?host:" ";
   
   var shadow=self.GenerateShadowField('string', 'override_host',host);
  //  console.log('X_override_host',shadow);
    xmlBlockShow += `<value name="override_Host">${shadow}</value>`;          
   
    port=port?port:"0";
    var shadow=self.GenerateShadowField('integer', 'override_port',port);
    //  console.log('X_override_host',shadow);
      xmlBlockShow+= `<value name="override_Port">${shadow}</value>`;          
   
      xmlBlockShow+=`</block></value>`;
      
      xmlBlockShow+=`</block>`;
    self.fieldXMLFunctions.push({id:key,gui:xmlBlockShow});

    return function (blocks, javaScript) {
      blocks[blocklyTypeName] = {
        init: function () {
          //this.setInputsInline(true);
          var displayOpKey=operationKey;
          switch(operationKey.toString().toLowerCase()){
            case "get":
              displayOpKey="";
              this.setColour(210);
              break;
            case "post":
              displayOpKey="";
              this.setColour(165);
              break;
            case "put":
              displayOpKey="";
              this.setColour(40);
              break;
            case "delete":
              displayOpKey="";
              this.setColour(10);
              break;
            default:
              console.log(`not found ${operationKey}`);
              this.setColour(10);
          }
          var str = key;

          var categs = self.findCategSwaggerFromPaths();
          for(var i=0;i<categs.length;i++){
            var find='/'+categs[i]+'/';
            var whereFind=key.indexOf(find);
            if(whereFind>-1){
              var remains=key.substring(whereFind+ find.length);
              if(remains.length< str.length){
                str=remains;
              }
            }

          }

          
          if (str.length > 25) str = str.substring(0, 25) + "...";
          this.appendDummyInput()
            .appendField(new Blockly.FieldImage(`assets/httpImages/${operationKey}.png`,90,20,operationKey))
            .appendField(`${displayOpKey} ${str}`);
          var root = self.findRootSite();          
          if (op.parameters)
            op.parameters.forEach((it) => {
              var name= it.name;
              if(it.required){
                name +="*"; 
              }
              if(it.type){
                name += ":"+it.type;
              }
              else{

                if(it.schema ){
                  
                  if(it.schema.enum && ("$$ref" in it.schema)){
                    var s=it.schema["$$ref"].split("/");
                    name += "=>"+s[s.length-1];
                  }
                  else if(it.schema.type){
                    if(it.schema.type=='object'){
                      var val = it.schema["$$ref"]||'';
                      if(val.length>0){
                        val = val.substring(val.lastIndexOf("/")+1);
                        name+=":"+ val;
                      }

                    }
                    else{
                      name += ":"+it.schema.type;
                    }
                  }
                }
              }
              this.appendValueInput(`val_${it.name}`).appendField(name);
            });
          if (op.requestBody) {
            var type="";
            if(op.requestBody.content)
              {
                var jsonResp= op.requestBody.content['application/json'];
                if(jsonResp && jsonResp.schema){
                  var ref=jsonResp.schema["$$ref"];
                  if(ref){
                    type = "=>"+ref.substring(ref.lastIndexOf("/")+1);
                     //var schema=self.openApiDocument.components.schemas[ref.substring(ref.lastIndexOf("/")+1)];
                    // if(schema){
                    //   var properties=self.findProperties(schema);
                    //   properties.forEach((it)=>{
                    //     this.appendValueInput(`val_${it.key}`).appendField(it.key);
                    //   });
                    // }
                  }

                }
              }
            this
              .appendValueInput('val_values')
              .appendField('values' + type)
              .setCheck();
              
              
          }
          this.appendValueInput('override_Host') 
              .appendField("override Host");
          
          this.appendValueInput('override_Port') 
              .appendField("override Port");
          // this.appendValueInput('override_Port')
          //     .appendField("override Port");
          this.setTooltip(`${operationKey} ${root}${key}`);
          this.setOutput(true, "");
        },
      };
      javaScript[blocklyTypeName] = function (block) {
        //https://netcoreblockly.herokuapp.com/blocklyAPIFunctions?v=version
        //https://netcoreblockly.herokuapp.com/blockly.html?dom=20211115121043
        // console.log(blocklyTypeName);
        const ORDER_NONE = 99;
        const ORDER_ATOMIC = 0;
        var path = self.openApiDocument.paths[key];
        var operation = path[operationKey];
        // console.log('a' , key);
        // console.log('a' , operationKey);
        // console.log('b',path);
        //  console.log('b',operation);
        // console.log('c',operation.parameters);
        var parameters = [];
        if ("parameters" in operation) {
          parameters = operation.parameters;
        }
        var hasBody=false;
        var hasBodyParameter=parameters.filter(it=>it.in=='body').length>0;
        if(hasBodyParameter || ('requestBody' in operation)){
          hasBody=true;
        }
      //   if (blocklyTypeName.indexOf("RestWithArgs") > 0) {
          
      //     console.log(parameters);
      //  }
        var obj = {};
        var objBody = {};
        if(hasBody){
          obj['val_values'] = javaScript.valueToCode(block, 'val_values', /*javaScript.*/ORDER_ATOMIC);
          objBody['val_values'] =obj['val_values'];
        }
        parameters.forEach((it) => {
          //code +=`
          obj[`val_${it.name}`] = javaScript.valueToCode(
            block,
            `val_${it.name}`,
            /*javascript.*/ ORDER_ATOMIC
          );
          //`;
        });

        var parameterFunctionDefinition = parameters.map((it) => it.name );
        // console.log(parameterFunctionDefinition);
        if(hasBody & !hasBodyParameter){          
            parameterFunctionDefinition.push("values");
        }
        parameterFunctionDefinition.push("extraData");
        var callingFunctionDefinition = parameters.map(
          (it) =>"${" + `obj['val_${it.name}']` +"}" + ","
        );
        
        
        callingFunctionDefinition += "1"; //maybe later we use for logging
        var code = "function(";
        code += parameterFunctionDefinition.join(",");
        code += "){\n";
        code +=`var rootSite="`+self.findRootSite()+`";\n`;
        // code +="window.alert(JSON.stringify(extraData));\n";
        code +='if(extraData){\n';
        code +='if(extraData.url && extraData.url.host && extraData.url.host.length>0 ){\n';
        code +='rootSite =  changeHost(rootSite, extraData.url.host);\n';//it is  wrapper  for new  url
        code +="};\n";
        // code +="\n";
        // code +="window.alert('a'+extraData.url.port.toString().length);";
        // code +="\n";
        code +='if(extraData.url && extraData.url.port && extraData.url.port.toString().length>0 ){\n';
        code +='rootSite  =changePort(rootSite , extraData.url.port);\n';
        code +='};\n';
        
        code +='};\n';
        //  console.log("basepath",self.basePath);
        code += 'var strUrl =rootSite +"'+ self.basePath  + key + '";\n';
        var paramsQuery = parameters.filter((it) => it.in == "query");
        if(paramsQuery.length>0){
          code += 'strUrl+="?";\n;';
          var data= paramsQuery.map(it=>`${it.name}=`+"{" + it.name+"}") .join("&");
          // console.log(data);
          // console.log('strUrl += "'+data+'";'); 
          code += 'strUrl += "'+data+'";\n;';
        }

        var replaceUrl = parameters
          .filter((it) => it.in == "path" || it.in == "query")
          //.map((it) => `strUrl = strUrl.replace("{${it.name}}",${it.name});`)
          .map((it) => `
          //this gives error cannot read property 'call' of undefined in acorn
          //strUrl = strUrl.replace("{${it.name}}",${it.name});
          {
            var replaceFInd = "{${it.name}}";
            var index= strUrl.indexOf(replaceFInd);
            if(index>=0){
              var strUrlReplace = strUrl.substring(0,index)+ ${it.name} + strUrl.substring(index+replaceFInd.length);
              strUrl = strUrlReplace;
            }

          };`)
          ;
        code += replaceUrl.join("\n");

        code +=`\n{var res= ${operationKey}Xhr(strUrl`;
        if(hasBody) {
          var values="values";
          if(hasBodyParameter){
            values= parameters.filter(it=>it.in=='body')[0].name;
          }
          code += `,JSON.stringify(${values})`;
        }
        code +=`);\n`;
        code +="var resJS=JSON.parse(res);\n";
        code +="if(resJS.statusOK) return resJS.text;\n"
        code +="errHandler(res);\n}\n";
        //code +=";}\n";

        // code += "\nreturn strUrl;\n";

        code += `}`;
        code +="(";
        parameters.forEach((it) => {
          code += obj[`val_${it.name}`]+",";
        });
        if(hasBody &!hasBodyParameter){
          code += objBody['val_values']+",";
        }
        // if(hasBody)
        //   code +=`${JSON.stringify(objBody)}`;
        // else
        var urlReplace="url:{notImportant:1";
        var override_Http = javaScript.valueToCode(block, 'override_Host', /*javascript.*/ ORDER_ATOMIC);
        override_Http = override_Http||'';
        //window.alert('x'+override_Http);
        if(override_Http.length>0)
          urlReplace+=`,host:${override_Http}`;
        
        var override_Port = javaScript.valueToCode(block, 'override_Port', /*javascript.*/ ORDER_ATOMIC);
        override_Port= override_Port||'';
        //window.alert('x'+override_Http);
        if(override_Port.length>0)
          urlReplace+=`,port:${override_Port}`;
  

        // var override_PortHttp = javaScript.valueToCode(block, 'override_Port ', /*javascript.*/ ORDER_ATOMIC);
        // window.alert('x'+override_PortHttp);
        // override_PortHttp= override_PortHttp ||'';
        // if(override_PortHttp.length>0)
        //   urlReplace+=`,port:${override_PortHttp}`;//extra parameter for later
        
          urlReplace+="}";

          code +=`{${urlReplace}}\n`;

        code +=")";

        //var code =`{GenerateGet(actionInfo)}({argsXHR})`;
        //console.log(code);
        // if (blocklyTypeName.indexOf("MathDivideRest") > 0) {
        //   console.log(code);
        //   // debugger;
        // }

        return [code, /*javaScript.*/ ORDER_NONE];
      };
    };
  }
  GenerateBlock(schema, key) {
    var self = this;
    var blocklyTypeName = key;
    var props = "";
    var objPropString = self.findProperties(schema);

    return function (blocks, javaScript) {
      //   console.log(blocklyTypeName);
      
      blocks[blocklyTypeName] = {
        init: function () {
          //this.setInputsInline(true);
         
          var isEnum=false;
          var arrValue = [];
          if(schema.enum){
            isEnum=true;
            var keys= Object.keys(schema.enum);
            if(schema['x-enumNames']){
              arrValue = keys.map((it)=>{
                return [schema['x-enumNames'][it],it];
              });
            }
            else
              arrValue=keys.map((it)=>{
                return [schema.enum[it],it];
              });
           
          }
          
          var b= this.appendDummyInput()
              .appendField(key);
          
          if(isEnum){
            arrValue= arrValue.map((it)=>[it[0].toString(),it[1].toString()]);                     
            b.appendField( new Blockly.FieldDropdown(arrValue),`val_${key}`);
            
          }
          else{
          //{tooltipAndpropsDef.propsDef}
          //console.log('init', objPropString);
          objPropString.forEach((item) => {
            //var t = self.TranslateToBlocklyType(key.type);
              var name=item.key;
              if(item.value.nullable && item.value.nullable==false){
                name +="*";
              } 
              if(item.value?.type){
                var val=item.value.type||'';
                if(val == "object"){
                  // console.log(item);
                  var val1= item.value["$$ref"]||'';
                  if(val1.length>0){
                    val = val1.substring(val1.lastIndexOf("/")+1);
                  }
                }

                name+=":"+val;
                
              }
              if(item.value['$ref']){
                var nameRef=item.value['$ref'].replaceAll("#/components/schemas/","");
                name+="->"+nameRef;
              }
            this.appendValueInput(`val_${item.key}`)
              //   .setCheck('{property.PropertyType.TranslateToNewTypeName()}')
              .appendField(`${name}`);
          });
        }
          //this.setTooltip(`${this.swaggerUrl}`);
          this.setOutput(true, blocklyTypeName);
        },
      };

      javaScript[blocklyTypeName] = function (block) {
        {
          //console.log(blocklyTypeName, self.openApiDocument);
          // var actualSchema = self.openApiDocument.components.schemas[blocklyTypeName];
          // console.log(blocklyTypeName, actualSchema);
          
          var isEnum=false;
          
          if(schema.enum){
            isEnum=true;
          }
          
          var objPropStringFound = self.findProperties(schema);
          //console.log(blocklyTypeName, objPropStringFound);
          const ORDER_NONE = 99;
          const ORDER_ATOMIC = 0;
          var code = "";
          var objPropString = [];
          objPropStringFound.forEach((it) => {
            let val = javaScript.valueToCode(
              block,
              `val_${it.key}`,
              /*javaScript.*/ ORDER_ATOMIC
            );
            //console.log('found ' + val, val);
            if (val === "") {
              val = "null";
            }
            if (val == null) {
              val = "null";
            }
            objPropString.push(`"${it.key}\":${val}`);
          });
          var code = "{ " + objPropString.join(",") + " }";

          if(isEnum){           
            var dropdown_name = block.getFieldValue(`val_${key}`);                    
            code = dropdown_name;            
          }
          //console.log(code);
          return [code, /*javaScript.*/ ORDER_NONE];
        }
      };
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
