import { Observable, map } from "rxjs";
import { ajax} from "rxjs/ajax";

export default class CustomCategories {

    public getCustomCategories(): Observable<string> {
   
        const baseUrl=process.env.PUBLIC_URL+'/'; 
        var dt=new Date().toISOString();
        var q= ajax({ method: 'GET', url:baseUrl+`assets/loadAtStartup/customCategories.txt?${dt}` ,async: false})      
        .pipe(
          // tap((res: any) =>console.log(`obtaining ${id} `,res)),
          map((res: any)=> res.response)
          
        );
        return q;
       
      }
    
}
