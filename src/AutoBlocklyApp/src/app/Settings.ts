import { TourSteps } from "./TourSteps";


export class Settings {
    public title: string = '';
    public footer: string = '';
    public static version: string = '2021.12.16.400';
    public startBlocks: string[] = [];
    public tourSteps: TourSteps[] = [];
    public latestVersion: string = '';
}
