import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

export class LocalAPI{
    constructor(private urL:string, private http: HttpClient){

    }
    public WasAlive: boolean = false;

    public IsAlive(): Observable<boolean> {
        var self=this;
        this.WasAlive = false;
        var dt=new Date().toISOString();
        return this.http.get<string>(this.urL + `api/v1.0/Management/CurrentDate?${dt}`,{ responseType: 'text' as 'json'})
            .pipe(
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
}