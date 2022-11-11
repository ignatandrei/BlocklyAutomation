 interface IBlocks{
    
    
    definitionBlocks(javascriptGenerator: any): void;
    addWrapper(interpreter: any, globalObject:any):any|void;


}

export default IBlocks;