import { Subject } from 'rxjs';
import { SaveLocation } from '../GUI/SaveLocation';

const subject = new Subject();
const subjectSave = new Subject<SaveLocation>();

export const LoadIDService = {
    sendID: (message:string) => subject.next({ id: message }),
    getID: () => subject.asObservable()
};

export const MustSave= {
    sendMessage: (message:SaveLocation) => subjectSave.next(message),
    getMessage: () => subjectSave.asObservable()
};
