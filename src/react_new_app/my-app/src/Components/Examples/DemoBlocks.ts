import { Observable , map} from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";


type BlockSource = "None" | "Demos" | "Download" | "LocalAPI" | "Cloud";

class DemoBlocks {
  constructor(data: Partial<DemoBlocks> = {}) {
    Object.assign(this, data);
    
    }
  
  public id: string = "";
  public description: string = "";
  public categories: string = "";
  public blocks: string = "";
  public Source: BlockSource = "None";


  public static getDemoBlocks(): Observable<DemoBlocks[]> {
    var dt = new Date().toISOString();
    //process.env.REACT_APP_URL is giving undefined
    console.log(process.env);    
    const baseUrl=process.env.PUBLIC_URL+'/'; 
    
    return ajax
      .get<DemoBlocks[]>(baseUrl+ `assets/showUsage/demoBlocks/all.txt?${dt}`, {responseType: "text" as "text",})
      .pipe(
        map((res: AjaxResponse<DemoBlocks[]>)=> res.response),
        map((data: DemoBlocks[]) => data.map(it=>new DemoBlocks(it))),
        // tap((it: DemoBlocks[]) =>console.log('obtaining all blocks demos',it)),
        
        // tap((it:string)=> console.log('obtaining all blocks demos',it)),
        // map(data=>JSON.stringify(data)),
        // map((data: string) => {                    
        //   var d: DemoBlocks[] = JSON.parse(data) ;
        //   d = d.map((it) => new DemoBlocks(it));
        //   return d;
        // })
      );
  }

  public getDemoBlock(id:string): Observable<string> {
    console.log('getDemoBlock');
    const baseUrl=process.env.PUBLIC_URL+'/'; 
    var dt=new Date().toISOString();
    var q= ajax({ method: 'GET', url:baseUrl+`assets/showUsage/demoBlocks/${id}.txt?${dt}` ,async: false})      
    .pipe(
      // tap((res: any) =>console.log(`obtaining ${id} `,res)),
      map((res: any)=> res.response)
      
    );
    return q;
    // return of("andrei");
    
  }
}

export default DemoBlocks;