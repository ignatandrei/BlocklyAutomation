import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoadShowUsageService } from '../load-show-usage.service';
import { DemoBlocks } from '../DemoBlocks';
import { AppDetails } from '../AppDetails';
import { Settings } from '../Settings';
import { TransmitAction } from '../TransmitAction';

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

  constructor(private breakpointObserver: BreakpointObserver, private details: AppDetails, private ta :TransmitAction) {}
  ngOnInit(): void {
      this.latestVersion = this.details.settings?.latestVersion;
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
