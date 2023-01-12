import { Observable, map, tap, from, forkJoin, switchMap } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import BlocklyReturnSwagger from "../../BlocklyReusable/BlocklyReturnSwagger";
import { LinksSwagger } from "../../BlocklyReusable/LinkSwagger";

export default class ExistingSwagger {
  constructor(data: Partial<ExistingSwagger> = {}) {
    Object.assign(this, data);
  }
  public  getSwagger(): Observable<BlocklyReturnSwagger[]> {
    var dt = new Date().toISOString();
    //process.env.REACT_APP_URL is giving undefined
    console.log(process.env);
    const baseUrl = process.env.PUBLIC_URL + "/";

    return ajax
      .get<LinksSwagger[]>(baseUrl + `assets/loadAtStartup/swaggers.json?${dt}`, {
        responseType: "text" as "text",
      })
      .pipe(
        map((res: AjaxResponse<LinksSwagger[]>) => res.response),

        map((data: LinksSwagger[]) => data.filter(it=>it.enabled).map((it) => new LinksSwagger(it))),
        // tap((it: LinksSwagger[]) =>
        //   console.log("obtaining all blocks demos", it);
        // ) ,
        //
        
        switchMap((it) => 
        {
          return this.obtainSwaggers(it);
          
        })
       

        // tap((it:string)=> console.log('obtaining all blocks demos',it)),
        // map(data=>JSON.stringify(data)),
        // map((data: string) => {
        //   var d: DemoBlocks[] = JSON.parse(data) ;
        //   d = d.map((it) => new DemoBlocks(it));
        //   return d;
        // })
      );
  }
  //public swaggersDict: Map<string, any> = new Map<string, any>();
  obtainSwaggers(l :LinksSwagger[] ): Observable<BlocklyReturnSwagger[]> {
    var self=this;
    var allSwaggers= l.map(link => self.LoadSwaggersFromUrl(link));
    var arr= forkJoin(allSwaggers);
    return arr;
  }
  LoadSwaggersFromUrl(l:LinksSwagger): Observable<any> {
    var cacheUrl = l.link;
    var name= l.id || l.link;
    const baseUrl=process.env.PUBLIC_URL+'/'; 
    var parser = new BlocklyReturnSwagger(cacheUrl,baseUrl);
    var api= from(parser.ParseSwagger() as Promise<any>)
      .pipe(
      tap((it:any)=>{
        // console.log('swagger loaded:' +cacheUrl, it);
        it.name = name;
        //this.swaggersDict.set(cacheUrl, it);
      }
      ,(err:any)=>{
        console.error('swagger error:' +cacheUrl, err);
      }
      )      
      );
    ;

    return api;

}
}
