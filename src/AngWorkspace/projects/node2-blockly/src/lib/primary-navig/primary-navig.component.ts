import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoadShowUsageService } from "projects/node2-blockly/src/lib/load-show-usage.service";
import { DemoBlocks } from "projects/node2-blockly/src/lib/DemoBlocks";
import { AppDetails } from 'projects/node2-blockly/src/lib/AppDetails';
import { Settings } from "projects/node2-blockly/src/lib/Settings";
import { TransmitAction } from 'projects/node2-blockly/src/lib/TransmitAction';
import { DockerData } from 'projects/docker-extension/src/public-api';

@Component({
  selector: 'app-primary-navig',
  templateUrl: './primary-navig.component.html',
  styleUrls: ['./primary-navig.component.css']
})
export class PrimaryNavigComponent implements OnInit {

  demoBlocks: DemoBlocks[]=[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches || true ),
      shareReplay()
    );
    public version:string=Settings.version;
    public latestVersion:string|undefined='';
    public title:string = "Blockly Automation";
    public footer:string = '';
    public standalone:boolean=false;
    public d: DockerData=new DockerData();
    public hideMenu:boolean = false;
  constructor(private breakpointObserver: BreakpointObserver, private details: AppDetails, private ta :TransmitAction) {}
  ngOnInit(): void {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if(prefersDarkScheme.matches){    
       document.body.classList.toggle('dark-theme');
      };
      this.latestVersion = this.details.settings?.latestVersion;
      this.hideMenu=this.details.settings?.hideMenu??false;
      this.demoBlocks =this.details.demoBlocks.sort((a, b) => a.description.localeCompare(b.description));
      this.title=this.details?.settings?.title ||'Blockly Automation';
      this.footer = this.details?.settings?.footer || '';
      
      if ((navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches) {
        this.standalone=true; 
      }
  }
  executeOnDisplayBlockly(func: string){
    this.ta.sendDataToServer('DisplayBlocklyComponent',func);
  }
}
