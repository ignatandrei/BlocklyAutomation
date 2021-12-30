import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";


@Injectable()
export class TransmitAction {
    private sendData: Subject<[string,string]>=  new Subject<[string,string]>();
    receiveData(): Observable<[string,string]> {
        return this.sendData.asObservable();
    }

    sendDataToServer(toComponent: string, func:string) {
        let tuple :[string,string]=[toComponent,func];

        this.sendData.next(tuple);
    }
}
