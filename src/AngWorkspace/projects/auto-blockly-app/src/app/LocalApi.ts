import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { DemoBlocks } from "./DemoBlocks";

export class LocalAPI{
    constructor(public urL:string, private http: HttpClient){

    }
    public WasAlive: boolean = false;
    public download(){
        window.location.href='https://github.com/ignatandrei/BlocklyAutomation/releases/latest/download/releaseLocalAPI.zip';
    }
    public IsAlive(): Observable<boolean> {
        this.WasAlive = false;
        var self=this;        
        var dt=new Date().toISOString();
        return this.http.get<string>(this.urL + `api/v1/Management/CurrentDate?${dt}`,{ responseType: 'text' as 'json'})
            .pipe(
                catchError((err)=> of('')),
                map(res => {
                    if(res?.length>0){
                        var dt=Date.parse(res);
                        //console.log(dt);
                        self.WasAlive = true;
                        return true;
                    }
                    return false;
                }
                ),
            )
        ;
    }
    public LoadBlockContent(id: string): Observable<string>{
        var dt=new Date().toISOString();
        return this.http.post<string>(this.urL + `api/v1/BASave/GetBlocksContent`,{id:id},{responseType:'text'as 'json'})
        .pipe(
            map(it=>it?.toString())
        );

    }
    public LoadBlocks():Observable<DemoBlocks[]>{
        var dt=new Date().toISOString();
        return this.http.post<DemoBlocks[]>(this.urL + `api/v1/BASave/GetBlocks`,null)
        .pipe(
            map(it=>{
                var q= it.map(d=>{
                    var n=new DemoBlocks(d);
                    n.Source= "LocalAPI";
                    return n;
                });
                return q;
            })
        )
        
    }

    public SaveBlock(db:DemoBlocks, content: string):Observable<number>{
        
        return this.http.post<string>(this.urL + 'api/v1/BASave/SaveNewBlock',{b: db,content:content},{ responseType: 'text' as 'json'})
        .pipe(map(res=>Number.parseInt(res?.toString(),10)));

        
    }
}