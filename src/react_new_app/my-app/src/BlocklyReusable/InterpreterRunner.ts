import { WorkspaceSvg } from "blockly";
import AllNewBlocks from "./allNewBlocks";
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
    public blockExecutedID:string='';
    constructor(private workspace: WorkspaceSvg, private javascriptGenerator: any,private callBackCode:(x:any)=>void | null, private finishRun:()=>void, private interceptError:(e:any)=>boolean){
      
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
        if(clearOutput){
          this.blockExecutedID='';
        }
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
                var hasMore=false;
                try{
                  hasMore = self.myInterpreter.run();
                }
                catch(e){
                  
                  //TODO: make the error visible
                  console.error('error!',e);
                  hasMore= self.interceptError(e);
                  console.log('in error', hasMore);                  
                    
                  
                }
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
        this.blockExecutedID=id;
        this.stepExecute++;
    }
    
    public initApi(interpreter: any, globalObject:any, me: InterpreterRunner):void {
      
      me.initApiJS(interpreter,globalObject,me);
    }

   
    public initApiJS(interpreter: any, globalObject:any, me: InterpreterRunner):void {
        var self=this;

        var wrapperErrHandler = (item:any) => {
          var errorText='error';
          if(item)
            errorText=JSON.stringify(item);
          var err=new Error(errorText);
          if(!me.interceptError(err)){
            //window.alert('throwing error');
            throw err;
          }
          // else{
          //   window.alert('not error');
          // }
            
          // if(callBackData)
          //   callBackData('\n error --' + '\n' + item + '\n error --');            
          // else
          //   console.log(item);
     
      };

      interpreter.setProperty(globalObject, 'errHandler',
          interpreter.createNativeFunction(wrapperErrHandler));

        //thisClass.BlocklyJavaScript.addReservedWords('waitForSeconds');
          
        // var waitBlockInstance=new waitBlock();
        // waitBlockInstance.addWrapper(interpreter,globalObject);
        
        // var currentDateInstance =new CurrentDateBlock();
        // currentDateInstance.addWrapper(interpreter,globalObject);
      
        // var ttsBlockInstance=new tts();
        // ttsBlockInstance.addWrapper(interpreter,globalObject);

        // var pianoBlockInstance=new piano();
        // pianoBlockInstance.addWrapper(interpreter,globalObject);


        // var credsInstance =new CredsBlocks();
        // credsInstance.addWrapper(interpreter,globalObject);

        
        // var httpInstance =new HttpBlocks();
        // httpInstance.addWrapper(interpreter,globalObject);

        AllNewBlocks.Instance.NewBlocks().forEach(it=>{
          it.addWrapper(interpreter,globalObject);
      })

        var wrapper120 = function (url:any, hostname:any){
          hostname = hostname ? hostname.toString() : '';
          hostname=hostname.trim();
          if(hostname.length === 0)
          {
              return url;
          }
          
          url=url?url:'';
          url=url.trim();
          if(url.length === 0){
              url=hostname;
              if((!url.startsWith("http")) && (!url.startsWith("/"))){
                  throw new Error(`please put in front of ${hostname} http:// or https://`);
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