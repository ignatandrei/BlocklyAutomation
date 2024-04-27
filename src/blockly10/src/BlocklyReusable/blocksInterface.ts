 interface IBlocks{
    
    addWrapper(interpreter: any, globalObject:any):any|void;
    fieldXML():string;
    category: string;

}

interface IBlocksSimple extends IBlocks {
    definitionBlocksSimple(blocks:any,javascriptGenerator: any): void;
}

interface IBlocksExtMut extends  IBlocks{
    definitionBlocksExtMut(blocks: any, javascriptGenerator: any, BlocklyExtensions:any): void;
}

export default IBlocks;
export type {IBlocksSimple, IBlocksExtMut};