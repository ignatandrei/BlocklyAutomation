import { State } from 'blockly/core/serialization/blocks';
import { Subject } from 'rxjs';
import { SaveLocation } from '../GUI/SaveLocation';
import { TourSteps } from '../GUI/settings/TourSteps';
import ShowCodeAndXML from '../GUI/ShowCodeAndXML';

export const enum RunCodeData{
    Start=0,
    Stop=1,
    UserRequestedPrint,
    CodeError
    
}
export interface errorMessage{
    errorMessage:string;
    currentBlockId:string;
    currrentBlock: State | null;
}

export interface RunCodeMessage{
    runCodeData: RunCodeData ;
    message?: errorMessage | string | any;
    messageType? : 'string'|'class' ;

}
export interface EndTextBlock{
    dateStart: Date;
    dateEnd: Date;
    id: string;
    typeBlock: string;
}
const subjectID = new Subject<string>();
const subjectSave = new Subject<SaveLocation>();
const subjectRun = new Subject<RunCodeMessage>();
const subjectShow=new Subject<ShowCodeAndXML>();
const subjectInnerWorking=new Subject<string>();
const subjectTourSteps=new Subject<TourSteps[]>();
const subjectEndTextBlock=new Subject<EndTextBlock>();
const subjectShowExamples=new Subject<boolean>();

export const LoadTourSteps = {
    sendTS: (tourSteps:TourSteps[]) => subjectTourSteps.next(tourSteps ),
    getTS: () => subjectTourSteps.asObservable()
};
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

export const ExecuteBlockTimings={
    sendEndBlock: (message:EndTextBlock) => subjectEndTextBlock.next(message),
    getMessage: () => subjectEndTextBlock.asObservable()

}

export const ShowExamples={
    sendMessage: (message:boolean) => subjectShowExamples.next(message),
    getMessage: () => subjectShowExamples.asObservable()
}