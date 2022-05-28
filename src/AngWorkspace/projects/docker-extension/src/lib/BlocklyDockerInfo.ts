import * as Blockly from 'blockly';
import { DockerData } from './DockerData';

export class BlocklyInfoVersion{
  
  constructor() { 
  }

  definitionBlocks(blocks: any, javaScript: any) {
    const ORDER_ATOMIC = 0;
    const ORDER_NONE = 99;

    blocks['dockerInfo'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("Info");
        this.appendValueInput("transform")
            .setCheck("String")
            .appendField("Transform");
        this.setOutput(true, null);
        this.setColour(30);
        this.setOutput(true, null);
        
     this.setTooltip("Docker Info");
    //  this.setHelpUrl("https://docs.docker.com/engine/api/v1.37/#tag/Image");
      }
    };
    javaScript['dockerInfo'] = function (block:any) {
      var value_transform = javaScript.valueToCode(block, 'transform', javaScript.ORDER_ATOMIC)||'"{{json .}}"';

      var code = 'function(){';
      code+=' var argsDocker= [];\n';
      code+=' argsDocker.push("--format");\n';
      code+=' argsDocker.push('+value_transform +');\n';
      //code+=' alert(argsDocker.join(","));\n';
      code+='return execDockerCLI_JSONParser("info", JSON.stringify(argsDocker) );\n';
      code+='}()\n';
      return [code, ORDER_NONE];
    };

    blocks['dockerVersion'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("Version");
        this.appendValueInput("transform")
            .setCheck("String")
            .appendField("Transform");
        this.setOutput(true, null);
        this.setColour(30);
        this.setOutput(true, null);
        
     this.setTooltip("Docker Version");
    //  this.setHelpUrl("https://docs.docker.com/engine/api/v1.37/#tag/Container");
      }
    };
    javaScript['dockerVersion'] = function (block:any) {
      var value_transform = javaScript.valueToCode(block, 'transform', javaScript.ORDER_ATOMIC)||'"{{json .}}"';

      var code = 'function(){';
      code+=' var argsDocker= [];\n';
      code+=' argsDocker.push("--format");\n';
      code+=' argsDocker.push('+value_transform +');\n';
      //code+=' alert(argsDocker.join(","));\n';
      code+='return execDockerCLI_JSONParser("version", JSON.stringify(argsDocker) );\n';
      code+='}()\n';
      return [code, ORDER_NONE];
    };

    blocks['dockercommandv1'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("Command")
            .appendField(new Blockly.FieldDropdown([
              ["attach","'attach'"],
["build","'build'"],
["builder","'builder'"],
["buildx","'buildx'"],
["commit","'commit'"],
["compose","'compose'"],
["config","'config'"],
["container","'container'"],
["context","'context'"],
["cp","'cp'"],
["create","'create'"],
["diff","'diff'"],
["events","'events'"],
["exec","'exec'"],
["export","'export'"],
["extension","'extension'"],
["history","'history'"],
["image","'image'"],
["images","'images'"],
["import","'import'"],
["info","'info'"],
["inspect","'inspect'"],
["kill","'kill'"],
["load","'load'"],
["login","'login'"],
["logout","'logout'"],
["logs","'logs'"],
["manifest","'manifest'"],
["network","'network'"],
["node","'node'"],
["pause","'pause'"],
["plugin","'plugin'"],
["port","'port'"],
["ps","'ps'"],
["pull","'pull'"],
["push","'push'"],
["rename","'rename'"],
["restart","'restart'"],
["rm","'rm'"],
["rmi","'rmi'"],
["run","'run'"],
["save","'save'"],
["sbom","'sbom'"],
["scan","'scan'"],
["search","'search'"],
["secret","'secret'"],
["service","'service'"],
["stack","'stack'"],
["start","'start'"],
["stats","'stats'"],
["stop","'stop'"],
["swarm","'swarm'"],
["system","'system'"],
["tag","'tag'"],
["top","'top'"],
["trust","'trust'"],
["unpause","'unpause'"],
["update","'update'"],
["version","'version'"],
["volume","'volume'"],
["wait","'wait'"]

            ]), "commands");
        this.appendValueInput("commandArgs")
            .setCheck("Array")
            .appendField("Arguments");
        this.setOutput(true, "String");
        this.setColour(230);
     this.setTooltip("");
     this.setHelpUrl("");
      }
    };

    javaScript['dockercommandv1'] = function(block:any) {
      var dropdown_commands = block.getFieldValue('commands');
      var value_commandargs = javaScript.valueToCode(block, 'commandArgs', ORDER_ATOMIC)||'';
      
      var code = 'function(){';
      code+=' var argsDocker= '+value_commandargs+';\n';
      code+='return execDockerCLI_String('+dropdown_commands +', JSON.stringify(argsDocker) );\n';
      code+='}()\n';

      return [code, ORDER_NONE];
    };



  }
  fieldXML(): string {
    return `
    <category name='general'>    
    <block type='text_print' x='141' y='76'>
    <value name='TEXT'>
      <block type='dockerInfo'>
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
    <block type='dockerVersion'>
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
  <block type='dockercommandv1'>
    
</block>
</value>
</block>


</category>
`;
  }
}
