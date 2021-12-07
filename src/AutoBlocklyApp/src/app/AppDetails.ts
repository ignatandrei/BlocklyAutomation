import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {   forkJoin, from, merge, Observable, of, zip} from "rxjs";
import { delay, map,  tap ,switchMap,zipAll, switchMapTo} from 'rxjs/operators';
import { DemoBlocks } from "./DemoBlocks";
import { LinksSwagger } from "./LinksSwagger";
import { LoadShowUsageService } from "./load-show-usage.service";
import { Settings } from "./Settings";
import * as SwaggerParser from '@blockly/blocklyswagger';

@Injectable()
export class AppDetails {
  constructor(private http: HttpClient, private loadShowUsageService:LoadShowUsageService) {
    this.Init();
  
  }
  public settings:Settings|null= null;
  public linksSwagger:LinksSwagger[]=[];
  public demoBlocks:DemoBlocks[]=[];
  Init(): Observable<string> {

    return zip(
        this.getSettings(), this.loadShowUsageService.getSwaggerLinks(), this.loadShowUsageService.getDemoBlocks()
    
        )

        .pipe(
            delay(2000),
            tap(([settings, links, demoBlocks]) => {                
                this.settings = settings;
                this.linksSwagger = links;
                this.demoBlocks = demoBlocks;
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

    var allSwaggers= l.map(link => this.LoadSwaggersFromUrl(link.link));
    var arr= forkJoin(allSwaggers);
    return arr;
  }
LoadSwaggersFromUrl(url:string): Observable<any> {
    var cacheUrl = url;
    var parser = new SwaggerParser.parseData(url);
    var api= from(parser.ParseSwagger() as Promise<any>)
      .pipe(tap((it:any)=>{
        console.log('swagger loaded:' +cacheUrl, it);
      }
      ,(err:any)=>{
        console.error('swagger error:' +cacheUrl, err);
      }
      )      
      );
    ;

    return api;

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


