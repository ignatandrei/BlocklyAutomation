 interface IBlocks{
    
    
    definitionBlocks(javascriptGenerator: any): void;
    addWrapper(interpreter: any, globalObject:any):any|void;
    fieldXML():string;
    category: string;

}

export default IBlocks;