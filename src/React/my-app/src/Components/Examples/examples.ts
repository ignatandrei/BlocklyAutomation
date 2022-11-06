import { Subject } from 'rxjs';
import { SaveLocation } from '../GUI/SaveLocation';

export const enum RunCodeData{
    Start=0,
    Stop=1
}
const subjectID = new Subject<string>();
const subjectSave = new Subject<SaveLocation>();
const subjectRun = new Subject<RunCodeData>();

export const LoadIDService = {
    sendID: (message:string) => subjectID.next(message ),
    getID: () => subjectID.asObservable()
};

export const MustSave= {
    sendMessage: (message:SaveLocation) => subjectSave.next(message),
    getMessage: () => subjectSave.asObservable()
};
export const RunCode= {
    sendMessage: (message:RunCodeData) => subjectRun.next(message),
    getMessage: () => subjectRun.asObservable()
};
