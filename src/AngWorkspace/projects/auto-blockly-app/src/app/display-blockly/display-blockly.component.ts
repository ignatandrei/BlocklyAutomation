import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ɵɵsetComponentScope,
} from '@angular/core';
import 'codemirror/mode/javascript/javascript';
import * as Blockly from 'blockly';
import * as BlocklyJavaScript from 'blockly/javascript';
import {ContentHighlight} from '@blockly/workspace-content-highlight';
import * as acorn from 'acorn';
import { BlocklyXHR } from'projects/blockly-scripts/src/lib/BlocklyXHR';

// import * as bh from '@blockly/blocklyhelpers';

import { TabulatorHelper } from './tabulator';
import { LoadShowUsageService } from "projects/node2-blockly/src/lib/load-show-usage.service";
import { DemoBlocks } from "projects/node2-blockly/src/lib/DemoBlocks";
import { BlocklyReturnSwagger } from "projects/blockly-swagger/src/public-api";
// import { firstValueFrom } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
declare var Interpreter: any;
import { IntroJs } from 'intro.js';
import * as introJs from 'intro.js';
import { AppDetails } from '../AppDetails';
import { TourSteps } from "projects/node2-blockly/src/lib/TourSteps";
import { TransmitAction } from 'projects/node2-blockly/src/lib/TransmitAction';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { Chart , registerables } from 'chart.js';
import Chart from 'chart.js/auto';
import { catchError, fromEvent, throwError, windowWhen } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FindSavedBlocksComponent } from '../find-saved-blocks/find-saved-blocks.component';
import { error } from '@angular/compiler/src/util';
import { bs } from '../bs';
import { saveLoadService } from 'projects/blockly-helpers/src/lib/blockly-helpers.service';
import { InterpreterBA } from 'projects/blockly-helpers/src/lib/interpreter';
import { MatTabChangeEvent } from '@angular/material/tabs';
enum ShowCodeAndXML{
  ShowNone=0,
  ShowBlocksDefinition=1,
  ShowXML=2,
  ShowOutput=3,
  ShowCode=4,
  Stop=  100
}
@Component({
  selector: 'app-display-blockly',
  templateUrl: './display-blockly.component.html',
  styleUrls: ['./display-blockly.component.css'],
})
export class DisplayBlocklyComponent implements OnInit,AfterViewInit {

  lastData: any = null;
  //monaco settings
  editorXMLOptions = {theme: 'vs-dark', language: 'xml'};
  editorJSOptions = {theme: 'vs-dark', language: 'javascript', lineNumbers: 'on'};
  editorPlain = {theme: 'vs-dark', language: 'plaintext', lineNumbers: 'on'};
  
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
  public showCodeAndXML: ShowCodeAndXML = ShowCodeAndXML.ShowNone;
  public swaggerLoaded: number = 0;
  public demoWorkspace: Blockly.WorkspaceSvg | null = null;
  public run: any;
  
