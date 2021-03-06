const synthPiano = require('./js/audioTest.js');
// const vex = require('vex-js');
// vex.registerPlugin(require('vex-dialog'));
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

          nextStep: function(self,callBackProgramComplete) {
            console.log('next step');

            if (self.myInterpreter.step()) {
                // var s1=self;
                // var s2= callBackProgramComplete;
                // console.log('s1',s1);
              setTimeout((a,b)=>{a.nextStep(a,b);}, 10,self,callBackProgramComplete);
            }
            else
                {
                    if(callBackProgramComplete)
                          callBackProgramComplete();
                        else
                          console.log('\n\n<< Program complete >>');
                        self.resetInterpreter();
                        self.resetStepUi(false);
                }
          }
        ,
        runCode: function( newInterpreterConstructor, callBackData,callBackProgramComplete , code) {
            // console.log('z',code);
            if(code == ''){
                code = this.latestCode;
            }
            if (!this.myInterpreter) {
                // First statement of this code.
                // Clear the program output.
                this.resetStepUi(true);
            }
            this.generateCodeAndLoadIntoInterpreter();
            var self=this;
            self.myInterpreter = newInterpreterConstructor(code,(G,I)=> self.initApiJS(G,I, self, callBackData,callBackProgramComplete ));
            if(window["runOneByOne"]==1){
                this.nextStep(self,callBackProgramComplete);
                return;
            }
            
            setTimeout(function () {
                this.highlightPause=false;
                
                // console.log(self.latestCode);
                // console.log(self.BlocklyJavaScript);
                
                
                self.runner = function() {
                    if (self.myInterpreter) {
                        // debugger;
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
  generateDataAndCreds(req,headers,withCreds,hasSomethingToSend){
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
         if(hasSomethingToSend && !hasContentType){
             req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
         }
    }
  },
  doPut : (href, objectToPost, callback,headers,withCreds) => {
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
                    'objectToSend': objectToPost,
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
,
doDelete : function (href, objectToDelete ,callback, headers,withCreds) {
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
                  'objectToSend': '',
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
}, 
   doPost : function (href, objectToPost, callback, headers, withCreds) {
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
                    'objectToSend': objectToPost,
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
,
table2array: function(table) {
    var rows = table.rows;
    //console.log(myData)
    var ret = [];
    if(rows.length==0){
        return [];
    }
    //first row is header
    var cols = Array.from(rows[0].children).map(it=>it.innerText);
    for (var i = 1; i < rows.length; i++) {
            var elemes = rows[i].children;
            var my_rowArr = {};
            for (var j = 0; j < elemes.length; j++) {
                my_rowArr[cols[j]] = elemes[j].innerText;
            }
            ret.push(my_rowArr);

    }
    return ret;
},

list2array: function(list) {
    var rows =   list.getElementsByTagName('li');;
    //console.log(myData)
    var ret = [];
    if(rows.length==0){
        return [];
    }
    for (var i = 0; i < rows.length; i++) {
            ret.push({"li": rows[i].innerText});
    }
    return ret;
},
parseDOMFromStringElements : function(htmlString, type, tagName){
    var doc = new DOMParser().parseFromString(htmlString, type);
    var elements=[];
    if(tagName.toString().indexOf(",")>-1){
        var arrTags= tagName.split(",");
        for(var i=0;i<arrTags.length;i++){
            elements=elements.concat(Array.from(doc.getElementsByTagName(arrTags[i])));
        }
    }
    else{
        elements=doc.getElementsByTagName(tagName);
    }
    var ret={};
    // console.log('a',elements);
    // console.log('b',elements[0]);
    
    if(elements.length == 0)
        return ret;
    switch(tagName){
        case "table":
            ret={};
            for(var i=0;i<elements.length;i++){
                ret["table"+i]= this.table2array(elements[i]);     
            }             
            break;
        case "a":
            ret=[];
            var loc= window?.location?.host || "";
            if(loc.length>0){
                loc=window.location.protocol+"//"+loc;
            }
            // console.log('x',loc);
            for(var i=0;i<elements.length;i++){
                var href=elements[i].href;
                if(loc.length>0 && href.startsWith(loc)){
                    href= href.substring(loc.length);
                }
                ret.push({ "href" : href, 'text': elements[i].innerText});    
            }
            break;
        case "img":
            ret=[];
            for(var i=0;i<elements.length;i++){
                ret.push({ "src" : elements[i].src});     
            }
            break;    
        case "ul,ol":
            ret={};
            for(var i=0;i<elements.length;i++){
                ret["list"+i]= this.list2array(elements[i]);     
            }      
            
            break;
        case "h1,h2,h3,h4,h5,h6":
            ret=[];
            for(var i=0;i<elements.length;i++){
                ret.push({ "header" : elements[i].innerText});     
            }
            break;
        default:
            throw new Error(`tag !${tagName}! not supported`);
    }
    // console.log('a',ret); 
    return JSON.stringify(ret);
},
consoleLog: function(arg1,arg2){
    return console.log(arg1,arg2);
},
        initApiJS:function (interpreter, globalObject,thisClass,callBackData,callBackProgramComplete ) {
            
          var wrapper = (item) => {
            if(callBackData)
              callBackData('\n error --' + '\n' + item + '\n error --');            
            else
              console.log(item);
       
        };

        interpreter.setProperty(globalObject, 'errHandler',
            interpreter.createNativeFunction(wrapper));

            var wrapper = function(arg1,arg2) {                
                return interpreter.createPrimitive(thisClass.consoleLog(arg1,arg2));
              };
              interpreter.setProperty(globalObject, 'consoleLog',
                  interpreter.createNativeFunction(wrapper));


            var wrapper = function(html,type, tagName) {                
                html= html ? html.toString() : '';
                return interpreter.createPrimitive(thisClass.parseDOMFromStringElements(html,type,tagName));
              };
              interpreter.setProperty(globalObject, 'parseDOMFromStringElements',
                  interpreter.createNativeFunction(wrapper));
            

  
        interpreter.setProperty(globalObject, 'parseDomNative',interpreter.createNativeFunction(wrapper));


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

              var wrapper = function(note, octave, duration) {
                var piano = synthPiano.Synth.createInstrument('piano');
                piano.play(note,octave,duration);
                //window.alert(text);
              };
              interpreter.setProperty(globalObject, 'playPiano',
                  interpreter.createNativeFunction(wrapper));
    
              var wrapper = function(msg, id, item) {
                thisClass.highlightBlock(id);
                debugger;
                console.log(msg, id,item);                
              };
              interpreter.setProperty(globalObject, 'startDebugger',
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
                //console.log('z',arrayOrString,typeof arrayOrString);
                var arr= null;
                if(Array.isArray(arrayOrString)){
                    arr = arrayOrString;
                }
                else{
                    arr = typeof arrayOrString != 'object' ? JSON.parse(arrayOrString) : {};
                    if(arr && arr.table0){//compatibility with table parser blocks
                        arr = arr.table0;
                    }
                    if(arr && arr.list0){//compatibility with list parser blocks
                        arr = arr.list0;
                    }
                }
                if(arr.length == 0)
                    return "";

                arr = [Object.keys(arr[0])].concat(arr)
                var data = arr.map(it => {
                    return Object.values(it).toString()
                }).join('\n');
                return data;
            
            }
            interpreter.setProperty(globalObject, 'convertToCSV',
                interpreter.createNativeFunction(wrapper));

            
          var wrapper = function (text) {
                  window.open(text,'_blank');
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
            if(hostname.startsWith("http")){
                var replace = new URL(hostname);                
                url.hostname = replace.hostname;
                url.protocol = replace.protocol
            }
            else{
                url.hostname = hostname.replace('https://','').replace('http://','');
            }
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
        
//speak
var wrapper = function (text, voiceNr, rate, pitch, volume) {
    var msg = new SpeechSynthesisUtterance(text);
    var nr = parseInt(voiceNr);
    var voice= window.speechSynthesis.getVoices()[nr];
    //window.alert(nr);
    msg.voice = voice;
    window.speechSynthesis.speak(msg);
}
interpreter.setProperty(globalObject, 'speakDefault',
                        interpreter.createNativeFunction(wrapper));

//speak
                                


                                
            // Add an API function for the prompt() block.
            // var wrapper = function(text) {
            //   text = text ? text.toString() : '';
            //   return interpreter.createPrimitive(prompt(text));
            // };
            // interpreter.setProperty(globalObject, 'prompt',
            //     interpreter.createNativeFunction(wrapper));
      
            // var wrapper = interpreter.createAsyncFunction(
            //   function(text, callback) {
            //     vex.defaultOptions.className = 'vex-theme-os';
            //     text = text ? text.toString() : '';
            //   return vex.dialog.prompt( { message:text,callback: callback});

            // });
            var wrapper = function(message,defaultPrompt, callback) {
                message= message? message.toString() : '';
                defaultPrompt= defaultPrompt? defaultPrompt.toString() : '';
                var res= window.prompt(message,defaultPrompt);
                callback(res);
              }; 
              interpreter.setProperty(globalObject, 'prompt',
                  interpreter.createAsyncFunction(wrapper));
            
      
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