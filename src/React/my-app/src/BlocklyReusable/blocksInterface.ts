 interface IBlocks{
    
    
    
    addWrapper(interpreter: any, globalObject:any):any|void;
    fieldXML():string;
    category: string;

}

interface IBlocksSimple extends IBlocks {
    definitionBlocksSimple(javascriptGenerator: any): void;
}

interface IBlocksExtMut extends  IBlocks{
    definitionBlocksExtMut(javascriptGenerator: any, BlocklyExtensions:any,  BlocklyMutator:any): void;
}

export default IBlocks;
export type {IBlocksSimple, IBlocksExtMut};