  public mustLoadDemoBlock: string = '';
  // private directLinkDemo:string='';
  private intro: IntroJs = introJs();
  static id:number=0;
  myId:number=0;
  bs: bs= new bs();
  bh2: saveLoadService = new saveLoadService ();
  bh: InterpreterBA | null = null;
  constructor(
    private tabulator: TabulatorHelper,
    public DetailsApp: AppDetails,
    private loadDemo: LoadShowUsageService,
    private ar: ActivatedRoute,
    private ta :TransmitAction,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {

    this.myId=++DisplayBlocklyComponent.id;
//    console.log('x_',this.myId);
    
    //console.log(this.bs.filterBlocks.definitionBlocks());
    this.ar.paramMap.subscribe((params: any) => {
      this.mustLoadDemoBlock = params.get('demoblock');
    });
    this.ta.receiveData().subscribe(it=>{
      if(it[0]=='DisplayBlocklyComponent'){
        ((this as any)[it[1]] as any)();
      }
    });
    this.DetailsApp.LocalAPI?.IsAlive().subscribe();
  }
  
  createIntro() {
    
    var steps = this.DetailsApp.settings?.tourSteps.map((it: TourSteps) => {
      return {
        title: this.DetailsApp.settings?.title|| 'Blockly Automation',
        intro: it.text,
        element: document.querySelector(it.query) || undefined,
      };
    });
    this.intro
      
      .setOptions({
        exitOnEsc: true,
        showStepNumbers: true,
        showButtons: true,
        doneLabel: 'Exit',
        skipLabel: 'Skip',
        showProgress:true,
        steps: steps,
      })
      .start();
  }
  clearOutput() {
    this.step = 0;
    this.showInner = '';
    this.tabulator.ClearDataGrid();
    if(this.myChart !=null){
      this.myChart.destroy();
    };
    //var el=this.theHtmlOutput();
    //el.innerHTML = '';
    this.fullHtmlData='';

    //el=this.theTextOutput();
    //el.innerText = '';
    this.fullTextData='';


    
  }
  fullTextData:string='';
  ShowText(data: any){
    if(data == null)
      return;
    var dt= data.toString();
    this.fullTextData+="\n"+dt;
    //var el=this.theTextOutput();
    //el.innerText = this.fullTextData;
  }
  fullHtmlData:string='';
  finishHTMLOutput(){
    this.theHtmlOutput().innerHTML = this.fullHtmlData;
  }
  ShowHTML(data: any) {
    if(data == null)
      return;
    var dt= data.toString();
    this.fullHtmlData+="<br/>"+dt;
    //var el=this.theHtmlOutput();
    //el.innerHTML += dt;
  }
  public theHtmlOutput() : HTMLElement{
    return document.getElementById('htmlOutput'+this.myId)!;
  }
  public theTextOutput() : HTMLElement{
    return document.getElementById('htmlText'+this.myId)!;
  }

  myChart:Chart| null = null;
  ShowChart(data: any){
    var e:HTMLCanvasElement = (document.getElementById('barchart'+this.myId) as any)?.getContext('2d') as HTMLCanvasElement;
    if(e == null)
    {
      console.log("not canvas available for chart!");
      return;
    }
    
    
      try{
        var st=data?.toString();
        var dt=JSON.parse(st);
        if(dt && dt.type){
          this.myChart = new Chart(e!, dt);
          console.log('make chart',data);
        }
      }
      catch(e){
        //console.log(e);
        this.myChart = null;
      }
    }
    
  //   this.myChart = new Chart(e!,
  //   {"type":"bar","data":
  //   {"labels":["2019","2018","2017","2016","2015","2014","2013"],
    
  //   "datasets":[{"label":"Population",
  //   "data":[328239523/10000000,327167439/10000000,325719178/10000000,323127515/10000000,321418821/10000000,318857056/10000000,316128839/10000000]}]}
  // });
  private tabIndex:number=0;
  private changeTab(index:number){
    switch(index){
      case 0:
        break;
      case 1:
        this.theTextOutput().innerText = this.fullTextData; 
        break;
      case 2:
        this.finishHTMLOutput();
        break;
      case 3: 
        this.ShowChart(this.lastData);
        break;
      case 4:
        const gridElement = document.getElementById('steps'+this.myId);
        if (gridElement == null) {
          window.alert('gridElement is null');
          return;
        }
        this.tabulator.ClearDataGrid();
        this.tabulator.initGrid(gridElement);
    
        this.tabulator.FinishGrid();
        break;
      default:
        window.alert("tab "+ index +" not implemented");
        break;
    }
  }
  public changeTabOutput(eventTab: MatTabChangeEvent){
    console.log(eventTab.index);
    this.tabIndex=eventTab.index;
    this.changeTab(eventTab.index);
  }
  step: number = 0;
  RunCode() {
    
    this.snackBar.open('Program start', 'Executing...');
    var self = this;
    var code=this.run.latestCode;
    var jsCode=this.showJSCode;
    self.CalculateXMLAndCode();
    var f = (latestCode: string, initApi: any) => {
      try {
        return new Interpreter(latestCode, initApi);
      } catch (e) {
        self.CalculateXMLAndCode();
        window.alert(
          'please copy the left output and report there is an error at ' +
            JSON.stringify(e)
        );
        this.showCodeAndXML = ShowCodeAndXML.ShowCode;
      }
    };
    this.bh = new InterpreterBA(this.demoWorkspace,BlocklyJavaScript);
    this.run = this.bh;
    this.showCodeAndXML = ShowCodeAndXML.ShowOutput;    
    this.clearOutput();
    this.showInner = '{ "step_start": "start program",';
    
    //  console.log('x',code);
    //  console.log('y',jsCode);
     //#38 
    if(false && (code !=  jsCode)){
      if(window.confirm('Do you want to run the code modified by you ?'))
        code = jsCode;
        this.showJSCode=jsCode;
    }
    this.run.runCode(
      f,
      (data: any) => {
        // data = data?.toString()?.replace(/\n/g, '')?.replace(/\r/g, '');
        self.step++;
        self.showInner += `\n           
"step_${self.step}" : "${data}",`;
        // console.log(`obtained ${data}`);
        self.lastData=data;
        self.tabulator.AddData(data);
        //self.ShowChart(data);
        self.ShowHTML(data);
        self.ShowText(data);
      },
      () => {
        this.snackBar.open('Program end', 'Done!', {
          duration: 3000
        });
        self.showInner += `\n "step_end" : "program executed; see results below"\n}`;
        //this.tabulator.FinishGrid();
        this.changeTab(this.tabIndex);
        //this.finishHTMLOutput();
      },
      code
    );
  }
  public ShowLocalAPI(id:string){
    this.DetailsApp.LocalAPI?.LoadBlockContent(id).subscribe((data)=>{
      var xml = Blockly.Xml.textToDom(data);
      if (this.demoWorkspace != null) {
        Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, this.demoWorkspace);

        window.alert('please press execute button');
      };
    });
  }
  public ShowDemo(id: string) {
    this.mustLoadDemoBlock = id;
    this.loadDemo.getDemoBlock(id).subscribe((data) => {
      var xml = Blockly.Xml.textToDom(data);
      if (this.demoWorkspace != null) {
        try{
        Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, this.demoWorkspace);
        }
        catch(e){
          if(id?.toString().indexOf("docker")>-1){
            if(window.confirm("This demo must run with Desktop App.\nDo you want to go to download page?")){
              window.open('http://ba.serviciipeweb.ro/');
            }
            return;
          }
          if(id?.toString().indexOf("chrome")>-1){
            if(window.confirm("This demo must run with MyPC swagger.\nDo you want to go to download page?")){
              window.open('https://github.com/ignatandrei/BlocklyAutomation/wiki/MyPC');
            }
            return;
          }
          window.alert('error ' + id);
          return;
        }
        window.alert('please press execute button');
      };
    });
  }
  // swaggersUrl:string[]=[
  //   'https://microservicesportchooser.azurewebsites.net/swagger/v1/swagger.json',
  //   'https://netcoreblockly.herokuapp.com/swagger/v1/swagger.json',
  //   'https://petstore.swagger.io/v2/swagger.json'

  // ];
  public swaggerData: any[] = [];

  public registerSwaggerBlocksObjects(
    demoWorkspace: Blockly.Workspace,
    item: any
  ): Element[] {
    var xmlList: Element[] = [];
    xmlList = item.fieldXMLObjects.map((it: any) => Blockly.Xml.textToDom(it));
    // var cat='<category id="microservicesportchooserazurewebsitesnet" name="microservicesportchooserazurewebsitesnet"><block type="IRegister"></block></category>';
    // cat='<block type="IRegister"></block>';
    
    // var block = Blockly.Xml.textToDom(cat);
    // xmlList.push(block);
    return xmlList;
    // console.log(data);
    // window.alert('a');
    // var str= data.map((it:any)=>it.categSwagger().toString() as string);
    // console.log(str);
    // var ret= str.map((it:string)=> Blockly.Xml.textToDom(it));
    // return ret;
  }
  public registerSwaggerBlocksAPIControllers(
    demoWorkspace: Blockly.Workspace,
    item: any,
    controller: string
  ): Element[] {
    var xmlList: Element[] = [];
    xmlList= item.findfieldXMLFunctions(controller)
      .map((it: any) => Blockly.Xml.textToDom(it.gui));
    return xmlList;
  }
  public registerSwaggerBlocksAPIAll(
    demoWorkspace: Blockly.Workspace,
    item: any
  ): Element[] {
    var xmlList: Element[] = [];
    xmlList = item.fieldXMLFunctions.map((it: any) =>
      Blockly.Xml.textToDom(it.gui)
    );
    return xmlList;
  }
  ngOnInit(): void {
    //this.ShowBlocks();
  }
  ngAfterViewInit(): void {
    this.StartRegister();
    //this.createIntro();
    fromEvent(window, 'TabDownload').subscribe(it=>this.tabulator.copyCSV());
    fromEvent(window, 'TabCopy').subscribe(it=>this.tabulator.copyClip());
  }
  public ShowBlocks(){
    const dialogRef = this.dialog.open(FindSavedBlocksComponent, {
      //width: '250px',
      //data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with ', result);
      if(result){
        var d= result as DemoBlocks ;
        switch(d.Source){
          case "Demos":
            try{
              console.log('into try');
              this.ShowDemo(result.id);
            }
            catch(e){
              window.alert(result.id);
              window.alert(e);
            }
            break;
          case "LocalAPI":
            this.ShowLocalAPI(result.id);
            break;
          default:
            window.alert(d.Source);
            break;   
        }  
        
      }
      
    });
  }
  public LoadSwagger() {
    //https://swagger-tax-calc-api.herokuapp.com/api-docs
    //cors: https://humorapi.com/downloads/humorapi-openapi-3.json
    var self=this;
    var parser = new BlocklyReturnSwagger("");
    var json = window.prompt("Swagger/OpenAPI ? ");
    
    if (!json) return;
    if (json.endsWith('.html') || json.endsWith('.htm')) {
      window.alert('Swagger should end with .json - see source of html page');
      return;
    }
    //self.loadedCompletely=false;
    self.LoadSwaggerFromUrl(json).then((api:any) => {
      // this.afterTimeout(this);
      if(api.hasError){
        if(window.confirm("error loading swagger - most probably CORS\n Please download the windows app to try this.")){
            window.open('http://ba.serviciipeweb.ro/');
        }
      }
      else{
        
        self.addToToolboxSwagger(api,this);      
        //self.loadedCompletely=true;
        window.alert("loaded successfully");
      }
    });
    }
    // var json = window.prompt(
    //   'Swagger url? ',
    //   'https://swagger-tax-calc-api.herokuapp.com/api-docs'
    // );
    // if (!json) return;
    // if (json.endsWith('.html') || json.endsWith('.htm')) {
    //   window.alert('Swagger should end with .json - see source of html page');
    //   return;
    // }
    // this.LoadSwaggerFromUrl(json).then((it) => {
    //   // this.afterTimeout(this);
    //   this.addToToolboxSwagger(it,this);
    //   window.alert('done');
    // });
  
  public async LoadSwaggerFromUrl(url: string, name?: string): Promise<any> {
    var parser = new BlocklyReturnSwagger(url);
    var api = await parser.ParseSwagger();

    api.name = name || url;
    if(!api.hasError)
      return this.LoadSwaggerFromAPI(api); 
    else
      return api;
  }
  LoadSwaggerFromAPI(api: any): any {
    if(api.hasError){
      console.error("error in swagger", api.name);
      return api;
    }
    this.swaggerData.push(api);
    for (var i = 0; i < api.GenerateBlocks.length; i++) {
      var e = api.GenerateBlocks[i];
      if(Blockly.getMainWorkspace() == null){
        console.log('#38 here in loadSwagger from api is not ok',Blockly.getMainWorkspace());
      }
      e(Blockly.Blocks, BlocklyJavaScript, this.demoWorkspace);
    }
    for (var i = 0; i < api.GenerateFunctions.length; i++) {
      var e = api.GenerateFunctions[i];
      var image = function (opKey: string) {
        var image = `assets/httpImages/${opKey}.png`;
        return new Blockly.FieldImage(image, 90, 20, opKey);
      };
     
      e(Blockly.Blocks, BlocklyJavaScript);
    }
    api.metaBlocks()(Blockly.Blocks, BlocklyJavaScript);
    return api;
  }

  StartRegister(): void {
    // var swaggersUrl= await firstValueFrom( this.loadDemo.getSwaggerLinks());
    // swaggersUrl.forEach(async (it) => {
    //   swaggersDict.set(it.id, await this.LoadSwaggerFromUrl(it.link, it.id));
    // });

    // SwaggerParser
    // .parseSwagger
    // .parseSwagger('https://microservicesportchooser.azurewebsites.net/swagger/v1/swagger.json')
    // .then(function(api: any) {
    //   console.log(api[0]);
    //   api[0](Blockly.Blocks,BlocklyJavaScript);
    //   api[1](Blockly.Blocks,BlocklyJavaScript);

    //   // console.log(api[1](Blockly.Blocks,BlocklyJavaScript));
    // });
    //hidden='true'
    var newSwaggerCategories = [...Array(50).keys()].map((it) =>
      this.CategorySwaggerHidden(it)
    ).join('');
    //this.loadDemo.getDemoBlocks().subscribe(
    
    // );
    var customCategs=this.DetailsApp.customCategories;

    var blocks = [
      this.bs.defaultBlocks.fieldXML(),
      ` 
        <category name='Blockly Advanced'>
        <category id="Audio" name="Audio">
        ${this.bs.ttsBlock.fieldXML()}
        ${this.bs.pianoBlock.fieldXML()}
        </category>  
            ${this.bs.filterBlocks.fieldXML()}
                
                ${this.bs.auth0Blocks.fieldXML()}
                <category id="catConverters"  name="Converters">
                ${this.bs.convertersBlocks.fieldXML()}
              </category>    
              <category id="catDates"  name="Dates">
          ${this.bs.currentDateBlock.fieldXML()}
          ${this.bs.dateFromTextBlock.fieldXML()}
          ${this.bs.waitBlocks1.fieldXML()}
          ${this.bs.waitBlocks2.fieldXML()}
        </category>
        <category id="catEmail"  name="Email">
        ${this.bs.emailBlocks.fieldXML()}
      </category>

        <category id="catExporter"  name="Exporter">
        ${this.bs.exportFileBlock.fieldXML()}
      </category>
              <category id="catGUI" name="GUI">
              ${this.bs.guiBlocks.fieldXML()}
              ${this.bs.chartBlock.fieldXML()}
              </category>
              <category id="catHTML" name="HTML">
              <category name="GenHTML" id="Generate">
              ${this.bs.htmlblocks.fieldXML()}
              </category>
              <category name="Parser" id="parseHTML">
              ${this.bs.HTMLParserBlocks.fieldXML()}
              </category>
              </category>
              <category name="Objects" id="objects">
              ${this.bs.propBlocks.fieldXML()}
              ${this.bs.createObjectBlocks.fieldXML()}
              
              </category>
              <category id="XHR" name="Request">
            ${this.bs.xhrBlocks.fieldXML()}
            ${this.bs.windowsCreds.fieldXML()}
            </category>
        `,
      `<category id="catTimers"  name="Timers">
          ${this.bs.waitBlocks1.fieldXML()}
          ${this.bs.waitBlocks2.fieldXML()}
        </category>`,
      `  <category id="programming" name="Programming">
        ${this.bs.trycatchFinBlock.fieldXML()}
        ${this.bs.commentBlock.fieldXML()}
          </category>
        
      `,
      `</category>
      ${customCategs}
      
      <category name="Swagger" id="catSwagger" expanded='false' >          
          ${newSwaggerCategories}
        </category> 
       
        `,
    ];
    this.initialize(blocks);

    this.bs.filterBlocks.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    this.bs.waitBlocks2.definitionBlocks(
      Blockly.defineBlocksWithJsonArray,
      BlocklyJavaScript
    );
    
    this.bs.xhrBlocks.definitionBlocks(
      Blockly.Blocks,
      BlocklyJavaScript
    );
    this.bs.propBlocks.definitionBlocks(
      Blockly.Blocks,
      BlocklyJavaScript
    );
    this.bs.guiBlocks.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    this.bs.convertersBlocks.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    this.bs.exportFileBlock.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    this.bs.createObjectBlocks.definitionBlocks(
      Blockly.Blocks,
      BlocklyJavaScript,
      Blockly.Extensions,
      Blockly.Mutator
      
    );
    this.bs.currentDateBlock.definitionBlocks(
      Blockly.Blocks,
      BlocklyJavaScript
    );

    this.bs.dateFromTextBlock.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
     this.bs.waitBlocks1.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    this.bs.commentBlock.definitionBlocks(
      Blockly.Blocks,
      BlocklyJavaScript
    );
    this.bs.trycatchFinBlock.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);  
    this.bs.auth0Blocks.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    this.bs.windowsCreds.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    this.bs.chartBlock.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);

      this.bs.emailBlocks.definitionBlocks(
        Blockly.Blocks,
        BlocklyJavaScript
      );
      this.bs.htmlblocks.definitionBlocks(
        Blockly.Blocks,
        BlocklyJavaScript
      );
      this.bs.HTMLParserBlocks.definitionBlocks(
        Blockly.Blocks,
        BlocklyJavaScript
      );
        // console.log('z',window.speechSynthesis.getVoices());
      this.bs.ttsBlock.definitionBlocks(Blockly.Blocks,BlocklyJavaScript);
      this.bs.pianoBlock.definitionBlocks(Blockly.Blocks,BlocklyJavaScript);

    var swaggersUrl = this.DetailsApp.swaggersDict;
    var swaggersDict: Map<string, any> = new Map<string, any>();    
    swaggersUrl.forEach((it, key) => {
      var show = !it.hasError;
      //special condition for local api
      console.log("show swagger: "+ key +":"+show);
      if(show)
        swaggersDict.set(key, this.LoadSwaggerFromAPI(it));
    });
  

    if(this.DetailsApp.LocalAPI?.WasAlive){
      this.LoadSwaggerFromUrl(this.DetailsApp.LocalAPI.urL+"swagger/v1/swagger.json","LocalAutomation");
    }
    window.setTimeout(this.afterTimeout, 2000, this);

    // console.log('x',this.bs.windowsCreds.fieldXML());
  }
  showInner: string = '';
  showXMLCode: string = '';
  showJSCode: string = '';
  showBlocksDefinition: string=''

  SaveBlocks() {
    this.bh2.saveState(Blockly.Xml, this.demoWorkspace, this.myId);
  }
  public ShowBlocksDefinition(): boolean{
    return this.showCodeAndXML === ShowCodeAndXML.ShowBlocksDefinition;
  }
  public ShowSelection():string{
    return ShowCodeAndXML[this.showCodeAndXML];
  }
  public ShowSomething():boolean{
    return this.showCodeAndXML !== ShowCodeAndXML.ShowNone;
  }
  public ShowOutput():boolean {
    return (this.showCodeAndXML === ShowCodeAndXML.ShowOutput) ;
  }
  public ShowCode():boolean{
    return (this.showCodeAndXML === ShowCodeAndXML.ShowCode) ;
  }
  public ShowXML():boolean{
    return (this.showCodeAndXML === ShowCodeAndXML.ShowXML) ;
  }
  private CalculateXMLAndCode():void{
    var xml = Blockly.Xml.workspaceToDom(this.demoWorkspace!, true);
    var xml_text = Blockly.Xml.domToPrettyText(xml);
    // this.showInner = `
    //         ${this.run.latestCode}
    //         ========
    //         ${xml_text}
    //         ========
           
    //         `;
    this.showJSCode = this.run.latestCode;
    this.showXMLCode = xml_text;
    var blocks= this.parseTextForBlocks(xml_text);
    this.showBlocksDefinition = blocks
        .map(it=>
          {
            
            try{
              
              var blocks=`Blockly.Blocks['${it}']={ init: \n` + ((Blockly.Blocks[it] as any)['init']).toString() + '};';
              var js = `Blockly.JavaScript['${it}']=` +  ((BlocklyJavaScript as any)[it]).toString()+';';
              return blocks + '\n' + js;
                //console.log('x'+it,(Blockly.Blocks[it] as any)['init']());
            }
            catch(e){
              console.error('parse definition : '+it,e);
              return '//Error for '+it;
            }
          })
        .join('\n');
  }
  private parseTextForBlocks(xml_text:string):string[]{
    var ret=[];1
    if(xml_text.indexOf('<block type="')>=0){
      var blocks=xml_text.split('<block type="');
      for(var i=1;i<blocks.length;i++){
        var block=blocks[i].split('"')[0];
        ret.push(block);
      }
    }
    return ret;
  }
  ShowInnerWorkings() {
    if (this.demoWorkspace == null) {
      window.alert('demoWorkspace is null');
      return;
    }
    this.showCodeAndXML++;
    var item=this.ShowSelection();
    if(!item){ 
      this.showCodeAndXML=ShowCodeAndXML.ShowNone;
      setTimeout((d: Blockly.WorkspaceSvg) => {
        Blockly.svgResize(d);        
      }, 1000, this.demoWorkspace);
    }
    this.CalculateXMLAndCode();
    //outputArea.value += latestCode;
    // Blockly.svgResize(this.demoWorkspace);
  }
  Download(): void {
    //todo: use vex as for others - electron compatibility
    var name = window.prompt('Name?', 'blocks.txt');
    if (name == null) return;
    this.bh2.DownloadBlocks(Blockly.Xml, this.demoWorkspace, name);
  }
  changeListener($event: any): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    var self = this;
    myReader.onloadend = function (e) {
      // you can perform an action with readed data here
      //console.log(myReader.result);
      self.bh2.LoadFile(Blockly.Xml, self.demoWorkspace, myReader.result);
      self.run.resetInterpreter();
    };
    myReader.readAsText(file);
  }
  private CategorySwaggerHidden(id: Number): string {
    return `<category name='swagger_hidden_${id}' hidden='true' >${id}</category>`;
  }
  public SaveToLocalAPI():void{
    if((this.DetailsApp?.LocalAPI?.WasAlive||false) == false){
      this.LoadLocalAPI();
      window.alert("local api it is not yet loaded - please try again after loading");
      return;
    }
    var xml = Blockly.Xml.workspaceToDom(this.demoWorkspace!, true);
    var xml_text = Blockly.Xml.domToPrettyText(xml);    
    var db= new DemoBlocks();
    var name=window.prompt("name of the blocks?");
    if(name == null)
      return;
    db.id = name;
    db.blocks="";
    db.categories="";
    db.description="";
    this.DetailsApp.LocalAPI?.SaveBlock(db,xml_text).subscribe(
      it=>{
        console.log("number blocks",it);
        window.alert("saved !")
      }
    );
   
  }
  public LoadLocalAPI():any{
    // console.log('x_',self);
    var self=this;
    return self.DetailsApp.LocalAPI?.IsAlive()?.pipe(
        catchError((err)=>{
          window.alert(`cannot load ${self.DetailsApp.LocalAPI?.urL}`)
          throw err;
        })
      )
      .subscribe((it)=>{
      if(!it){
        if(!window.confirm('LocalAPI is not alive.\n Do you want to downlod and run ?'))
          return;

          self.DetailsApp.LocalAPI!.download();
      }
    var swaggerUrl=self.DetailsApp.LocalAPI?.urL||'';
    swaggerUrl+="swagger/v1/swagger.json";
    //window.alert(swaggerUrl);

    //self.loadedCompletely=false;
    self.LoadSwaggerFromUrl(swaggerUrl).then((api) => {
        // this.afterTimeout(this);
        if(api.hasError)
        window.alert("error loading local api");
      else{
        api.name= "LocalAPI";
        self.addToToolboxSwagger(api,this);      
        // self.loadedCompletely=true;
        window.alert("loaded successfully");
      }
    });  
  });
    }
  public toolboxXML: string = '';
  private initialize(defaultBlocks: string[]) {
    const blocklyDiv = document.getElementById('blocklyDiv'+this.myId);
    if (blocklyDiv == null) {
      window.alert('blocklyDiv is null');
      return;
    }
    var blocks = defaultBlocks.map((it) => `<sep></sep>${it}`);
    this.toolboxXML = `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox-simple" style="display: none">    
    ${blocks}
    </xml>`;
    // console.log(toolboxXML);
    this.demoWorkspace = Blockly.inject(blocklyDiv, {
      readOnly: false,
      media: 'media/',
      trashcan: true,
      // renderer:'thrasos',
      // theme: "highcontrast",
      horizontalLayout:	false,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true,
      },
      zoom:
         {controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
          pinch: true},
      toolbox: this.toolboxXML,
    } as Blockly.BlocklyOptions);
    // this.demoWorkspace.registerButtonCallback("LoadLocalAPI",()=>this.LoadLocalAPI(this));
    const contentHighlight = new ContentHighlight(this.demoWorkspace);
    contentHighlight.init();
    var self = this;
    if ((this.DetailsApp.settings?.startBlocks?.length || 0) > 0) {
      try {
        var xmlBlocks = (this.DetailsApp.settings?.startBlocks || []).join(
          '\n'
        );
        var xml = Blockly.Xml.textToDom(xmlBlocks);
        Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, this.demoWorkspace);
      } catch (e) {
        console.error('error when load default blocks', e);
      }
    }

    // console.log(BlocklyJavaScript);
    this.bh = new InterpreterBA(this.demoWorkspace, BlocklyJavaScript);
    this.run =  this.bh;
    var self = this;
    this.demoWorkspace.addChangeListener(function (evt: any) {
      if (!evt.isUiEvent) {
        self.run.resetInterpreter();
        self.run.generateCodeAndLoadIntoInterpreter();
        //self.ShowInnerWorkings();
        self.CalculateXMLAndCode();
      }
    });
  }
  public restoreBlocks() {
    this.bh2.restoreState(Blockly.Xml, this.demoWorkspace,this.myId);
  }
  public addToToolboxSwagger(item:any,myComponent: DisplayBlocklyComponent){
    
    var newCateg = item
    .findCategSwaggerFromPaths()
    .sort()
    .map(
      (it: any) =>
        `<category name='${it}' custom='func_${item.name}_${it}'></category>`
    )
    .join('\n');
  var nameExistingCategorySwagger =
    myComponent?.CategorySwaggerHidden(myComponent?.swaggerLoaded) || '';
var xmlToolbox=  myComponent.toolboxXML;
// console.log('a',xmlToolbox);
var replaceCategory=`<category name='${item.name}'>
<category name='API' id='func_${item.name}'>
${newCateg}
</category>
${item.categSwagger()}

<category name='meta' id='meta_${item.name}'>
<block type='meta_swagger_controllers_${item.name}'></block>
<block type='meta_swagger_controllers_actions_${item.name}'></block>
</category>

</category>
`;
// console.log('x',replaceCategory)
xmlToolbox= xmlToolbox.replace(nameExistingCategorySwagger,replaceCategory);  
// console.log('x',xmlToolbox)

  myComponent.swaggerLoaded++;
  // console.log(item.name);
  myComponent.toolboxXML =xmlToolbox;
  var toolbox = myComponent?.demoWorkspace?.updateToolbox(xmlToolbox);

  //myComponent?.swaggerData?.forEach((item: any) => 
  {
    if (myComponent?.demoWorkspace == null) return;

    
    var nameCat = 'objects_' + item.nameCategSwagger();
    var nameAPI = 'AllApi_' + item.nameCategSwagger();
    var cache=item;
    myComponent.demoWorkspace.registerToolboxCategoryCallback(
      nameCat,
      (d: Blockly.Workspace) => {
        return myComponent.registerSwaggerBlocksObjects(d, cache);
      }
    );
    myComponent.demoWorkspace.registerToolboxCategoryCallback(
      nameAPI,
      (d: Blockly.Workspace) => {
        return myComponent.registerSwaggerBlocksAPIAll(d, cache);
      }
    );

    item.findCategSwaggerFromPaths().forEach((it: any) => {
      myComponent?.demoWorkspace?.registerToolboxCategoryCallback(
        `func_${item.name}_${it}`,
        (d: Blockly.Workspace) => {
          return myComponent.registerSwaggerBlocksAPIControllers(
            d,
            item,
            it
          );
        }
      );
    });
  }
}
  
