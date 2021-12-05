import { Component, OnInit ,AfterViewInit, Type, Injector, ComponentFactoryResolver, ComponentRef, ViewContainerRef, ViewChild, ViewChildren, QueryList} from '@angular/core';
import { DisplayBlocklyComponent } from '../display-blockly/display-blockly.component';

@Component({
  selector: 'app-blockly-studio',
  templateUrl: './blockly-studio.component.html',
  styleUrls: ['./blockly-studio.component.css']
})
export class BlocklyStudioComponent implements OnInit,AfterViewInit {

  data:number[]=[];
  selectedTabIndex:number=0;

  @ViewChildren('vcr', { read: ViewContainerRef }) components?:QueryList<ViewContainerRef>;
 
  numbers:number[]=[0];

  constructor(public fooInjector: Injector, private resolver: ComponentFactoryResolver) { 
    
  }
  addTab(){
    console.log('x',this.selectedTabIndex);
    this.numbers.push(this.numbers.length);
    console.log('y',this.numbers.length-1);
    this.selectedTabIndex=this.numbers.length-1;
  }
  changeSelected(index:number){
    if(this.data.filter(it=>it == index).length>0)
      return;
    this.data.push(index);
    this.loadBar(index).then((it)=>{
      console.log('loaded'+ it);
    });
  }
  ngAfterViewInit(): void {
    this.data.push(0);
    this.loadBar(0).then((it)=>{
      console.log('loaded tab' +it);
    });
    
  }
  async loadBar(index:number): Promise<number> {
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
    return index;
  }
  ngOnInit(): void {

  }

}
