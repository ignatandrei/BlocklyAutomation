
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
        runnerThis : function () {
            if (this.myInterpreter) {
                var hasMore = this.myInterpreter.run();
                if (hasMore) {
                    // Execution is currently blocked by some async call.
                    // Try again later.
                    setTimeout(this.runner, 10);
                } else {
                    // Program is complete.
                    console.log('\n\n<< Program complete >>');
                    //FinishGrid();
                    this.resetInterpreter();
                    this.resetStepUi(false);
                }
            }
        },

        
        highlightBlock: function(id) {
            this.workspace.highlightBlock(id);
            highlightPause = true;
          },

      
      
        runCode: function( newInterpreterConstructor){
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
                self.myInterpreter = newInterpreterConstructor(self.latestCode,(G,I)=> self.initApiJS(G,I, self));
                self.runner = function() {
                    if (self.myInterpreter) {
                      var hasMore = self.myInterpreter.run();
                      if (hasMore) {
                        // Execution is currently blocked by some async call.
                        // Try again later.
                        setTimeout(self.runner, 10);
                      } else {
                        // Program is complete.
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
        
        initApiJS:function (interpreter, globalObject,thisClass) {
            // Add an API function for the alert() block, generated for "text_print" blocks.
            var wrapper = function(text) {
              text = text ? text.toString() : '';
              //outputArea.value = outputArea.value + '\n' + text;
              console.log(text);
            };
            interpreter.setProperty(globalObject, 'alert',
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