loadedCompletely: boolean = false;
  afterTimeout(myComponent: DisplayBlocklyComponent) {
    // console.log('start register');
    myComponent.loadedCompletely=true;
    if (myComponent?.swaggerData == null) return;
    var nr = myComponent.swaggerData.length;
    myComponent.toolboxXML= myComponent.toolboxXML.replace('Swagger', `Swagger(${nr})`);

    myComponent.swaggerData.forEach((item: any) => {
      //  console.log('a_item', item);
      var cache=item;      
      myComponent.addToToolboxSwagger(cache,myComponent);
    });

    if (myComponent?.mustLoadDemoBlock != null)
      myComponent.ShowDemo(myComponent?.mustLoadDemoBlock);
    else {
      //from default
      if ((myComponent.DetailsApp.settings?.startBlocks?.length || 0) > 0) {
        try {
          var xml_text = (
            myComponent.DetailsApp.settings?.startBlocks || []
          ).join('\n');
          //<xml xmlns="https://developers.google.com/blockly/xml"></xml>
          if (xml_text?.length > 62) {
            var xml = Blockly.Xml.textToDom(xml_text);
            Blockly.Xml.clearWorkspaceAndLoadFromXml(
              xml,
              myComponent.demoWorkspace!
            );
          }
        } catch (e) {
          console.log('error when load default blocks', e);
        }
      }
      //from browser cache
      myComponent.restoreBlocks();
    }
  }
}
