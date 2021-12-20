import { TourSteps } from "./TourSteps";


export class Settings {
    public title: string = '';
    public footer: string = '';
    public static version: string = '2021.12.20.947';
    public startBlocks: string[] = [];
    public tourSteps: TourSteps[] = [];
    public latestVersion: string = '';
    public localAPI: string = '';
}
