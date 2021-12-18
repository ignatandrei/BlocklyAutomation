import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { DemoBlocks } from "./DemoBlocks";

export class LocalAPI{
    constructor(public urL:string, private http: HttpClient){

    }
    public WasAlive: boolean = false;

    public IsAlive(): Observable<boolean> {
        var self=this;
        this.WasAlive = false;
        var dt=new Date().toISOString();
        return this.http.get<string>(this.urL + `api/v1/Management/CurrentDate?${dt}`,{ responseType: 'text' as 'json'})
            .pipe(
                catchError((err)=> of(false.toString())),
                map(res => {
                    if(res){
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