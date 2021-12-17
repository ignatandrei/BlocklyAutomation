import { HttpClient } from "@angular/common/http";
import { LocalAPI } from "./LocalApi";
import { TourSteps } from "./TourSteps";


export class Settings {
    public title: string = '';
    public footer: string = '';
    public static version: string = '2021.12.17.13';
    public startBlocks: string[] = [];
    public tourSteps: TourSteps[] = [];
    public latestVersion: string = '';
    public localAPI: string = '';

    public CreateLocalApis(http : HttpClient ): LocalAPI {
        return new LocalAPI(this.localAPI, http);
    }
}
