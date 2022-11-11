import { map, Observable } from "rxjs";
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
}
