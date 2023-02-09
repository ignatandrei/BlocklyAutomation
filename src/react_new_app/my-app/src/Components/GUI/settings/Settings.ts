import { map, Observable,  tap, } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { TourSteps } from "./TourSteps";


export class SettingsBA {
    public title: string = '';
    public footer: string = '';
    public static version: string = '2021.12.30.1600';
    public startBlocks: string[] = [];
    public tourSteps: TourSteps[] = [];
    public latestVersion: string = '';
    public localAPI: string = '';
    public hideMenu:boolean=false;


    getSettings(): Observable<SettingsBA> {
        const baseUrl=process.env.PUBLIC_URL+'/'; 
        var dt=new Date().toISOString();
        return ajax.get<SettingsBA>(baseUrl+ `assets/settings.json?${dt}`,{ responseType: 'text' as 'text'})
        .pipe(
            map((res: AjaxResponse<SettingsBA>)=> res.response),
        );
      }
    getVersion():Observable<string>{
        const baseUrl=process.env.PUBLIC_URL+'/'; 
        var dt=new Date().toISOString();
        // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        
        return ajax({method: 'GET', url:baseUrl+ `version.txt?${dt}` ,async: false})          
        .pipe(
            tap((res: any) =>console.log(`obtaining version `,res)),
            map((res: any)=> res.response)
        );
        //return of("andrei");
    }
}
