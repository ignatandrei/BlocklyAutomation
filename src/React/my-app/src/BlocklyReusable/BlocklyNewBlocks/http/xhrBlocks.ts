import * as Blockly from 'blockly';
import { IBlocksSimple } from '../../blocksInterface';

export class HttpBlocks  implements IBlocksSimple{
  category: string='REST Requests';
  definitionBlocksSimple(javaScript: any) {
    
    const ORDER_ATOMIC = javaScript.ORDER_ATOMIC;
    const ORDER_NONE = javaScript.ORDER_NONE;

    Blockly.Blocks['headersbeforehttp'] = {
      init: function () {
        this.appendDummyInput().appendField('Add Headers');
        this.appendValueInput('HttpDomain')
          .setCheck('String')
          .appendField('Domain');
        this.appendValueInput('HeaderName')
          .setCheck('String')
          .appendField('Header Name');
        this.appendValueInput('HeaderValue')
          .setCheck('String')
          .appendField('Header Value');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        //this.setColour(230);
        this.setTooltip('at domain put (localSite) or *');
        //this.setHelpUrl("");
      },
    };
    javaScript['headersbeforehttp'] = function (block: any) {
      var value_httpdomain =
        javaScript.valueToCode(
          block,
          'HttpDomain',
          /*javaScript.*/ ORDER_ATOMIC
        ) || '(localSite)';
      var value_headername = javaScript.valueToCode(
        block,
        'HeaderName',
        /*javaScript.*/ ORDER_ATOMIC
      );
      var value_headervalue = javaScript.valueToCode(
        block,
        'HeaderValue',
        /*javaScript.*/ ORDER_ATOMIC
      );

      var code = '\n'; //'alert("a" + JSON.stringify(headersForDomain)+"a");\n';
      code += '{\n';
      code += 'if(!(' + value_httpdomain + ' in headersForDomain))\n';
      code += '{\n';
      code += 'headersForDomain[' + value_httpdomain + ']=[];\n';
      code += '};\n';
      code += 'var arr = headersForDomain[' + value_httpdomain + '];\n';
      code +=
        'arr.push({name:' +
        value_headername +
        ', value:' +
        value_headervalue +
        '});\n';
      code += '//alert("a" + JSON.stringify(arr)+"a");\n';
      code +=
        '//alert("a" + JSON.stringify(headersForDomain[' +
        value_httpdomain +
        '])+"a");\n';
      code += '};\n';
      return code;
    };

    Blockly.Blocks['httprequest'] = {
      init: function () {
        this.appendDummyInput()
          .appendField(
            /*new*/ new Blockly.FieldDropdown([
              ['JSON', 'JSON'],
              ['Text', 'Text'],
            ]),
            'TypeOutput'
          )
          .appendField('HttpRequest');
        this.appendValueInput('TheUrl')
          .setCheck(null)
          .appendField(
            /*new*/ new Blockly.FieldDropdown([
              ['GET', 'GET'],
              ['POST', 'POST'],
              ['PUT', 'PUT'],
              ['DELETE', 'DELETE'],
            ]),
            'TypeRequest'
          )
          .appendField('URL');
        this.appendValueInput('Data').setCheck(null).appendField('Data');
        this.setOutput(true, null);
        //this.setColour(230);
        //this.setTooltip("");
        //this.setHelpUrl("");
      },
    };

    javaScript['httprequest'] = function (block: any) {
      var dropdown_typeoutput = block.getFieldValue('TypeOutput');
      var dropdown_typerequest = block.getFieldValue('TypeRequest');
      var value_theurl = javaScript.valueToCode(
        block,
        'TheUrl',
        /*javaScript.*/ ORDER_ATOMIC
      );
      var value_data = javaScript.valueToCode(
        block,
        'Data',
        /*javaScript.*/ ORDER_ATOMIC
      );
      var operation = '';
      switch (dropdown_typerequest.toString()) {
        case 'GET':
          operation =
            '(function(url){ var res=JSON.parse(getXhr(url)); if(res.statusOK) return res.text;errHandler(JSON.stringify(res)); throw res;}(' +
            value_theurl +
            ') )';
          break;
        case 'POST':
          // console.log('x',value_data)
          operation =
            '(function(url,data){ var res=JSON.parse(postXhr(url,JSON.stringify(data))); if(res.statusOK) return res.text;errHandler(JSON.stringify(res)); throw res;}(' +
            value_theurl;
          if (value_data) {
            operation += ',' + value_data;
          }
          operation += ') )';
          break;
        case 'DELETE':
          operation =
            '(function(url,data){ var res=JSON.parse(deleteXhr(url,JSON.stringify(data))); if(res.statusOK) return res.text;errHandler(JSON.stringify(res)); throw res;}(' +
            value_theurl;
          if (value_data) {
            operation += ',' + value_data;
          }
          operation += ') )';
          break;
        case 'PUT':
          operation =
            '(function(url,data){ var res=JSON.parse(putXhr(url,JSON.stringify(data))); if(res.statusOK) return res.text;errHandler(JSON.stringify(res)); throw res;}(' +
            value_theurl;
          if (value_data) {
            operation += ',' + value_data;
          }
          operation += ') )';
          break;
        default:
          alert('Do not understand : ' + dropdown_typerequest.toString());
          break;
      }

      var code = operation;
      switch (dropdown_typeoutput) {
        case 'JSON':
          code = 'JSON.parse(' + code + ')';
      }

      return [code, /*javaScript.*/ ORDER_NONE];
    };
  }

