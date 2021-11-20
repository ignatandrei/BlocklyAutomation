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
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
declare var Interpreter: any;
import { IntroJs } from 'intro.js';
import * as introJs from 'intro.js';
import { AppDetails } from '../AppDetails';
import { TourSteps } from '../TourSteps';

@Component({
  selector: 'app-display-blockly',
  templateUrl: './display-blockly.component.html',
  styleUrls: ['./display-blockly.component.css'],
})
export class DisplayBlocklyComponent implements OnInit {
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
  constructor(
    private tabulator: TabulatorHelper,
    private settings: AppDetails,
    private loadDemo: LoadShowUsageService,
    private ar: ActivatedRoute
  ) {
    //console.log(bs.filterBlocks.definitionBlocks());
    this.ar.paramMap.subscribe((params: any) => {
      this.mustLoadDemoBlock = params.get('demoblock');
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
  }

  step: number = 0;
  RunCode() {
    var self = this;
    var f = (latestCode: string, initApi: any) => {
      try {
        return new Interpreter(this.run.latestCode, initApi);
      } catch (e) {
        self.ShowInnerWorkings();
        window.alert(
          'please copy the left output and report there is an error at ' +
            JSON.stringify(e)
        );
      }
    };
    this.run = bh.interpreterHelper.createInterpreter(
      this.demoWorkspace,
      BlocklyJavaScript
    );
    this.clearOutput();
    this.showInner = 'start program';
    var self = this;
    this.run.runCode(
      f,
      (data: any) => {
        self.step++;
        self.showInner += `\n ${self.step} : ${data}`;
        // console.log(`obtained ${data}`);
        this.tabulator.AddDataToGrid(data);
      },
      () => {
        self.showInner += `\n program executed`;
        this.tabulator.FinishGrid();
      }
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
    var urls = item.operations.filter((it: any) => it.controller == controller);
    // console.log(controller,urls, item.fieldXMLFunctions);

    xmlList = item.fieldXMLFunctions
      .filter((it: any) => {
        if (it.id == '') return true;
        var val = it.id + '/';
        var existInfields = false;
        urls.forEach((url: any) => {
          if (val.startsWith(url.id)) existInfields = true;
        });
        return existInfields;
      })
      .map((it: any) => Blockly.Xml.textToDom(it.gui));
    return xmlList;
  }
  public registerSwaggerBlocksAPI(
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
    this.StartRegister();
    this.createIntro();
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
      e(Blockly.Blocks, BlocklyJavaScript, image);
    }
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
    var data: DemoBlocks[] = this.settings.demoBlocks;
    {
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
    // );
    const gridElement = document.getElementById('steps');
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
    bs.guiBlocks.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    bs.convertersBlocks.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    bs.exportFileBlock.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    bs.createObjectBlocks.definitionBlocks(
      Blockly.Blocks,
      BlocklyJavaScript,
      Blockly.Extensions,
      (item: string) => {
        return new Blockly.FieldTextInput(item);
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

    bs.auth0Blocks.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    bs.windowsCreds.definitionBlocks(Blockly.Blocks, BlocklyJavaScript);
    var blocks = [
      bs.defaultBlocks.generalBlocks(),
      `    
        <category name='Blockly Advanced'>
            ${bs.filterBlocks.fieldXML()}
            <category id="XHR" name="Request">
            ${bs.xhrBlocks.fieldXML()}
            ${bs.windowsCreds.fieldXML()}
            </category>
            ${bs.propBlocks.fieldXML()}
            <category id="catGUI" name="GUI">
            ${bs.guiBlocks.fieldXML()}
            </category>
        `,
      `<category id="catTimers"  name="Timers">
          ${bs.waitBlocks.fieldXML()}
        </category>`,
      `<category id="catConverters"  name="Converters">
          ${bs.convertersBlocks.fieldXML()}
        </category>`,
      `<category id="catExporter"  name="Exporter">
          ${bs.exportFileBlock.fieldXML()}
        </category>`,

      `<category id="catDates"  name="Dates">
          ${bs.currentDateBlock.fieldXML()}
          ${bs.dateFromTextBlock.fieldXML()}
          ${bs.waitBlocks.fieldXML()}
        </category>`,
      `${bs.commentBlock.fieldXML()}`,
      `${bs.createObjectBlocks.fieldXML()}`,
      `${bs.auth0Blocks.fieldXML()}`,
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
  SaveBlocks() {
    bh.saveBlocksUrl.saveState(Blockly.Xml, this.demoWorkspace);
  }
  ShowInnerWorkings() {
    if (this.demoWorkspace == null) {
      window.alert('demoWorkspace is null');
      return;
    }
    var xml = Blockly.Xml.workspaceToDom(this.demoWorkspace, true);
    var xml_text = Blockly.Xml.domToPrettyText(xml);
    this.showInner = `
            ${this.run.latestCode}
            ========
            ${xml_text}
            ========
           
            `;
    //outputArea.value += latestCode;
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
    const blocklyDiv = document.getElementById('blocklyDiv');
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
      move: {
        scrollbars: true,
        drag: true,
        wheel: true,
      },
      toolbox: this.toolboxXML,
    } as Blockly.BlocklyOptions);
    var self = this;
    if ((this.settings.settings?.defaultBlocks?.length || 0) > 0) {
      try {
        var xmlBlocks = (this.settings.settings?.defaultBlocks || []).join(
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
        self.ShowInnerWorkings();
      }
    });
  }
  public restoreBlocks() {
    bh.saveBlocksUrl.restoreState(Blockly.Xml, this.demoWorkspace);
  }
  public addToToolboxSwagger(item:any,myComponent: DisplayBlocklyComponent){

    var newCateg = item
    .findCategSwaggerFromPaths()
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
    var nameAPI = 'api_' + item.nameCategSwagger();

    myComponent.demoWorkspace.registerToolboxCategoryCallback(
      nameCat,
      (d: Blockly.Workspace) => {
        return myComponent.registerSwaggerBlocksObjects(d, item);
      }
    );
    myComponent.demoWorkspace.registerToolboxCategoryCallback(
      nameAPI,
      (d: Blockly.Workspace) => {
        return myComponent.registerSwaggerBlocksAPI(d, item);
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
      myComponent.addToToolboxSwagger(item,myComponent);
    });

    if (myComponent?.mustLoadDemoBlock != null)
      myComponent.ShowDemo(myComponent?.mustLoadDemoBlock);
    else {
      //from default
      if ((myComponent.settings.settings?.defaultBlocks?.length || 0) > 0) {
        try {
          var xml_text = (
            myComponent.settings.settings?.defaultBlocks || []
          ).join('\n');
          //<xml xmlns="https://developers.google.com/blockly/xml"></xml>
          if (xml_text.length > 62) {
            var xml = Blockly.Xml.textToDom(xml_text);
            Blockly.Xml.clearWorkspaceAndLoadFromXml(
              xml,
              myComponent.demoWorkspace!
            );
          }
        } catch (e) {
          console.error('error when load default blocks', e);
        }
      }
      //from browser cache
      myComponent.restoreBlocks();
    }
  }
}
