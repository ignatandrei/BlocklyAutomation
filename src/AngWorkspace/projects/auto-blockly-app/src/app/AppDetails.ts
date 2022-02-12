import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {   forkJoin, from, merge, Observable, of, zip} from "rxjs";
import { delay, map,  tap ,switchMap,zipAll, switchMapTo, catchError} from 'rxjs/operators';
import { DemoBlocks } from "projects/node2-blockly/src/lib/DemoBlocks";
import { LinksSwagger } from "projects/node2-blockly/src/lib/LinksSwagger";
import { LoadShowUsageService } from "./load-show-usage.service";
import { Settings } from "./Settings";
import { BlocklyReturnSwagger } from "projects/blockly-swagger/src/public-api";
import { LocalAPI } from "./LocalApi";


@Injectable()
export class AppDetails {
  constructor(private http: HttpClient, private loadShowUsageService:LoadShowUsageService) {
    this.Init();
  
  }
  public settings:Settings|null= null;
  public linksSwagger:LinksSwagger[]=[];
  public demoBlocks:DemoBlocks[]=[];
  public swaggersDict: Map<string, any> = new Map<string, any>();
  public customCategories: string='';
  public LocalAPI: LocalAPI| null=null;
  public CreateLocalApis( http : HttpClient , url: string): LocalAPI {
    return new LocalAPI(url, http); 
  }

  Init(): Observable<string> {

    return zip(
        this.getSettings(), 
        this.loadShowUsageService.getSwaggerLinks(), 
        this.loadShowUsageService.getDemoBlocks(),
        this.loadShowUsageService.getCustomCategories(),
        this.getLatestVersion()
    
        )

        .pipe(
            delay(1000),
            tap(([settings, links, demoBlocks, categs, lv]) => {                
                this.settings = settings;
                this.settings.latestVersion=lv;
                this.linksSwagger = links;
                this.demoBlocks = demoBlocks.map(it=>{
                  var n= new DemoBlocks(it);
                  n.Source = "Demos";
                  return n;
                });
                
                this.customCategories = categs;
                this.LocalAPI= this.CreateLocalApis(this.http, this.settings.localAPI);
                //console.log('settings loaded', this.customCategories);
                this.LocalAPI.IsAlive().subscribe(it=>
                  {
                    console.log('LocalAPI is alive', it);
                  })
            })
            ,
            switchMap(() => 
            {
              return this.obtainSwaggers(this.linksSwagger);
              
            })
            ,
            switchMap(() => of(""))

        );
        
  }
  obtainSwaggers(l :LinksSwagger[] ): Observable<LinksSwagger[]> {

    var allSwaggers= l.map(link => this.LoadSwaggersFromUrl(link));
    var arr= forkJoin(allSwaggers);
    return arr;
  }
LoadSwaggersFromUrl(l:LinksSwagger): Observable<any> {
    var cacheUrl = l.link;
    var name= l.id || l.link;
    var parser = new BlocklyReturnSwagger(cacheUrl);
    var api= from(parser.ParseSwagger() as Promise<any>)
      .pipe(tap((it:any)=>{
        console.log('swagger loaded:' +cacheUrl, it);
        it.name = name;
        this.swaggersDict.set(cacheUrl, it);
      }
      ,(err:any)=>{
        console.error('swagger error:' +cacheUrl, err);
      }
      )      
      );
    ;

    return api;

}
getLatestVersion(): Observable<string> {
  //var dt=new Date().toISOString();  
  return this.http.get<string>(`https://ignatandrei.github.io/BlocklyAutomation/version.txt`,{ responseType: 'text' as 'json'})
    .pipe(
      
    catchError(err => {
      console.error('error getting latest version', err);
      return of('v'+"cannot get latest version");
    }
      )
      ,
      map((res: any) => {
          return res.toString().trim().substr(1);//remove first char v
      }
    )
    )  
}
getSettings(): Observable<Settings> {
    var dt=new Date().toISOString();
    return this.http.get<string>(`assets/settings.json?${dt}`,{ responseType: 'text' as 'json'})
    .pipe(

      map((res: any) => {
          
          var data:Settings= JSON.parse(res);
          return data;
    })
    )
    ;
  }

}


