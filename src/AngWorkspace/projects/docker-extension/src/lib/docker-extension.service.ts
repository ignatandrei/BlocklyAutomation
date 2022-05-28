import { createDockerDesktopClient } from '@docker/extension-api-client';
import { DockerDesktopClient, ExecResult } from '@docker/extension-api-client-types/dist/v1';
import * as Blockly from 'blockly';

export class DockerData {
  public canConstruct: boolean=false;
  ddClient:DockerDesktopClient|null=null;
  constructor() { 
    
    try{
      this.ddClient = createDockerDesktopClient();
    
    }
    catch(e){
      console.log("in dockerdata constructor", e);
      return;
    }


    this.canConstruct=true;
    // const result = ddClient.docker.cli.exec('info', [
    //   '--format',
    //   '"{{json .}}"',
    // ]).then(result => {
    //   console.log('!!!!!!obtained0'); 
    //   console.log('obtained1' ,result);
    //   console.log('obtained2' ,result.parseJsonObject());
    // });
    // ddClient.docker.listContainers().then(result => {
    //   console.log('!!!!!!containers');
    //   console.log(result);
    // });
    // ddClient.docker.listImages().then(result => {
    //   console.log('!!!!!!images');
    //   var r=result as Array<any>;

    //   ddClient.desktopUI.toast.success("images" + (r?.length||0));
    //   console.log(result);
    // });

    //ddClient.desktopUI.toast.success("DockerData");
  }
  public execCli(cmd:string, args:string[]):Promise<ExecResult>{
    return this.ddClient!.docker.cli.exec(cmd, args);
  }
}




export class BlocklyDockerContainers {
  
  public dd: DockerData;
  constructor() { 
    this.dd=new DockerData();
  }

  definitionBlocks(blocks: any, javaScript: any) {
    const ORDER_ATOMIC = 0;
    const ORDER_NONE = 99;

    blocks['dockerContainers'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("Docker Containers");
        this.appendValueInput("all")
            .setCheck("Boolean")
            .appendField("All Containers");
        this.appendValueInput("filter")
            .setCheck("String")
            .appendField("Filter");
        this.appendValueInput("size")
            .setCheck("Boolean")
            .appendField("Size");
        this.setOutput(true, null);
        this.setColour(30);
        this.setOutput(true, null);
        
     this.setTooltip("Docker Container list");
     this.setHelpUrl("https://docs.docker.com/engine/reference/commandline/container_ls/");
      }
    };
    javaScript['dockerContainers'] = function (block:any) {
      var value_all = javaScript.valueToCode(block, 'all', javaScript.ORDER_ATOMIC)||false;
      var value_filter = javaScript.valueToCode(block, 'filter', javaScript.ORDER_ATOMIC)||'';
      var value_size = javaScript.valueToCode(block, 'size', javaScript.ORDER_ATOMIC)||false;
      var argsDocker= [];
      argsDocker.push('--format');
      argsDocker.push('');
      var str= argsDocker.join(',');
      var code = 'function(){';
      code+=' var argsDocker= [];\n';
      code+=' argsDocker.push("--format");\n';
      code+=' argsDocker.push("{{json .}}");\n';
      code+=' if('+value_size+'){argsDocker.push("--size")};\n';
      code+=' if('+value_all+'){argsDocker.push("--all")};\n';
      code+='return execDockerCLI("containers", argsDocker );\n';//+value_all+','+value_filter+','+value_size+')';
      code+='}()\n';
      return [code, ORDER_NONE];
    };

    
  }
  fieldXML(): string {
    return `
    
    <block type='text_print' x='141' y='76'>
    <value name='TEXT'>
      <block type='dockerContainers'>
      <value name="all">
      <shadow type="logic_boolean">
        <field name="BOOL">TRUE</field>
      </shadow>
    </value>
    <value name="size">
      <shadow type="logic_boolean">
        <field name="BOOL">FALSE</field>
      </shadow>
    </value>
    <value name="filter">
          <shadow type="text">
            <field name="TEXT"></field>
          </shadow>
        </value>
      </block>
    </value>
  </block>  
`;
  }
}
