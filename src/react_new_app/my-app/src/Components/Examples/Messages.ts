import { Subject } from 'rxjs';
import { SaveLocation } from '../GUI/SaveLocation';
import ShowCodeAndXML from '../GUI/ShowCodeAndXML';

export const enum RunCodeData{
    Start=0,
    Stop=1,
    UserRequestedPrint,
    CodeError
    
}

export interface RunCodeMessage{
    runCodeData: RunCodeData ;
    message?: any;
    messageType? : 'string'|'class' ;

}
const subjectID = new Subject<string>();
const subjectSave = new Subject<SaveLocation>();
const subjectRun = new Subject<RunCodeMessage>();
const subjectShow=new Subject<ShowCodeAndXML>();
const subjectInnerWorking=new Subject<string>();

export const LoadIDService = {
    sendID: (message:string) => subjectID.next(message ),
    getID: () => subjectID.asObservable()
};

export const MustSave= {
    sendMessage: (message:SaveLocation) => subjectSave.next(message),
    getMessage: () => subjectSave.asObservable()
};
export const RunCode= {
    sendMessage: (message:RunCodeMessage) => subjectRun.next(message),
    sendSimpleMessage: (message:string) => subjectRun.next({runCodeData: RunCodeData.UserRequestedPrint, message:message, messageType:'string' }),
    getMessage: () => subjectRun.asObservable()
};


export const ShowData= {
    sendMessage: (message:ShowCodeAndXML) => subjectShow.next(message),
    getMessage: () => subjectShow.asObservable()
};

export const InnerWorkings = {
    sendMessage: (message:string) => subjectInnerWorking.next(message),
    getMessage: () => subjectInnerWorking.asObservable()

}