  fieldXML(): string {
    return `
    
    <block type="headersbeforehttp">
    <value name="HttpDomain">
        <shadow type="text">
            <field name="TEXT">(localSite)</field>
        </shadow>
    </value>
    <value name="HeaderName">
        <shadow type="text">
            <field name="TEXT">Authorization</field>
        </shadow>
    </value>
    <value name="HeaderValue">
        <shadow type="text_join">

        </shadow>
    </value>
</block>
<block type="text_print">
<value name="TEXT">

    <block type="httprequest">
    <value name="TheUrl">
        <shadow type="text">
            <field name="TEXT">https://httpbin.org/get</field>
        </shadow>
    </value>
</block>
</value>
</block>    

`;
  }

  public addWrapper(interpreter: any, globalObject:any){
    var headersForDomain = interpreter.nativeToPseudo({ '(localSite)': [] });
    interpreter.setProperty(globalObject, 'headersForDomain',headersForDomain);

    var thisClass =this;
    var headersForDomain = interpreter.getProperty(globalObject,'headersForDomain');
    // console.log('ccc',headersForDomain);
    var withCredsForDomain = interpreter.getProperty(globalObject,'withCredsForDomain');
    var wrapper170 = (href:any, callback:any) => {

              
      var arrHeaders = thisClass.getHeaders(interpreter, headersForDomain, href);
      var withCreds = thisClass.getCreds(interpreter, withCredsForDomain, href);
      
      return thisClass.doGet(href, callback, arrHeaders, withCreds);
  }
  interpreter.setProperty(globalObject, 'getXhr',
      interpreter.createAsyncFunction(wrapper170));


      var wrapper180 = (href:any, objectToPost:any, callback:any) => {
        try {
            var arrHeaders = thisClass.getHeaders(interpreter, headersForDomain, href);
            var withCreds = thisClass.getCreds(interpreter, withCredsForDomain, href);
            thisClass.doPost(href, objectToPost, callback, arrHeaders, withCreds);
        }
        catch (e) {
            alert("is an error" + e);
        }
    };
    interpreter.setProperty(globalObject, 'postXhr',
        interpreter.createAsyncFunction(wrapper180)); 

        var wrapper190 = (href:any, objectToDelete:any, callback:any) => {
          try {
            var arrHeaders = thisClass.getHeaders(interpreter, headersForDomain, href);
            var withCreds = thisClass.getCreds(interpreter, withCredsForDomain, href);                      
            thisClass.doDelete(href, objectToDelete,callback,arrHeaders, withCreds);
          }
          catch (e) {
              alert("is an error" + e);
          }
      };



      interpreter.setProperty(globalObject, 'deleteXhr',
          interpreter.createAsyncFunction(wrapper190));

    
        var wrapper200 = (href:any, objectToPost:any, callback:any) => {
          try {
              

              var heads = interpreter.pseudoToNative(headersForDomain);
              var hostname = '(localSite)';
              if (href.startsWith('http://') || href.startsWith('https://')) {
                  hostname = (new URL(href)).hostname;
              }
              var arrHeaders = [];
              if (hostname in heads) {
                  arrHeaders = heads[hostname];
              }
              var withCreds = thisClass.getCreds(interpreter, withCredsForDomain, href);  

              thisClass.doPut(href, objectToPost, callback, arrHeaders, withCreds);
          }
          catch (e) {
              alert("is an error" + e);
          }
      };
      interpreter.setProperty(globalObject, 'putXhr',
          interpreter.createAsyncFunction(wrapper200));

  }
  getCreds(interpreter:any, withCredsForDomain:any,href:any) {
    var creds = interpreter.pseudoToNative(withCredsForDomain);
    var hostname = '(localSite)';
    if (href.startsWith('http://') || href.startsWith('https://')) {
        hostname = (new URL(href)).hostname;
    }
    var withCreds=false;
    if (hostname in creds) {
      withCreds = creds[hostname];
    }
    else if("*" in creds){
      withCreds = creds["*"]; 
    }  
    return withCreds;
}

