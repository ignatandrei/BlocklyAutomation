import { Observable, map } from "rxjs";
import { ajax} from "rxjs/ajax";
import { DetectFramework } from "../AppFiles/detectGlobal";

export default class CustomCategories {

    public getCustomCategories(): Observable<string> {
   
        const baseUrl=new DetectFramework().baseUrl()+'/'; 
        var dt=new Date().toISOString();
        var q= ajax({ method: 'GET', url:baseUrl+`assets/loadAtStartup/customCategories.txt?${dt}` ,async: false})      
        .pipe(
          // tap((res: any) =>console.log(`obtaining ${id} `,res)),
          map((res: any)=> res.response)
          
        );
        return q;
       
      }
    
}
