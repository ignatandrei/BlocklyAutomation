
import * as  FileSaver from "file-saver";
declare var require: any;
const synthPiano = require('./js/audioTest.js');
// const vex = require('vex-js');
// vex.registerPlugin(require('vex-dialog'));
export class InterpreterBA{

constructor(public workspace:any,public BlocklyJavaScript:any){
}
        // let synthPiano = require('./js/audioTest.js');
        latestCode : string='';
        step :number= 0;
        highlightPause :boolean= false;
        myInterpreter : InterpreterBA| null= null;
        runner: any=null;
        generateCodeAndLoadIntoInterpreter(){
            // Generate BlocklyJavaScript code and parse it.
            this.BlocklyJavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
            this.BlocklyJavaScript.addReservedWords('highlightBlock');
            this.latestCode = this.BlocklyJavaScript.workspaceToCode(this.workspace);
            //window.alert(this.latestCode);
            this.resetStepUi(true);


        }
        resetStepUi(clearOutput:any){
            // Reset the UI to the start of the program.
            this.step = 0;

            this.workspace.highlightBlock(null);
            this.highlightPause = false;
        }
        resetInterpreter(){
            this.myInterpreter = null;
            if (this.runner) {
                window.clearTimeout(this.runner);
                this.runner = null;
            }
        }
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

        
        highlightBlock(id:any) {
            this.workspace.highlightBlock(id);
            this.highlightPause = true;
          }

