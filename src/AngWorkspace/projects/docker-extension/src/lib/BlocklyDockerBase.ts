import * as Blockly from 'blockly';
import { DockerData } from './DockerData';

export class BlocklyDockerBase{
  
  public dd: DockerData;
  constructor() { 
    this.dd=new DockerData();
  }

  definitionBlocks(blocks: any, javaScript: any) {
    const ORDER_ATOMIC = 0;
    const ORDER_NONE = 99;

    blocks['dockerImages'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("Docker Images");
        this.appendValueInput("all")
            .setCheck("Boolean")
            .appendField("All Containers");
        this.appendValueInput("filter")
            .setCheck("String")
            .appendField("Filter");
        this.appendValueInput("digests")
            .setCheck("Boolean")
            .appendField("Digests");
        this.appendValueInput("transform")
            .setCheck("String")
            .appendField("Transform");
        this.setOutput(true, null);
        this.setColour(30);
        this.setOutput(true, null);
        
     this.setTooltip("Docker Image list");
     this.setHelpUrl("https://docs.docker.com/engine/api/v1.37/#tag/Image");
      }
    };
    javaScript['dockerImages'] = function (block:any) {
      var value_all = javaScript.valueToCode(block, 'all', javaScript.ORDER_ATOMIC)||false;
      var value_digests = javaScript.valueToCode(block, 'digests', javaScript.ORDER_ATOMIC)||false;
      var value_filter = javaScript.valueToCode(block, 'filter', javaScript.ORDER_ATOMIC)||'';
      var value_transform = javaScript.valueToCode(block, 'transform', javaScript.ORDER_ATOMIC)||'"{{json .}}"';

      var argsDocker= [];
      argsDocker.push('--format');
      argsDocker.push('');
      //var str= argsDocker.join(',');
      var code = 'function(){';
      code+=' var argsDocker= [];\n';
      code+=' argsDocker.push("ls");\n';
      code+=' if('+value_all+'){argsDocker.push("--all")};\n';      
      code+=' if('+value_digests+'){argsDocker.push("--digests")};\n';      
      code+=' if('+value_filter+'.length>0){argsDocker.push("--filter");argsDocker.push('+value_filter+');};\n';      
      code+=' argsDocker.push("--format");\n';
      code+=' argsDocker.push('+value_transform +');\n';
      //code+=' alert(argsDocker.join(","));\n';
      code+='return execDockerCLI("image", JSON.stringify(argsDocker) );\n';
      code+='}()\n';
      return [code, ORDER_NONE];
    };

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
        this.appendValueInput("transform")
            .setCheck("String")
            .appendField("Transform");
        this.setOutput(true, null);
        this.setColour(30);
        this.setOutput(true, null);
        
     this.setTooltip("Docker Image list");
     this.setHelpUrl("https://docs.docker.com/engine/api/v1.37/#tag/Container");
      }
    };
    javaScript['dockerContainers'] = function (block:any) {
      var value_all = javaScript.valueToCode(block, 'all', javaScript.ORDER_ATOMIC)||false;
      var value_size = javaScript.valueToCode(block, 'size', javaScript.ORDER_ATOMIC)||false;
      var value_filter = javaScript.valueToCode(block, 'filter', javaScript.ORDER_ATOMIC)||'';
      var value_transform = javaScript.valueToCode(block, 'transform', javaScript.ORDER_ATOMIC)||'"{{json .}}"';

      var argsDocker= [];
      argsDocker.push('--format');
      argsDocker.push('');
      //var str= argsDocker.join(',');
      var code = 'function(){';
      code+=' var argsDocker= [];\n';
      code+=' argsDocker.push("ls");\n';
      code+=' if('+value_all+'){argsDocker.push("--all")};\n';      
      code+=' if('+value_size+'){argsDocker.push("--size")};\n';      
      code+=' if('+value_filter+'.length>0){argsDocker.push("--filter");argsDocker.push('+value_filter+');};\n';      
      code+=' argsDocker.push("--format");\n';
      code+=' argsDocker.push('+value_transform +');\n';
      //code+=' alert(argsDocker.join(","));\n';
      code+='return execDockerCLI("container", JSON.stringify(argsDocker) );\n';
      code+='}()\n';
      return [code, ORDER_NONE];
    };

  }
  fieldXML(): string {
    return `
    
    <block type='text_print' x='141' y='76'>
    <value name='TEXT'>
      <block type='dockerImages'>
      <value name="all">
      <shadow type="logic_boolean">
        <field name="BOOL">TRUE</field>
      </shadow>
    </value>
    <value name="digests">
      <shadow type="logic_boolean">
        <field name="BOOL">FALSE</field>
      </shadow>
    </value>
    <value name="filter">
          <shadow type="text">
            <field name="TEXT"></field>
          </shadow>
        </value>
        <value name="transform">
        <shadow type="text">
          <field name="TEXT">"{{json .}}"</field>
        </shadow>
      </value>
    </block>
    </value>
  </block>
  
  
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
      <value name="transform">
      <shadow type="text">
        <field name="TEXT">"{{json .}}"</field>
      </shadow>
    </value>
  </block>
  </value>
</block>
`;
  }
}
