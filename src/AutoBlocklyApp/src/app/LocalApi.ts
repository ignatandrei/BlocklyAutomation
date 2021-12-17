import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

export class LocalAPI{
    constructor(private urL:string, private http: HttpClient){

    }

    public IsAlive(): Observable<boolean> {
        var dt=new Date().toISOString();
        return this.http.get<string>(this.urL + `/api/v1.0/CurrentDate?${dt}`,{ responseType: 'text' as 'json'})
            .pipe(
                map(res => {
                    if(res){
                        var dt=Date.parse(res);
                        console.log(dt);
                        return true;
                    }
                    return false;
                }),
            )
        ;


    }
}