          nextStep(self:any,callBackProgramComplete:any) {
            console.log('next step');

            if (self.myInterpreter.step()) {
                // var s1=self;
                // var s2= callBackProgramComplete;
                // console.log('s1',s1);
              setTimeout((a:any,b:any)=>{a.nextStep(a,b);}, 10,self,callBackProgramComplete);
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
        
        runCode( newInterpreterConstructor:any, callBackData:any,callBackProgramComplete :any, code:any) {
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
            self.myInterpreter = newInterpreterConstructor(code,(G:any,I:any)=> self.initApiJS(G,I, self, callBackData,callBackProgramComplete ));
            if((window as any).runOneByOne ==1){
                this.nextStep(self,callBackProgramComplete);
                return;
            }
            
            setTimeout(function () {
                self.highlightPause=false;
                
                // console.log(self.latestCode);
                // console.log(self.BlocklyJavaScript);
                
                
                self.runner = function() {
                    if (self.myInterpreter) {
                        // debugger;
                      var hasMore = (self.myInterpreter as any).run();
                      if (hasMore) {
                        // Execution is currently blocked by some async call.
                        // Try again later.
                        setTimeout((self as any).runner, 10);
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
                    (self as any).runner();
                }, 100);

        }

        initInterpreterWaitForSeconds(interpreter:any, globalObject:any) {
            // Ensure function name does not conflict with variable names.
            this.BlocklyJavaScript.addReservedWords('waitForSeconds');
          
            var wrapper = interpreter.createAsyncFunction(
              function(timeInSeconds:any, callback:any) {
                // Delay the call to the callback.
                setTimeout(callback, timeInSeconds * 1000);
              });
            interpreter.setProperty(globalObject, 'waitForSeconds', wrapper);
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
              getHeaders(interpreter:any,headersForDomain:any, href:any){
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
        
        exportToFile (nameFile:any, content:any, toByte:boolean) {

          // try {
          //     var isFileSaverSupported = !!new Blob;
          // } catch (e) {
          //     window.alert('file saving not supported');
          //     return;
          // }
        //   var FileSaver = require('file-saver');
      
          var blob ;
          
          if (toByte == true) {
              blob = this.b64toBlob1(content,'',512);
          }
          else {
              blob = new Blob([content], { type: "text/plain;charset=utf-8" });
          }    
          FileSaver.saveAs(blob, nameFile);    
          return nameFile;
      }

      b64toBlob1(b64Data:any, contentType = '', sliceSize = 512) {
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
      }
        

      displayDateCurrentAsHuman ()  {

        //undefined - get the date format form user browser.
        let today = new Date().toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
       
        return today;
    }
    
    displayDateCurrentAsIso () {
        let today = new Date().toISOString();
        return today;
    }

    displayDateCurrentAsUnix () {
        return Date.now();
    }
    
    displayDateFormatted(format:any) {

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
              console.log('Date time format not suported');
              return '';

      }
  }

  generateDataAndCreds(req:any,headers:any,withCreds:any,hasSomethingToSend:any){
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

table2array(table:any) {
    var rows = table.rows;
    //console.log(myData)
    var ret = [];
    if(!rows)
        return [];
    if(rows.length==0){
        return [];
    }
    //first row is header
    var cols = Array.from(rows[0].children).map(it=>(it as any).innerText);
    for (var i = 1; i < rows.length; i++) {
            var elemes = rows[i].children;
            var my_rowArr = {};
            for (var j = 0; j < elemes.length; j++) {
                (my_rowArr as any)[cols[j]] = elemes[j].innerText;
            }
            ret.push(my_rowArr);

    }
    return ret;
}

list2array(list:any) :any[] {
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
}
parseDOMFromStringElements (htmlString:any, type:any, tagName:any){
    var doc = new DOMParser().parseFromString(htmlString, type);
    var elements:Array<any>=[];
    if(tagName.toString().indexOf(",")>-1){
        var arrTags= tagName.split(",");
        for(var i=0;i<arrTags.length;i++){
            elements=elements.concat(Array.from(doc.getElementsByTagName(arrTags[i])));
        }
    }
    else{
        elements=elements.concat(doc.getElementsByTagName(tagName));
        elements=elements[0];//asdad
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
                (ret as any)["table"+i]= this.table2array(elements[i]);     
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
                (ret as any).push({ "href" : href, 'text': elements[i].innerText});    
            }
            break;
        case "img":
            ret=[];
            for(var i=0;i<elements.length;i++){
                (ret as any).push({ "src" : elements[i].src});     
            }
            break;    
        case "ul,ol":
            ret={};
            for(var i=0;i<elements.length;i++){
                (ret as any)["list"+i]= this.list2array(elements[i]);     
            }      
            
            break;
        case "h1,h2,h3,h4,h5,h6":
            ret=[];
            for(var i=0;i<elements.length;i++){
                (ret as any).push({ "header" : elements[i].innerText});     
            }
            break;
        default:
            throw new Error(`tag !${tagName}! not supported`);
    }
    // console.log('a',ret); 
    return JSON.stringify(ret);
}
consoleLog(arg1:any,arg2:any){
    return console.log(arg1,arg2);
}
        initApiJS(interpreter:any, globalObject:any,thisClass:any,callBackData:any,callBackProgramComplete :any) {
            
          var wrapper = (item:any) => {
            if(callBackData)
              callBackData('\n error --' + '\n' + item + '\n error --');            
            else
              console.log(item);
       
        };

        interpreter.setProperty(globalObject, 'errHandler',
            interpreter.createNativeFunction(wrapper));

            var wrapper10 = function(arg1:any,arg2:any) {                
                return interpreter.createPrimitive(thisClass.consoleLog(arg1,arg2));
              };
              interpreter.setProperty(globalObject, 'consoleLog',
                  interpreter.createNativeFunction(wrapper10));


            var wrapper20 = function(html:any,type:any, tagName:any) {                
                html= html ? html.toString() : '';
                return interpreter.createPrimitive(thisClass.parseDOMFromStringElements(html,type,tagName));
              };
              interpreter.setProperty(globalObject, 'parseDOMFromStringElements',
                  interpreter.createNativeFunction(wrapper20));
            

  
        interpreter.setProperty(globalObject, 'parseDomNative',interpreter.createNativeFunction(wrapper));


        var withCredsForDomain = interpreter.nativeToPseudo({ '(localSite)': false });
        interpreter.setProperty(globalObject, 'withCredsForDomain', withCredsForDomain);

          var headersForDomain = interpreter.nativeToPseudo({ '(localSite)': [] });
          interpreter.setProperty(globalObject, 'headersForDomain',headersForDomain);

          var wrapper30 = function(text:any) {
            text = text ? text.toString() : '';
            window.alert(text);
          };
          interpreter.setProperty(globalObject, 'alert1',
              interpreter.createNativeFunction(wrapper30));

              var wrapper40 = function(note:any, octave:any, duration:any) {
                var piano = synthPiano.Synth.createInstrument('piano');
                piano.play(note,octave,duration);
                //window.alert(text);
              };
              interpreter.setProperty(globalObject, 'playPiano',
                  interpreter.createNativeFunction(wrapper40));
    
              var wrapper50 = function(msg:any, id:any, item:any) {
                thisClass.highlightBlock(id);
                debugger;
                console.log(msg, id,item);                
              };
              interpreter.setProperty(globalObject, 'startDebugger',
                  interpreter.createNativeFunction(wrapper50));
    
    
            // Add an API function for the alert() block, generated for "text_print" blocks.
            var wrapper60 = function(text:any) {
              text = text ? text.toString() : '';
              //outputArea.value = outputArea.value + '\n' + text;
              if(callBackData)
                callBackData(text);
              else
                console.log(text);
            };
            interpreter.setProperty(globalObject, 'alert',
                interpreter.createNativeFunction(wrapper60));

                var wrapper70 = (nr:any, callback:any) => {
                  console.log(`waiting seconds ${nr}`);
                  setTimeout(callback, nr * 1000);
              };
              interpreter.setProperty(globalObject, 'waitTime',
                  interpreter.createAsyncFunction(wrapper70));

                
          var wrapper80 = (it:any) => thisClass.displayDateFormatted(it);
          interpreter.setProperty(globalObject, 'displayDateFormatted',
                        interpreter.createNativeFunction(wrapper80));
            
    
            var wrapper90 = (it:any, content:any, toByte:any) => thisClass.exportToFile(it, content, toByte);
            interpreter.setProperty(globalObject, 'exportToFile',
                    interpreter.createNativeFunction(wrapper90));
        

            var wrapper100 = (arrayOrString:any) => {             
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
                interpreter.createNativeFunction(wrapper100));

                var wrapper101 = (arrayOrString:any) => {             
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
                    var keys=Object.keys(arr[0]);
                    var data= "<table><tr>";
                    data += keys.map((it :any )=> `<th>${it}</th>\n`).join('');
                    data+="</tr>";
                    data+= arr.map((it:any)=> `<tr>${Object.values(it).map(it=>`<td>${it}</td>`).join('')}</tr>`).join('');
                    data+="</table>";
                    
                    
                    return data;
                
                }
                interpreter.setProperty(globalObject, 'convertToHTML',
                    interpreter.createNativeFunction(wrapper101));
    
            
          var wrapper110 = function (text:any) {
                  window.open(text,'_blank');
              };
          interpreter.setProperty(globalObject, 'open',
                  interpreter.createNativeFunction(wrapper110));
  
  
        var wrapper120 = function (url:any, hostname:any){
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
            var urlNew= new URL(url);
            //console.log(`url ${url.hostname} to ${hostname}`);
            if(hostname.startsWith("http")){
                var replace = new URL(hostname);                
                urlNew.hostname = replace.hostname;
                urlNew.protocol = replace.protocol
            }
            else{
                urlNew.hostname = hostname.replace('https://','').replace('http://','');
            }
            //console.log(`url ${url.href}`);
            var ret=urlNew.href;
            if(ret.endsWith('/'))
                ret=ret.substring(0,ret.length-1);
            return ret;
        }
        interpreter.setProperty(globalObject, 'changeHost',
                                interpreter.createNativeFunction(wrapper120));

        var wrapper130 = function (url:any, port:any){
            var urlNew= new URL(url);
            console.log(`url ${urlNew.href}`);
            urlNew.port = port;
            console.log(`url ${urlNew.href}`);
            var ret=urlNew.href;
            if(ret.endsWith('/'))
                ret=ret.substring(0,ret.length-1);
            return ret;
        }
        interpreter.setProperty(globalObject, 'changePort',
                                interpreter.createNativeFunction(wrapper130));
        
//speak
var wrapper140 = function (text:any, voiceNr:any, rate:any, pitch:any, volume:any) {
    var msg = new SpeechSynthesisUtterance(text);
    var nr = parseInt(voiceNr);
    if(nr <0) {
        console.log(' no voice selected');
        return;
    }
    var voice= window.speechSynthesis.getVoices()[nr];
    //window.alert(nr);
    msg.voice = voice;
    window.speechSynthesis.speak(msg);
}
interpreter.setProperty(globalObject, 'speakDefault',
                        interpreter.createNativeFunction(wrapper140));

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
            var wrapper150 = function(message:any,defaultPrompt:any, callback:any) {
                message= message? message.toString() : '';
                defaultPrompt= defaultPrompt? defaultPrompt.toString() : '';
                var res= window.prompt(message,defaultPrompt);
                callback(res);
              }; 
              interpreter.setProperty(globalObject, 'prompt',
                  interpreter.createAsyncFunction(wrapper150));
            
      
            // Add an API for the wait block.  See wait_block.js
            // this.initInterpreterWaitForSeconds(interpreter, globalObject);
            thisClass.BlocklyJavaScript.addReservedWords('waitForSeconds');
          
            var wrapper160 = interpreter.createAsyncFunction(
              function(timeInSeconds:any, callback:any) {
                // Delay the call to the callback.
                setTimeout(callback, timeInSeconds * 1000);
              });
            interpreter.setProperty(globalObject, 'waitForSeconds', wrapper160);


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
                  interpreter.createAsyncFunction(wrapper200));
  

            
            // Add an API function for highlighting blocks.
            var wrapper210 = function(id:any) {
              id = id ? id.toString() : '';
              return interpreter.createPrimitive(thisClass.highlightBlock(id));
            };
            interpreter.setProperty(globalObject, 'highlightBlock',
                interpreter.createNativeFunction(wrapper210));
          }
      
    }