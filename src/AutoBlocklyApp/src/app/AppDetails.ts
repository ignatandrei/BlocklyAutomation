import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {   Observable, of, zip} from "rxjs";
import { delay, map,  tap ,switchMap,zipAll} from 'rxjs/operators';
import { DemoBlocks } from "./DemoBlocks";
import { LinksSwagger } from "./LinksSwagger";
import { LoadShowUsageService } from "./load-show-usage.service";
import { Settings } from "./Settings";

@Injectable()
export class AppDetails {
  constructor(private http: HttpClient, private loadShowUsageService:LoadShowUsageService ) {
  }
  public settings:Settings|null= null;
  public links:LinksSwagger[]=[];
  public demoBlocks:DemoBlocks[]=[];
  Init(): Observable<string> {

    return zip(
        this.getSettings(), this.loadShowUsageService.getSwaggerLinks(), this.loadShowUsageService.getDemoBlocks()
    
        )

        .pipe(
            delay(2000),
            tap(([settings, links, demoBlocks]) => {                
                this.settings = settings;
                this.links = links;
                this.demoBlocks = demoBlocks;
            })
            ,
            switchMap(() => of(""))

        );
            
            
            
    
     
    

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