  public getHeaders(interpreter:any,headersForDomain:any, href:any){
    var heads = interpreter.pseudoToNative(headersForDomain);
    var hostname = '(localSite)';
    if (href.startsWith('http://') || href.startsWith('https://')) {
        hostname = (new URL(href)).hostname;
    }
    var arrHeaders = [];
    // console.log("heads2",heads);
    if (hostname in heads) {
         arrHeaders = heads[hostname];
    }
    else if("*" in heads){
      arrHeaders = heads["*"];
    }
    return arrHeaders;            
  }
  public generateDataAndCreds(req:any,headers:any,withCreds:any,hasSomethingToSend:any){
    //read https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_request_header
        if(withCreds){
            req.withCredentials = withCreds;
        }
        //else 
        {
            var hasContentType=false;
            // 
            if(headers && headers.length>0){        
            //alert(JSON.stringify(headers));
                for(var iHeader=0;iHeader<headers.length;iHeader++){
                    var head=headers[iHeader];
                    if(head.name=="Content-Type"){
                        hasContentType=true;
                    }
                    req.setRequestHeader(head.name,head.value);
                }
            };
            //default to application json those days
             if(hasSomethingToSend && !hasContentType){
                 req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
             }
        }
        
      }
      doPut (href:any, objectToPost:any, callback:any,headers:any,withCreds:any) {
        let data = objectToPost;
        //console.log(`sending ${data}`);
        let req = new XMLHttpRequest();
    
        req.open('PUT', href, true);
        this.generateDataAndCreds(req,headers,withCreds,objectToPost?true:false);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status >= 200 && req.status < 300) {
                    var answer = JSON.stringify({
                        'origHref': href,
                        'objectToSend': objectToPost,
                        'status': req.status,
                        'statusOK': true,
                        'text': req.responseText
    
                    });
                    return callback(answer);
    
    
                } else {
                    var answer = JSON.stringify({
                        'origHref': href,
                        'objectToSend': objectToPost,
                        'status': req.status,
                        'statusOK': false,
                        'text': req.responseText,                    
                        'headers' : req.getAllResponseHeaders()
    
    
                    });
                    return callback(answer);
    
                }
            }
            else {
                //window.alert(`error ${href} ${req.status}`);
            }
        };
        req.send(data);
      }
    
      doDelete (href:any, objectToDelete :any,callback:any, headers:any,withCreds:any) {
        let data = objectToDelete;
        var req = new XMLHttpRequest();
    
      req.open('DELETE', href, true);
      //req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      this.generateDataAndCreds(req,headers,withCreds,objectToDelete?true:false); 
      req.onreadystatechange = function () {
          if (req.readyState == 4) {
              if (req.status >= 200 && req.status < 300) {
                  var answer = JSON.stringify({
                      'origHref': href,
                      'objectToSend': '',
                      'status': req.status,
                      'statusOK': true,
                      'text': req.responseText
    
                  });
                  return callback(answer);
    
    
              } else {
                  var answer = JSON.stringify({
                      'origHref': href,
                      'status': req.status,
                      'statusOK': false,
                      'text': req.responseText,
                      'objectToSend': objectToDelete,
                      'headers' : req.getAllResponseHeaders()
    
    
                  });
                  return callback(answer);
    
              }
          }
          else {
              //window.alert(`error ${href} ${req.status}`);
          }
      };
      req.send(data);
    }
    
  
      doPost (href:any, objectToPost:any, callback:any, headers:any, withCreds:any) {
        let data = objectToPost;
        // console.log(`sending `, data);
        let req = new XMLHttpRequest();
        req.open('POST', href, true);
        this.generateDataAndCreds(req,headers,withCreds, objectToPost?true:false);
        
        //req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status >= 200 && req.status < 300) {
                    var answer = JSON.stringify({
                        'origHref': href,
                        'objectToSend': objectToPost,
                        'status': req.status,
                        'statusOK': true,
                        'text': req.responseText
    
                    });
                    return callback(answer);
    
    
                } else {
                    // console.log('x_',req);
                    var answer = JSON.stringify({
                        'origHref': href,
                        'objectToSend': objectToPost,
                        'status': req.status,
                        'statusOK': false,
                        'text': req.responseText,
                        'headers' : req.getAllResponseHeaders()
    
                    });
                    return callback(answer);
    
                }
            }
            else {
                //window.alert(`error ${href} ${req.status}`);
            }
        };
        req.send(data);
      }

  doGet(href:any, callback:any, headers:any, withCreds:any) {
    // console.log(href, callback);
    let req = new XMLHttpRequest();
  
    req.open('GET', href, true);
    this.generateDataAndCreds(req, headers, withCreds,false);          
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status >= 200 && req.status < 300) {
                var answer = JSON.stringify({
                    'origHref': href,
                    'objectToSend': '',
                    'status': req.status,
                    'statusOK': true,
                    'text': req.responseText

                });
                return callback(answer);


            } else {
                
                var answer = JSON.stringify({
                    'origHref': href,
                    'objectToSend': '',
                    'status': req.status,
                    'statusOK': false,
                    'text': req.responseText,
                    'headers' : req.getAllResponseHeaders()


                });
                return callback(answer);

            }
        }
        else {
            //window.alert(`error ${href} ${req.status}`);
        }
    };
    req.send(null);
    
}

}
