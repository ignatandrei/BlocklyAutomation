import * as Blockly from 'blockly';
import * as BlocklyJavaScript from 'blockly/javascript';
interface operations{
  controller: any,
  id:any
}
export class BlocklyReturnSwagger {
  constructor(public swaggerUrl: string) {}

  GenerateBlocks: [] = [];
  GenerateFunctions: [] = [];
  fieldXMLObjects: [] = [];
  fieldXMLFunctions: [] = [];
  hasError: boolean = true;
  paths: [] = [];
  name: string = '';
  operations: operations[] = [];

  tagsSwagger: [] = [];
  openApiDocument: any = null;
  cacheCategSwaggerFromPaths :string[]= [];


  nameCategSwagger(): any {
    return `catSwagger${this.findHostNameRegular()}_${this.name}`;
  }
  findHostNameRegular(): string {
    var href = '';
    if (this.openApiDocument?.host?.length > 0) {
      var hostData = this.openApiDocument.host;
      if (Array.isArray(hostData))
        href = this.openApiDocument.schemes[0] + '://' + hostData[0];
      else href = this.openApiDocument.schemes[0] + '://' + hostData;

      // href=this.openApiDocument.schemes[0]+"://"+this.openApiDocument.host[0];
      // console.log('xxx',href);
    } else {
      href = this.swaggerUrl;
    }
    var hostname = '(localSite)';
    if (href.startsWith('http://') || href.startsWith('https://')) {
      var url = new URL(href);
      var port = url.port ?? 80;
      hostname = url.hostname + port;
    }
    return hostname.split('.').join('');
  }

  metaBlocks() {
    var self = this;
    return function (blocks: any, javaScript: any) {
      var nameBlock = `meta_swagger_controllers_${self.name}`;
      blocks[nameBlock] = {
        init: function () {
          this.appendDummyInput().appendField('categories_' + self.name);
          this.setOutput(true, null);
          this.setColour(30);
          this.setTooltip('');
          this.setHelpUrl(self.swaggerUrl);
        },
      };
      javaScript[nameBlock] = function (block: any) {
        var categ = self.findCategSwaggerFromPaths();
        var obj = categ.map((it) => {
          return {
            name: it,
            //ops:self.operations.filter(op=>op.controller==it).map(op=>op.id)
          };
        });
        var obj1 = { name: self.name, categories: obj };
        var code = JSON.stringify(obj1);
        return [code, javaScript.ORDER_NONE];
      };

      var nameBlock = `meta_swagger_controllers_actions_${self.name}`;
      blocks[nameBlock] = {
        init: function () {
          this.appendDummyInput().appendField('categories_actions' + self.name);
          this.setOutput(true, null);
          this.setColour(30);
          this.setTooltip('');
          this.setHelpUrl(self.swaggerUrl);
        },
      };
      javaScript[nameBlock] = function (block:any) {
        var categ = self.findCategSwaggerFromPaths();
        var obj = categ.map((it) => {
          return {
            name: it,
            ops: self
              .findfieldXMLFunctions(it)
              .map((op:any) => op.id)
              .filter((op:any) => op.length > 0),
          };
        });
        var obj1 = { name: self.name, categories: obj };
        var code = JSON.stringify(obj1);
        return [code, javaScript.ORDER_NONE];
      };
    };
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
        tags.forEach(function (tag:any) {
          if(!self.cacheCategSwaggerFromPaths.includes(tag)){
            self.cacheCategSwaggerFromPaths.push(tag);
            
          }
          self.operations.push({ controller:tag, id:key});
            });
        });
        
      }
    });
  }
  findCategSwaggerFromPaths() {
    this.findCategsFromTags();
    if (this.cacheCategSwaggerFromPaths.length > 0)
      return this.cacheCategSwaggerFromPaths;

    var normalized = this.paths
      .filter((it:any) => it && it.id && it.id.length > 0)
      .map((it:any) => {
        var len = it.id.length;
        var i = it.id.indexOf('{');
        while (i > 0) {
          // /api/v{version}
          var closing = it.id.indexOf('}', i);
          if (len - closing < 2) {
            it.id = it.id.substring(0, i);
            break;
          }
          i = it.id.indexOf('{', closing);
        }

        return it;
      })
      .map((it) => {
        if (it.id.lastIndexOf('/') != it.id.length - 1) it.id += '/';

        return it;
      });

    this.operations = normalized
      .filter((it) => it.nrOps > 1)
      //.map(it=>it.id)
      .map((it) => {
        var ret = {
          arr: it.id.split('/').filter((a:string) => a.length > 0),
          id: it.id,
        };

        return ret;
      })
      .map((it) => {
        return { controller: it.arr[it.arr.length - 1], id: it.id };
      });

    var others = normalized
      .filter((it) => it.nrOps == 1)
      .map((it) => {
        return { arr: it.id.split('/').filter((a:string) => a.length > 0), id: it.id };
      })
      .map((it) => {
        if (it.arr.length == 1) return { controller: it.arr[0], id: it.id };
        return { controller: it.arr[it.arr.length - 2], id: it.id };
      });
    this.operations.push(...others);

    this.cacheCategSwaggerFromPaths = [
      ...new Set(this.operations.map((it:any) => it.controller)),
    ];

    return this.cacheCategSwaggerFromPaths;
  }
  findfieldXMLFunctions(controllerName:string){
    var allPaths=this.openApiDocument.paths;
    var keys= Object.keys(allPaths);
    
    var urls = this.operations.filter((it:any) => it.controller == controllerName);
    //console.log(urls);
    var xmlList = this.fieldXMLFunctions
      .filter((it:any) => {
        if (it.id == '') return true;
        var val = it.id + '/';
        var existInfields = false;
        urls.forEach((url:any) => {
          if (val.startsWith(url.id)) existInfields = true;
        });
        if(existInfields) return true;
        
        urls.forEach((url:any) => {
          //url has latest / , but can have also {  for parameters
            var str=url.id.substring(0,url.id.lastIndexOf('/'))+'{';
          if (val.startsWith(str)) existInfields = true;
        });

        return existInfields;
      });
      // console.log('x',xmlList);
      return xmlList;
  }

}
