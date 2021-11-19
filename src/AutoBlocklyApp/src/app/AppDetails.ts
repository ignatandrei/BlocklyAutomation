import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, map, Observable, of, switchMap, tap, zip, zipAll } from "rxjs";
import { DemoBlocks } from "./DemoBlocks";
import { LinksSwagger } from "./LinksSwagger";
import { LoadShowUsageService } from "./load-show-usage.service";

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
            switchMap(() => "")

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

export class Settings{
    public title:string='';
    public defaultBlocks:string[]=[];
    
}