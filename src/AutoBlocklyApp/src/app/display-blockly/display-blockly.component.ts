import {
  AfterViewInit,
  Component,
  OnInit,
  ɵɵsetComponentScope,
} from '@angular/core';
import * as Blockly from 'blockly';
import * as BlocklyJavaScript from 'blockly/javascript';
import * as acorn from 'acorn';
import * as bs from '@blockly/blocklyscripts';
import * as bh from '@blockly/blocklyhelpers';
import { TabulatorHelper } from './tabulator';
import { LoadShowUsageService } from '../load-show-usage.service';
import { DemoBlocks } from '../DemoBlocks';
import * as SwaggerParser from '@blockly/blocklyswagger';
// import { firstValueFrom } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
declare var Interpreter: any;
import { IntroJs } from 'intro.js';
import * as introJs from 'intro.js';
import { AppDetails } from '../AppDetails';
import { TourSteps } from '../TourSteps';
import { TransmitAction } from '../TransmitAction';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { Chart , registerables } from 'chart.js';
import Chart from 'chart.js/auto';
import { fromEvent } from 'rxjs';
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


  //monaco settings
  editorXMLOptions = {theme: 'vs-dark', language: 'xml'};
  editorJSOptions = {theme: 'vs-dark', language: 'javascript', lineNumbers: 'on'};
  editorPlain = {theme: 'vs-dark', language: 'plaintext', lineNumbers: 'on'};
  
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
  public showCodeAndXML: ShowCodeAndXML = ShowCodeAndXML.ShowNone;
  public swaggerLoaded: number = 0;
  public demoWorkspace: Blockly.WorkspaceSvg | null = null;
  public run: any;
  public demos: DemoBlocks[] = [];
  public demosCategories: Map<string, DemoBlocks[]> = new Map<
    string,
    DemoBlocks[]
  >();
  public mustLoadDemoBlock: string = '';
  // private directLinkDemo:string='';
  private intro: IntroJs = introJs();
  static id:number=0;
  myId:number=0;
  constructor(
    private tabulator: TabulatorHelper,
    private settings: AppDetails,
    private loadDemo: LoadShowUsageService,
    private ar: ActivatedRoute,
    private ta :TransmitAction,
    private snackBar: MatSnackBar
  ) {

    this.myId=++DisplayBlocklyComponent.id;
//    console.log('x_',this.myId);
    
    //console.log(bs.filterBlocks.definitionBlocks());
    this.ar.paramMap.subscribe((params: any) => {
      this.mustLoadDemoBlock = params.get('demoblock');
    });
    this. InitiateDemos();
    this.ta.receiveData().subscribe(it=>{
      if(it[0]=='DisplayBlocklyComponent'){
        ((this as any)[it[1]] as any)();
      }
    });
  }
  InitiateDemos(){
    var data: DemoBlocks[] = this.settings.demoBlocks;
    
    this.demos = data.sort((a, b) =>
      a.description.localeCompare(b.description)
    );

    
      var categories = data
        .map((it) => it.categories)
        .filter((it) => it?.length > 0)
        .flatMap((it) => it.split(';'))
        .filter((it) => it?.length > 0);
      this.demosCategories.set('All', this.demos);
      categories.forEach((element) => {
        this.demosCategories.set(
          element,
          data
            .filter((it) => it.categories?.length > 0)
            .filter(
              (it) =>
                (';' + it.categories + ';').indexOf(';' + element + ';') > -1
            )
        );
      });
    
  }
  createIntro() {
    
    var title: string = this.settings.settings?.title || '';
    var steps = this.settings.settings?.tourSteps.map((it: TourSteps) => {
      return {
        title: title,
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
    var el=this.theHtmlOutput();
    el.innerHTML = '';
    this.fullHtmlData='';

    el=this.theTextOutput();
    el.innerText = '';

    
  }
  ShowText(data: any){
    if(data == null)
      return;
    var dt= data.toString();
    var el=this.theTextOutput();
    el.innerText += dt;
  }
  fullHtmlData:string='';
  finishHTMLOutput(){
    this.theHtmlOutput().innerHTML = this.fullHtmlData;
  }
  ShowHTML(data: any) {
    if(data == null)
      return;
    var dt= data.toString();
    this.fullHtmlData+=dt;
    var el=this.theHtmlOutput();
    el.innerHTML += dt;
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
    this.run = bh.interpreterHelper.createInterpreter(
      this.demoWorkspace,
      BlocklyJavaScript
    );
    this.clearOutput();
    this.showCodeAndXML = ShowCodeAndXML.ShowOutput;
    this.showInner = '{ "step_start": "start program",';
    
    console.log('x',code);
    console.log('y',jsCode);
    if(code !=  jsCode){
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
        self.tabulator.AddDataToGrid(data);
        self.ShowChart(data);
        self.ShowHTML(data);
        self.ShowText(data);
      },
      () => {
        this.snackBar.open('Program end', 'Done!', {
          duration: 3000
        });
        self.showInner += `\n "step_end" : "program executed; see results below"\n}`;
        this.tabulator.FinishGrid();
        this.finishHTMLOutput();
      },
      code
    );
  }
  public ShowDemo(id: string) {
    this.mustLoadDemoBlock = id;
    this.loadDemo.getDemoBlock(id).subscribe((data) => {
      var xml = Blockly.Xml.textToDom(data);
      if (this.demoWorkspace != null) {
        Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, this.demoWorkspace);

        window.alert('please press run code button');
      }
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
  }
  ngAfterViewInit(): void {
    this.StartRegister();
    //this.createIntro();
    fromEvent(window, 'TabDownload').subscribe(it=>this.tabulator.copyCSV());
    fromEvent(window, 'TabCopy').subscribe(it=>this.tabulator.copyClip());
  }
  public LoadSwagger() {
    var json = window.prompt(
      'Swagger url? ',
      'https://swagger-tax-calc-api.herokuapp.com/api-docs'
    );
    if (!json) return;
    if (json.endsWith('.html') || json.endsWith('.htm')) {
      window.alert('Swagger should end with .json - see source of html page');
      return;
    }
    this.LoadSwaggerFromUrl(json).then((it) => {
      // this.afterTimeout(this);
      this.addToToolboxSwagger(it,this);
      window.alert('done');
    });
  }
  private async LoadSwaggerFromUrl(url: string, name?: string): Promise<any> {
    var parser = new SwaggerParser.parseData(url);
    var api = await parser.ParseSwagger();

    api.name = name || url;
    this.swaggerData.push(api);
    for (var i = 0; i < api.GenerateBlocks.length; i++) {
      var e = api.GenerateBlocks[i];
      e(Blockly.Blocks, BlocklyJavaScript, (arr: any[][]) => {
        return new Blockly.FieldDropdown(arr);
      });
    }
    for (var i = 0; i < api.GenerateFunctions.length; i++) {
      var e = api.GenerateFunctions[i];
      var image = function (opKey: string) {
        var image = `assets/httpImages/${opKey}.png`;
        return new Blockly.FieldImage(image, 90, 20, opKey);
      };
      e(Blockly.Blocks, BlocklyJavaScript, image,(arr: any[][]) => {
        return new Blockly.FieldDropdown(arr);
      });
    }
    api.metaBlocks()(Blockly.Blocks, BlocklyJavaScript);
    return api;
  }

  async StartRegister(): Promise<void> {
    // var swaggersUrl= await firstValueFrom( this.loadDemo.getSwaggerLinks());
    var swaggersUrl = this.settings.links;
    var swaggersDict: Map<string, any> = new Map<string, any>();
    swaggersUrl.forEach(async (it) => {
      swaggersDict.set(it.id, await this.LoadSwaggerFromUrl(it.link, it.id));
    });

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
    const gridElement = document.getElementById('steps'+this.myId);
    if (gridElement == null) {
      window.alert('gridElement is null');
      return;
    }
    this.tabulator.initGrid(gridElement);

    bs.filterBlocks.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    bs.waitBlocks.definitionBlocks(
      Blockly.defineBlocksWithJsonArray,
      BlocklyJavaScript
    );
    bs.xhrBlocks.definitionBlocks(
      Blockly.Blocks,
      BlocklyJavaScript,
      function (arr: any[][]) {
        return new Blockly.FieldDropdown(arr);
      }
    );
    bs.propBlocks.definitionBlocks(
      Blockly.Blocks,
      BlocklyJavaScript,
      function (arr: any) {
        return new Blockly.FieldLabelSerializable(arr);
      }
    );
    bs.guiBlocks.definitionBlocks(Blockly.Blocks, BlocklyJavaScript, (s:string)=> new Blockly.FieldLabelSerializable(s));
    bs.convertersBlocks.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    bs.exportFileBlock.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    bs.createObjectBlocks.definitionBlocks(
      Blockly.Blocks,
      BlocklyJavaScript,
      Blockly.Extensions,
      (item: string) => {
        return new Blockly.FieldTextInput(item);
      },
      ()=>{
        return Blockly.Mutator;
      }
    );
    bs.currentDateBlock.definitionBlocks(
      Blockly.Blocks,
      BlocklyJavaScript,
      function (arr: any[][]) {
        return new Blockly.FieldDropdown(arr);
      }
    );

    bs.dateFromTextBlock.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    bs.waitBlocks.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    bs.commentBlock.definitionBlocks(
      Blockly.Blocks,
      BlocklyJavaScript,
      (item: string) => {
        return new Blockly.FieldLabelSerializable(item);
      }
    );
    bs.trycatchFinBlock.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);  
    bs.auth0Blocks.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    bs.windowsCreds.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    bs.chartBlock.definitionBlocks(Blockly.Blocks, BlocklyJavaScript,       
      function (arr: any[][]) {
        return new Blockly.FieldDropdown(arr);
      },
      (item: string) => {
        return new Blockly.FieldLabelSerializable(item);
      });

      bs.emailBlocks.definitionBlocks(
        Blockly.Blocks,
        BlocklyJavaScript,
        function (arr: any[][]) {
          return new Blockly.FieldDropdown(arr);
        }
      );
      bs.htmlblocks.definitionBlocks(
        Blockly.Blocks,
        BlocklyJavaScript,
        function (arr: any[][]) {
          return new Blockly.FieldDropdown(arr);
        }
      );
    var blocks = [
      bs.defaultBlocks.generalBlocks(),
      `    
        <category name='Blockly Advanced'>
                ${bs.filterBlocks.fieldXML()}
                
                ${bs.auth0Blocks.fieldXML()}
                <category id="catConverters"  name="Converters">
                ${bs.convertersBlocks.fieldXML()}
              </category>    
              <category id="catDates"  name="Dates">
          ${bs.currentDateBlock.fieldXML()}
          ${bs.dateFromTextBlock.fieldXML()}
          ${bs.waitBlocks.fieldXML()}
        </category>
        <category id="catEmail"  name="Email">
        ${bs.emailBlocks.fieldXML()}
      </category>

        <category id="catExporter"  name="Exporter">
        ${bs.exportFileBlock.fieldXML()}
      </category>
              <category id="catGUI" name="GUI">
              ${bs.guiBlocks.fieldXML()}
              ${bs.chartBlock.fieldXML()}
              </category>
              <category id="catHTML" name="HTML">
              ${bs.htmlblocks.fieldXML()}
              </category>
              <category name="Objects" id="objects">
              ${bs.propBlocks.fieldXML()}
              ${bs.createObjectBlocks.fieldXML()}
              </category>
              <category id="XHR" name="Request">
            ${bs.xhrBlocks.fieldXML()}
            ${bs.windowsCreds.fieldXML()}
            </category>
        `,
      `<category id="catTimers"  name="Timers">
          ${bs.waitBlocks.fieldXML()}
        </category>`,
      `  <category id="programming" name="Programming">
        ${bs.trycatchFinBlock.fieldXML()}
        ${bs.commentBlock.fieldXML()}
          </category>
        
      `,
      `</category>
      <category name="Swagger" id="catSwagger" expanded='true' >          
          ${newSwaggerCategories}
        </category> 
        
        `,
    ];
    this.initialize(blocks);
    // console.log('x',bs.windowsCreds.fieldXML());
  }
  showInner: string = '';
  showXMLCode: string = '';
  showJSCode: string = '';
  showBlocksDefinition: string=''

  SaveBlocks() {
    bh.saveBlocksUrl.saveState(Blockly.Xml, this.demoWorkspace, this.myId);
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
    }
    this.CalculateXMLAndCode();
    //outputArea.value += latestCode;
    // Blockly.svgResize(this.demoWorkspace);
  }
  Download(): void {
    var name = window.prompt('Name?', 'blocks.txt');
    if (name == null) return;
    bh.saveLoad.DownloadBlocks(Blockly.Xml, this.demoWorkspace, name);
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
      bh.saveLoad.LoadFile(Blockly.Xml, self.demoWorkspace, myReader.result);
      self.run.resetInterpreter();
    };
    myReader.readAsText(file);
  }
  private CategorySwaggerHidden(id: Number): string {
    return `<category name='swagger_hidden_${id}' hidden='true' >${id}</category>`;
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
    
    
    var self = this;
    if ((this.settings.settings?.startBlocks?.length || 0) > 0) {
      try {
        var xmlBlocks = (this.settings.settings?.startBlocks || []).join(
          '\n'
        );
        var xml = Blockly.Xml.textToDom(xmlBlocks);
        Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, this.demoWorkspace);
      } catch (e) {
        console.error('error when load default blocks', e);
      }
    }
    window.setTimeout(self.afterTimeout, 2000, this, );

    // console.log(BlocklyJavaScript);
    this.run = bh.interpreterHelper.createInterpreter(
      this.demoWorkspace,
      BlocklyJavaScript
    );
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
    bh.saveBlocksUrl.restoreState(Blockly.Xml, this.demoWorkspace,this.myId);
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
  

  afterTimeout(myComponent: DisplayBlocklyComponent) {
    // console.log('start register');

    if (myComponent?.swaggerData == null) return;
    var nr = myComponent.swaggerData.length;
    myComponent.toolboxXML= myComponent.toolboxXML.replace('Swagger', `Swagger(${nr})`);

    myComponent.swaggerData.forEach((item: any) => {
      // console.log('a_item', item);
      var cache=item;      
      myComponent.addToToolboxSwagger(cache,myComponent);
    });

    if (myComponent?.mustLoadDemoBlock != null)
      myComponent.ShowDemo(myComponent?.mustLoadDemoBlock);
    else {
      //from default
      if ((myComponent.settings.settings?.startBlocks?.length || 0) > 0) {
        try {
          var xml_text = (
            myComponent.settings.settings?.startBlocks || []
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
