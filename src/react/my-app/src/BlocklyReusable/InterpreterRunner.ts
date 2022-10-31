import { WorkspaceSvg } from "blockly";
declare var Interpreter: any;

class InterpreterRunner{
    highlightPause :boolean= false;
    myInterpreter : any= null;
    step: number=0;
    runnerPid:NodeJS.Timeout|null=null;
    constructor(private workspace: WorkspaceSvg, private javascriptGenerator: any){

    }
    public resetStepUi(clearOutput: boolean): number{
        // Reset the UI to the start of the program.
        this.step = 0;
        if(this.runnerPid != null)
            clearTimeout(this.runnerPid);

        this.workspace.highlightBlock(null);
        this.highlightPause = false;
        return this.step;
    }
    public runCode() {
        var self=this;
        if (!this.myInterpreter) {
          // First statement of this code.
          // Clear the program output.
          this.resetStepUi(true);
          var latestCode = this.javascriptGenerator.workspaceToCode(this.workspace);
          //runButton.disabled = 'disabled';
  
          // And then show generated code in an alert.
          // In a timeout to allow the outputArea.value to reset first.
          setTimeout(function() {
            alert('Ready to execute the following code\n' +
                '===================================\n' + latestCode);
  
            // Begin execution
            self.myInterpreter = new Interpreter(latestCode, self.initApi);
            function runner() {
              if (self.myInterpreter) {
                var hasMore = self.myInterpreter.run();
                if (hasMore) {
                  // Execution is currently blocked by some async call.
                  // Try again later.
                  self.runnerPid = setTimeout(runner, 10);
                } else {
                  // Program is complete.
                  //outputArea.value += '\n\n<< Program complete >>';
                  self.resetStepUi(false);
                }
              }
            }
            runner();
          }, 1);
          return;
        }
      }
    public highlightBlock(id: string) {
        this.workspace.highlightBlock(id);
        this.highlightPause = true;
    }

    public initApi(interpreter: any, globalObject:any):void {
        var self=this;
        // Add an API function for the alert() block, generated for "text_print" blocks.
        var wrapperAlert = function alert(text:any) {
          text = arguments.length ? text : '';
        //   outputArea.value += '\n' + text;
        };
        interpreter.setProperty(globalObject, 'alert',
            interpreter.createNativeFunction(wrapperAlert));
  
        // Add an API function for the prompt() block.
        var wrapperPrompt = function prompt(text:any) {
          return window.prompt(text);
        };
        interpreter.setProperty(globalObject, 'prompt',
            interpreter.createNativeFunction(wrapperPrompt));
  
        // Add an API function for highlighting blocks.
        var wrapper = function(id:any) {
          id = String(id || '');
          return self.highlightBlock(id);
        };
        interpreter.setProperty(globalObject, 'highlightBlock',
            interpreter.createNativeFunction(wrapper));
  
        // Add an API for the wait block.  See wait_block.js
        //initInterpreterWaitForSeconds(interpreter, globalObject);
      }
      
}

export default InterpreterRunner;