import { WorkspaceSvg } from "blockly";
import CurrentDateBlock from "./BlocklyNewBlocks/CurrentDateBlock";
import { tts } from "./BlocklyNewBlocks/tts";
import waitBlock from "./BlocklyNewBlocks/wait_block";
declare var Interpreter: any;

class InterpreterRunner{
    highlightPause :boolean= false;
    myInterpreter : any= null;
    public stepDisplay: number=0;
    public stepExecute:number=0;
    runnerPid:NodeJS.Timeout|null=null;
    private myCallBackCode :(text:any, me:InterpreterRunner)=>void ;
    public lastData:any;
    public latestCode:string='';
    constructor(private workspace: WorkspaceSvg, private javascriptGenerator: any,private callBackCode:(x:any)=>void | null, private finishRun:()=>void){
      
      this.myCallBackCode = (text, me)=>{
        // console.log('received ', text,me);
        me.stepDisplay++;
        me.lastData=text;
          if(me.callBackCode != null)
            me.callBackCode(text);
          else
            console.log(text);
        }
        
    }
    public resetStepUi(clearOutput: boolean): number{
        // Reset the UI to the start of the program.
        this.stepDisplay = 0;
        this.stepExecute=0;
        if(this.runnerPid != null)
            clearTimeout(this.runnerPid);

        this.workspace.highlightBlock('');
        this.highlightPause = false;
        return this.stepDisplay;
    }
    public runCode() {
        var self=this;
        if (!this.myInterpreter) {
          // First statement of this code.
          // Clear the program output.
          this.resetStepUi(true);
          var latestCode = this.javascriptGenerator.workspaceToCode(this.workspace)||'';
          //runButton.disabled = 'disabled';
  
          // And then show generated code in an alert.
          // In a timeout to allow the outputArea.value to reset first.
          setTimeout(function() {
            // alert('Ready to execute the following code\n' +
            //     '===================================\n' + latestCode);
  
            // Begin execution
            self.myInterpreter = new Interpreter(latestCode,(i:any,g:any)=> self.initApi(i,g,self), self);
            function runner() {
              //console.log('ab',self.myInterpreter);
              if (self.myInterpreter) {
                //console.log('ac',self.myInterpreter);
                var hasMore = self.myInterpreter.run();
                //console.log('ad',self.myInterpreter, hasMore);
                if (hasMore) {
                  // Execution is currently blocked by some async call.
                  // Try again later.
                  self.runnerPid = setTimeout(runner, 10);
                } else {
                  // Program is complete.
                  //outputArea.value += '\n\n<< Program complete >>';                  
                  self.resetStepUi(false);
                  if(self.finishRun)
                    self.finishRun();
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
        this.stepExecute++;
    }
    
    public initApi(interpreter: any, globalObject:any, me: InterpreterRunner):void {
      
      me.initApiJS(interpreter,globalObject,me);
    }

   
    public initApiJS(interpreter: any, globalObject:any, me: InterpreterRunner):void {
        var self=this;


        //thisClass.BlocklyJavaScript.addReservedWords('waitForSeconds');
          
        var waitBlockInstance=new waitBlock();
        waitBlockInstance.addWrapper(interpreter,globalObject);
        
        var currentDateInstance =new CurrentDateBlock();
        currentDateInstance.addWrapper(interpreter,globalObject);
      
        var ttsBlockInstance=new tts();
        ttsBlockInstance.addWrapper(interpreter,globalObject);

        // Add an API function for the alert() block, generated for "text_print" blocks.
        var wrapperAlert = function alert(text:any) {
          text = arguments.length ? text : '';          
          me.myCallBackCode(text,me);
          
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
          me.stepExecute++;
          return self.highlightBlock(id);
        };
        interpreter.setProperty(globalObject, 'highlightBlock',
            interpreter.createNativeFunction(wrapper));
  
        // Add an API for the wait block.  See wait_block.js
        //initInterpreterWaitForSeconds(interpreter, globalObject);
      }
      
}

export default InterpreterRunner;