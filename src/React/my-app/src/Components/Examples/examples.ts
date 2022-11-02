import { Subject } from 'rxjs';

const subject = new Subject();

export const LoadIDService = {
    sendID: (message:string) => subject.next({ id: message }),
    getID: () => subject.asObservable()
};