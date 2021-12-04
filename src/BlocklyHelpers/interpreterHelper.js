
exports.createInterpreter = function(workspace,BlocklyJavaScript){
    return {
        latestCode : '',
        workspace:workspace,
        BlocklyJavaScript:BlocklyJavaScript,
        step : 0,
        highlightPause : false,
        myInterpreter : null,
        runner: null,
        generateCodeAndLoadIntoInterpreter: function(){
            // Generate BlocklyJavaScript code and parse it.
            this.BlocklyJavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
            this.BlocklyJavaScript.addReservedWords('highlightBlock');
            this.latestCode = this.BlocklyJavaScript.workspaceToCode(workspace);
            //window.alert(this.latestCode);
            this.resetStepUi(true);


        },
        resetStepUi:function(clearOutput){
            // Reset the UI to the start of the program.
            this.step = 0;

            this.workspace.highlightBlock(null);
            this.highlightPause = false;
        },
        resetInterpreter: function(){
            this.myInterpreter = null;
            if (this.runner) {
                window.clearTimeout(this.runner);
                this.runner = null;
            }
        },
        // runnerThis : function (callBackProgramComplete) {
        //     if (this.myInterpreter) {
        //         var hasMore = this.myInterpreter.run();
        //         if (hasMore) {
        //             // Execution is currently blocked by some async call.
        //             // Try again later.
        //             setTimeout(this.runner, 10);
        //         } else {
        //           if(callBackProgramComplete)
        //             callBackProgramComplete();
        //             else
        //             console.log('\n\n<< Program complete! >>');
        //             //FinishGrid();
        //             this.resetInterpreter();
        //             this.resetStepUi(false);
        //         }
        //     }
        // },

        
        highlightBlock: function(id) {
            this.workspace.highlightBlock(id);
            highlightPause = true;
          },

      
      
        runCode: function( newInterpreterConstructor, callBackData,callBackProgramComplete ) {
            // console.log(this.BlocklyJavaScript);
            if (!this.myInterpreter) {
                // First statement of this code.
                // Clear the program output.
                this.resetStepUi(true);
            }
            this.generateCodeAndLoadIntoInterpreter();
            var self=this;
            setTimeout(function () {
                this.highlightPause=false;
                
                // console.log(self.latestCode);
                // console.log(self.BlocklyJavaScript);
                self.myInterpreter = newInterpreterConstructor(self.latestCode,(G,I)=> self.initApiJS(G,I, self, callBackData,callBackProgramComplete ));
                self.runner = function() {
                    if (self.myInterpreter) {
                      var hasMore = self.myInterpreter.run();
                      if (hasMore) {
                        // Execution is currently blocked by some async call.
                        // Try again later.
                        setTimeout(self.runner, 10);
                      } else {
                        if(callBackProgramComplete)
                          callBackProgramComplete();
                        else
                          console.log('\n\n<< Program complete >>');
                        self.resetInterpreter();
                        self.resetStepUi(false);
                      }
                    }
                  };
                  if(self.runner)
                    self.runner();
                }, 100);

        },

        initInterpreterWaitForSeconds: function(interpreter, globalObject) {
            // Ensure function name does not conflict with variable names.
            this.BlocklyJavaScript.addReservedWords('waitForSeconds');
          
            var wrapper = interpreter.createAsyncFunction(
              function(timeInSeconds, callback) {
                // Delay the call to the callback.
                setTimeout(callback, timeInSeconds * 1000);
              });
            interpreter.setProperty(globalObject, 'waitForSeconds', wrapper);
          },
          getCreds: function(interpreter, withCredsForDomain,href) {
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
        },
              getHeaders:function(interpreter,headersForDomain, href){
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
          },

          doGet : function (href, callback, headers, withCreds) {
            // console.log(href, callback);
            let req = new XMLHttpRequest();
          
            req.open('GET', href, true);
            this.generateDataAndCreds(req, headers, withCreds);          
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
                            'text': req.responseText
        
                        });
                        return callback(answer);
        
                    }
                }
                else {
                    //window.alert(`error ${href} ${req.status}`);
                }
            };
            req.send(null);
        },
        
        exportToFile : function (nameFile, content, toByte) {

          // try {
          //     var isFileSaverSupported = !!new Blob;
          // } catch (e) {
          //     window.alert('file saving not supported');
          //     return;
          // }
          var FileSaver = require('file-saver');
      
          var blob ;
          
          if (toByte) {
              blob = this.b64toBlob(content);
          }
          else {
              blob = new Blob([content], { type: "text/plain;charset=utf-8" });
          }    
          FileSaver.saveAs(blob, nameFile);    
          return nameFile;
      },
      b64toBlob : function (b64Data, contentType = '', sliceSize = 512) {
          const byteCharacters = atob(b64Data);
          const byteArrays = [];
      
          for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
              const slice = byteCharacters.slice(offset, offset + sliceSize);
      
              const byteNumbers = new Array(slice.length);
              for (let i = 0; i < slice.length; i++) {
                  byteNumbers[i] = slice.charCodeAt(i);
              }
      
              const byteArray = new Uint8Array(byteNumbers);
              byteArrays.push(byteArray);
          }
      
          const blob = new Blob(byteArrays, { type: contentType });
          return blob;
      },
        

      displayDateCurrentAsHuman :function ()  {

        //undefined - get the date format form user browser.
        let today = new Date().toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
       
        return today;
    },
    
    displayDateCurrentAsIso : function () {
        let today = new Date().toISOString();
        return today;
    }
    ,
    displayDateCurrentAsUnix : function() {
        return Date.now();
    }
    ,
    displayDateFormatted: function (format) {

      switch (format) {
          case 'human':
              // console.log("calling displayDateCurrentAsHuman")
              return this.displayDateCurrentAsHuman();
              break;
          case 'iso':
              //console.log("calling displayDateCurrentAsIso")
              return this.displayDateCurrentAsIso();
              break;
          case 'unix':
              // console.log("calling displayDateCurrentAsUnix")
              return this.displayDateCurrentAsUnix();
              break;
          default:
              console.log('Date time format not suported')
      }
  },
  generateDataAndCreds(req,headers,withCreds){
//read https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_request_header
    if(withCreds)
        req.withCredentials = withCreds;
    else{
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
        if(!hasContentType){
            req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        }
    }
  },
  doPut : (href, objectToPost, callback,headers,withCreds) => {
    let data = objectToPost;
    //console.log(`sending ${data}`);
    let req = new XMLHttpRequest();

    req.open('PUT', href, true);
    this.generateDataAndCreds(req,headers,withCreds);
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
                    'text': req.responseText

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
,
doDelete : function (href, objectToDelete ,callback, headers,withCreds) {
    let data = objectToDelete;
    var req = new XMLHttpRequest();

  req.open('DELETE', href, true);
  //req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  this.generateDataAndCreds(req,headers,withCreds); 
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
                  'text': req.responseText

              });
              return callback(answer);

          }
      }
      else {
          //window.alert(`error ${href} ${req.status}`);
      }
  };
  req.send(data);
}, 
   doPost : function (href, objectToPost, callback, headers, withCreds) {
    let data = objectToPost;
    console.log(`sending `, data);
    let req = new XMLHttpRequest();
    req.open('POST', href, true);
    this.generateDataAndCreds(req,headers,withCreds);
    
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
                var answer = JSON.stringify({
                    'origHref': href,
                    'objectToSend': objectToPost,
                    'status': req.status,
                    'statusOK': false,
                    'text': req.responseText

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
,

        initApiJS:function (interpreter, globalObject,thisClass,callBackData,callBackProgramComplete ) {
            
          var wrapper = (item) => {
            if(callBackData)
              callBackData('\n error --' + '\n' + item + '\n error --');            
            else
              console.log(item);
       
        };

        interpreter.setProperty(globalObject, 'errHandler',
            interpreter.createNativeFunction(wrapper));

        var withCredsForDomain = interpreter.nativeToPseudo({ '(localSite)': false });
        interpreter.setProperty(globalObject, 'withCredsForDomain', withCredsForDomain);

          var headersForDomain = interpreter.nativeToPseudo({ '(localSite)': [] });
          interpreter.setProperty(globalObject, 'headersForDomain',headersForDomain);

          var wrapper = function(text) {
            text = text ? text.toString() : '';
            window.alert(text);
          };
          interpreter.setProperty(globalObject, 'alert1',
              interpreter.createNativeFunction(wrapper));


            // Add an API function for the alert() block, generated for "text_print" blocks.
            var wrapper = function(text) {
              text = text ? text.toString() : '';
              //outputArea.value = outputArea.value + '\n' + text;
              if(callBackData)
                callBackData(text);
              else
                console.log(text);
            };
            interpreter.setProperty(globalObject, 'alert',
                interpreter.createNativeFunction(wrapper));

                var wrapper = (nr, callback) => {
                  console.log(`waiting seconds ${nr}`);
                  setTimeout(callback, nr * 1000);
              };
              interpreter.setProperty(globalObject, 'waitTime',
                  interpreter.createAsyncFunction(wrapper));

                
          var wrapper = (it) => thisClass.displayDateFormatted(it);
          interpreter.setProperty(globalObject, 'displayDateFormatted',
                        interpreter.createNativeFunction(wrapper));
            
    
            var wrapper = (it, content, toByte) => thisClass.exportToFile(it, content, toByte);
            interpreter.setProperty(globalObject, 'exportToFile',
                    interpreter.createNativeFunction(wrapper));
        

            var wrapper = (arrayOrString) => {             
    
                let arr = typeof arrayOrString != 'object' ? JSON.parse(arrayOrString) : {};
            
                arr = [Object.keys(arr[0])].concat(arr)
                var data = arr.map(it => {
                    return Object.values(it).toString()
                }).join('\n');
                return data;
            
            }
            interpreter.setProperty(globalObject, 'convertToCSV',
                interpreter.createNativeFunction(wrapper));

            
          var wrapper = function (text) {
                  window.open(text);
              };
          interpreter.setProperty(globalObject, 'open',
                  interpreter.createNativeFunction(wrapper));
  
  
        var wrapper = function (url, hostname){
            hostname = hostname ? hostname.toString() : '';
            hostname=hostname.trim();
            if(hostname.length == 0)
            {
                return url;
            }
            
            url=url?url:'';
            url=url.trim();
            if(url.length == 0){
                url=hostname;
                if(!url.startsWith("http")){
                    throw `please put in front of ${hostname} http:// or https://`;
                }
            }
            var url= new URL(url);
            //console.log(`url ${url.hostname} to ${hostname}`);
            url.hostname = hostname.replace('https://','').replace('http://','');
            //console.log(`url ${url.href}`);
            var ret=url.href;
            if(ret.endsWith('/'))
                ret=ret.substring(0,ret.length-1);
            return ret;
        }
        interpreter.setProperty(globalObject, 'changeHost',
                                interpreter.createNativeFunction(wrapper));

        var wrapper = function (url, port){
            var url= new URL(url);
            console.log(`url ${url.href}`);
            url.port = port;
            console.log(`url ${url.href}`);
            var ret=url.href;
            if(ret.endsWith('/'))
                ret=ret.substring(0,ret.length-1);
            return ret;
        }
        interpreter.setProperty(globalObject, 'changePort',
                                interpreter.createNativeFunction(wrapper));
                            
            // Add an API function for the prompt() block.
            var wrapper = function(text) {
              text = text ? text.toString() : '';
              return interpreter.createPrimitive(prompt(text));
            };
            interpreter.setProperty(globalObject, 'prompt',
                interpreter.createNativeFunction(wrapper));
      
            // Add an API for the wait block.  See wait_block.js
            // this.initInterpreterWaitForSeconds(interpreter, globalObject);
            thisClass.BlocklyJavaScript.addReservedWords('waitForSeconds');
          
            var wrapper = interpreter.createAsyncFunction(
              function(timeInSeconds, callback) {
                // Delay the call to the callback.
                setTimeout(callback, timeInSeconds * 1000);
              });
            interpreter.setProperty(globalObject, 'waitForSeconds', wrapper);


            var wrapper = (href, callback) => {

              
              var arrHeaders = thisClass.getHeaders(interpreter, headersForDomain, href);
              var withCreds = thisClass.getCreds(interpreter, withCredsForDomain, href);
              
              return thisClass.doGet(href, callback, arrHeaders, withCreds);
          }
          interpreter.setProperty(globalObject, 'getXhr',
              interpreter.createAsyncFunction(wrapper));


              var wrapper = (href, objectToPost, callback) => {
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
                interpreter.createAsyncFunction(wrapper)); 

                var wrapper = (href, objectToDelete, callback) => {
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
                  interpreter.createAsyncFunction(wrapper));
  
            
                var wrapper = (href, objectToPost, callback) => {
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
                      var withCreds = false;
  
                      // if (hostname in creds) {
                      //     withCreds = creds[hostname];
                      // }
                      thisClass.doPut(href, objectToPost, callback, arrHeaders, withCreds);
                  }
                  catch (e) {
                      alert("is an error" + e);
                  }
              };
              interpreter.setProperty(globalObject, 'putXhr',
                  interpreter.createAsyncFunction(wrapper));
  

            
            // Add an API function for highlighting blocks.
            var wrapper = function(id) {
              id = id ? id.toString() : '';
              return interpreter.createPrimitive(thisClass.highlightBlock(id));
            };
            interpreter.setProperty(globalObject, 'highlightBlock',
                interpreter.createNativeFunction(wrapper));
          }
      
    }

}