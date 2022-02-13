import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { combineLatest, map, of, startWith } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AppDetails } from '../AppDetails';
import { DemoBlocks } from '../DemoBlocks';

@Component({
  selector: 'app-find-saved-blocks',
  templateUrl: './find-saved-blocks.component.html',
  styleUrls: ['./find-saved-blocks.component.css']
})
export class FindSavedBlocksComponent implements OnInit {

  public BlocksLocal: DemoBlocks[] = [];
  public demos: DemoBlocks[] = [];
  public demosCategories: Map<string, DemoBlocks[]> = new Map<
    string,
    DemoBlocks[]
  >();

  public demosBlocks:Map<string,DemoBlocks[]>= new Map<string,DemoBlocks[]>();

  constructor(public dialogRef: MatDialogRef<FindSavedBlocksComponent >,public DetailsApp: AppDetails) { 
    this.InitiateDemos();
    this.loadFromLocalAPI();
  }
  public loadFromLocalAPI(){
    if(this.DetailsApp.LocalAPI?.WasAlive){
      this.DetailsApp.LocalAPI?.LoadBlocks().subscribe(
        it=>{
            this.BlocksLocal=it;
        }
      )
    }
  }
  public Verify(){
    this.DetailsApp.LocalAPI?.IsAlive().subscribe(it=>{
      if(it){
        this.loadFromLocalAPI();
      }
    })
  }
  InitiateDemos(){
    var data: DemoBlocks[] = this.DetailsApp.demoBlocks;
    
    this.demos = data.sort((a, b) =>
      a.description.localeCompare(b.description)
    );

    
      this.optionsCategories = [...new Set(data
        .map((it) => it.categories)
        .filter((it) => it?.length > 0)
        .flatMap((it) => it.split(';'))
        .filter((it) => it?.length > 0)
        .sort((a, b) => a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())) 
      )];
        

        
      


      this.optionsBlocks=[...new Set(data
      .map((it) => it.blocks)
      .filter((it) => it?.length > 0)
      .flatMap((it) => it.split(';'))
      .filter((it) => it?.length > 0)
      .sort((a,b)=>a.toLowerCase().localeCompare(b.toLowerCase()))
      )];
      ;
      
      this.filteredOptionsBlocks = this.myBlocks.valueChanges.pipe(
        startWith(''),
        map(value =>{
          var val = (value as string || '').trim();
          return this._filter(val, this.optionsBlocks);
          
        } ),
      );
      this.filteredOptionsCategories= this.myCategories.valueChanges.pipe(
        startWith(''),
        map(value =>{
          var val = (value as string || '').trim();
          return this._filter(val, this.optionsCategories);
          
        } ),
      );
      // console.log('x',this.demos);
      this.demosArray= combineLatest([
        this.myBlocks.valueChanges.pipe(startWith(''))
        ,this.myCategories.valueChanges.pipe(startWith(''))
        ,this.mySearchText.valueChanges.pipe(startWith(''))
      ])
      .pipe(
        startWith(this.demos),
        map(([block,category, searchText])=>{
          if(Array.isArray(block) || typeof block === 'object')
            block='';
          if(Array.isArray(category) || typeof category === 'object')
            category='';
            if(Array.isArray(searchText ) || typeof searchText === 'object')
              searchText ='';

            block=(block||'').trim().toLowerCase();
            category=(category||'').trim().toLowerCase();
            searchText = searchText?.trim().toLowerCase()||'';
            // console.log('search for ',block,category);
            var ret= this.demos.filter(it=>{
             return (block.length==0 ||  it.blocks?.toLowerCase().indexOf(block)>-1) 
                &&
              (category.length==0 ||  it.categories?.toLowerCase().indexOf(category)>-1)
                && 
              (searchText.length==0 
                || it.description?.toLowerCase().indexOf(searchText)>-1
                || it.blocks?.toLowerCase().indexOf(searchText)>-1
                || it.categories?.toLowerCase().indexOf(searchText)>-1
                || it.id?.toLowerCase().indexOf(searchText)>-1
                )
            });
            // console.log('ret',ret);
            return ret;
        })
      );
  }

  demosArray:Observable<DemoBlocks[]>| null=null;

  myBlocks = new FormControl();
  optionsBlocks: string[] = [];
  filteredOptionsBlocks: Observable<string[]> | null = null;


  myCategories = new FormControl();
  mySearchText=new FormControl();
  optionsCategories: string[] = [];
  filteredOptionsCategories: Observable<string[]> | null = null;

  ngOnInit() {
    
  }

  private _filter(value: string, arrToFilter:string[]): string[] {
    const filterValue = value.toLowerCase();
    if(filterValue.length == 0){
      return arrToFilter;
    }
    
    return arrToFilter.filter(option => option.toLowerCase().includes(filterValue));
  }  
  public chooseDemo(demo: DemoBlocks){
    return this.dialogRef.close(demo);
  }

  public Close(){
    this.dialogRef.close();
  }
}
