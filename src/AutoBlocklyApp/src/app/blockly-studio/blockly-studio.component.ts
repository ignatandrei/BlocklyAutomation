import { Component, OnInit ,AfterViewInit, Type, Injector, ComponentFactoryResolver, ComponentRef, ViewContainerRef, ViewChild, ViewChildren, QueryList} from '@angular/core';
import { DisplayBlocklyComponent } from '../display-blockly/display-blockly.component';

@Component({
  selector: 'app-blockly-studio',
  templateUrl: './blockly-studio.component.html',
  styleUrls: ['./blockly-studio.component.css']
})
export class BlocklyStudioComponent implements OnInit,AfterViewInit {

  data:number[]=[];
  

  @ViewChildren('vcr', { read: ViewContainerRef }) components?:QueryList<ViewContainerRef>;
  nrTabs: number=3;
  numbers:number[]=[];

  constructor(public fooInjector: Injector, private resolver: ComponentFactoryResolver) { 
    this.numbers = Array(this.nrTabs).fill(1).map((x,i)=>i); // [0,1,2,3,4]
  }
  changeSelected(index:number){
    if(this.data.filter(it=>it == index).length>0)
      return;
    this.data.push(index);
    this.loadBar(index).then(()=>{
      console.log('loaded'+ index);
    });
  }
  ngAfterViewInit(): void {
    this.data.push(0);
    this.loadBar(0).then(()=>{
      console.log('loaded');
    });
    
  }
  async loadBar(index:number) {
    try{     
     
      const b = await import(`../display-blockly/display-blockly.component`);
      const factory = this.resolver.resolveComponentFactory(b.DisplayBlocklyComponent);
      var vcr=this.components?.get(index);
      
      if(vcr != null)
        ( vcr.createComponent(factory));
    
    }
    catch(e){
      console.error("loading"+index,e);
    }
  }
  ngOnInit(): void {

  }

}
