import { Observable , map} from "rxjs";
import { ajax } from "rxjs/ajax";


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
    const baseUrl=process.env.REACT_APP_URL+'/'; 
    
    return ajax
      .get<string>(baseUrl+ `assets/showUsage/demoBlocks/all.txt?${dt}`, {
        responseType: "text" as "json",
      })
      .pipe(
        map((res: any) => {
          var d: DemoBlocks[] = JSON.parse(res);
          d = d.map((it) => new DemoBlocks(it));
          return d;
        })
      );
  }
}

export default DemoBlocks;