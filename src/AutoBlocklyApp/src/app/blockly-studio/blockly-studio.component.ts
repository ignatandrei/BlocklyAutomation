import { Component, OnInit ,AfterViewInit, Type, Injector, ComponentFactoryResolver, ComponentRef, ViewContainerRef, ViewChild} from '@angular/core';
import { DisplayBlocklyComponent } from '../display-blockly/display-blockly.component';

@Component({
  selector: 'app-blockly-studio',
  templateUrl: './blockly-studio.component.html',
  styleUrls: ['./blockly-studio.component.css']
})
export class BlocklyStudioComponent implements OnInit,AfterViewInit {

  data:Type<DisplayBlocklyComponent>[]=[];
  barRef: ComponentRef<DisplayBlocklyComponent>[]=[];
  @ViewChild('vcr0', { read: ViewContainerRef }) vcr0?: ViewContainerRef ;
  @ViewChild('vcr1', { read: ViewContainerRef }) vcr1?: ViewContainerRef ;
  constructor(public fooInjector: Injector, private resolver: ComponentFactoryResolver) { 
    import('../display-blockly/display-blockly.component').then(
      it=> {
        this.data.push(it.DisplayBlocklyComponent);
      });

  }
  changeSelected(index:number){
    this.loadBar(index).then(()=>{
      console.log('loaded'+ index);
    });
  }
  ngAfterViewInit(): void {
    this.loadBar(0).then(()=>{
      console.log('loaded');
    });
    
  }
  async loadBar(index:number) {
    try{
    //if (index == this.data.length) 
    {
      const b = await import(`../display-blockly/display-blockly.component`);
      const factory = this.resolver.resolveComponentFactory(b.DisplayBlocklyComponent);
      switch(index){
        case 0:
          this.barRef.push( this.vcr0!.createComponent(factory));
          break;
        case 1:
          this.barRef.push( this.vcr1!.createComponent(factory));
          break;

      }
      
    }
    }
    catch(e){
      console.error("loading"+index,e);
    }
  }
  ngOnInit(): void {

  }

}
