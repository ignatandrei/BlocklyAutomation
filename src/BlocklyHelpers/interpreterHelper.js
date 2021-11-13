
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
          doGet : function (href, callback, headers) {
            console.log(href, callback);
            let req = new XMLHttpRequest();
          
            req.open('GET', href, true);
          if(headers)
          if(headers.length>0){
            //alert(JSON.stringify(headers));
            for(var iHeader=0;iHeader<headers.length;iHeader++){
              var head=headers[iHeader];
              req.setRequestHeader(head.name,head.value);
            }
          }
          
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
        headersForDomain:'',

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
              console.log("calling displayDateCurrentAsIso")
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
  
    


        initApiJS:function (interpreter, globalObject,thisClass,callBackData,callBackProgramComplete ) {
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
              var heads = interpreter.pseudoToNative(thisClass.headersForDomain);
              var hostname = '(localSite)';
              if (href.startsWith('http://') || href.startsWith('https://')) {
                  hostname = (new URL(href)).hostname;
              }
              var arrHeaders = [];
              // if (hostname in heads) {
              //     arrHeaders = heads[hostname];
              // }
              return thisClass.doGet(href, callback, arrHeaders);
          }
          interpreter.setProperty(globalObject, 'getXhr',
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