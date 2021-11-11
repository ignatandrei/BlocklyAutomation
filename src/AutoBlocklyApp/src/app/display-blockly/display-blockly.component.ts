import { Component, OnInit } from '@angular/core';
import * as Blockly from 'blockly';
import * as BlocklyJavaScript from 'blockly/javascript';
import * as acorn from 'acorn';
import * as bs from '@blockly/blocklyscripts';

declare var Interpreter: any;
@Component({
  selector: 'app-display-blockly',
  templateUrl: './display-blockly.component.html',
  styleUrls: ['./display-blockly.component.css']
})
export class DisplayBlocklyComponent implements OnInit {

  
  public demoWorkspace: Blockly.WorkspaceSvg|null = null;
  public run: any;
  constructor() { 
    
    //console.log(bs.filterBlocks.definitionBlocks());

  }
  RunCode(){
    
    var f= (latestCode:string, initApi: any)=> {
      return new Interpreter(this.run.latestCode,initApi);
    }
    // console.log(BlocklyJavaScript);
    this.run = bs.interpreterHelper.createInterpreter(this.demoWorkspace,BlocklyJavaScript);

    this.run.runCode(f);
  }
  ngOnInit(): void {
        

    bs.filterBlocks.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    bs.waitBlocks.definitionBlocks(Blockly.defineBlocksWithJsonArray, BlocklyJavaScript);          
      var blocks=[
        bs.defaultBlocks.generalBlocks(),
        bs.filterBlocks.filterXML(),
        `<category id="catHelpers" colour="160" name="Helpers">
          ${bs.waitBlocks.waitXml()}
        </category>`
      ]
      this.initialize(blocks);
      
      bs.saveBlocksUrl.restoreState(Blockly.Xml,this.demoWorkspace);
    
  }
  showInner:string='';
  SaveBlocks(){
    bs.saveBlocksUrl.saveState(Blockly.Xml,this.demoWorkspace);
  }
  ShowInnerWorkings(){
    var outputArea = document.getElementById('output');
        if(outputArea == null){
          window.alert("outputArea is null");
          return;
        }
      if(this.demoWorkspace == null){
        window.alert("demoWorkspace is null");
        return;
      }
    var xml = Blockly.Xml.workspaceToDom(this.demoWorkspace, true);
            var xml_text = Blockly.Xml.domToPrettyText(xml);
            this.showInner = `
            ========
            ${xml_text}
            ========
            ${this.run.latestCode}
            `
            
            ;
            //outputArea.value += latestCode;

  }
  private initialize(defaultBlocks: string[] ){
    const blocklyDiv = document.getElementById('blocklyDiv');
    if(blocklyDiv == null){
      window.alert("blocklyDiv is null");
      return;
    }
    var blocks=defaultBlocks.map(it=>`<sep></sep>${it}`);
    var toolboxXML=`<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox-simple" style="display: none">
    ${blocks}
    </xml>`;
    // console.log(toolboxXML);
    const toolbox = document.getElementById('toolbox');
    this.demoWorkspace=Blockly.inject(blocklyDiv, {
      readOnly: false,
       media: 'media/',
      trashcan: true,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true
      },
       toolbox: toolboxXML
    } as Blockly.BlocklyOptions);
    console.log(BlocklyJavaScript);
    this.run = bs.interpreterHelper.createInterpreter(this.demoWorkspace,BlocklyJavaScript);
    var self=this;
    this.demoWorkspace.addChangeListener(function (evt:any) {
      if (!evt.isUiEvent) {
          self.run.resetInterpreter();
          self.run.generateCodeAndLoadIntoInterpreter();
          self.ShowInnerWorkings();
      }
    });
  }

}
