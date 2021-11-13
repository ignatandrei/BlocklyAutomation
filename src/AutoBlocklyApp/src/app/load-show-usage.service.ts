import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
export class DemoBlocks{
  public id:string='';
  public description:string="";

}

@Injectable({
  providedIn: 'root'
})  
export class LoadShowUsageService {

  constructor(private http: HttpClient) { }

  public getDemoBlocks(): Observable<DemoBlocks[]> {
  
    return this.http.get<string>("/assets/showUsage/demoBlocks/_all.json",{ responseType: 'text' as 'json'})
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

  public getDemoBlock(id:string): Observable<string> {

    
    var q= this.http.get
      (`/assets/showUsage/demoBlocks/${id}.txt`, {responseType: 'text'})
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
