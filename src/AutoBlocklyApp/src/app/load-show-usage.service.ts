import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DemoBlocks } from './DemoBlocks';
import { LinksSwagger } from './LinksSwagger';

@Injectable({
  providedIn: 'root'
})  
export class LoadShowUsageService {

  constructor(private http: HttpClient) { }

  public getDemoBlocks(): Observable<DemoBlocks[]> {
    var dt=new Date().toISOString();
    return this.http.get<string>(`assets/showUsage/demoBlocks/all.txt?${dt}`,{ responseType: 'text' as 'json'})
    .pipe(

      map((res: any) => {
          var r=res;
          // console.log(r);
          var d:DemoBlocks[]=JSON.parse(res);
          return d;
    })
    )
    ;
  }

  public getSwaggerLinks(): Observable<LinksSwagger[]> {
    var dt=new Date().toISOString();
    return this.http.get<string>(`assets/loadAtStartup/swaggers.json?${dt}`,{ responseType: 'text' as 'json'})
    .pipe(

      map((res: any) => {
          var r=res;
          // console.log(r);
          var d:LinksSwagger[]=JSON.parse(res);
          return d;
    })
    )
    ;
  }

  public getDemoBlock(id:string): Observable<string> {

    var dt=new Date().toISOString();
    var q= this.http.get
      (`assets/showUsage/demoBlocks/${id}.txt?${dt}`, {responseType: 'text'})
    .pipe(
      tap((res: any) => {
        // console.log(res);
      }),
        map((res: any) => {
        return res.toString();
      })
    );
    return q;
    return of("andrei");
    
  }



}
