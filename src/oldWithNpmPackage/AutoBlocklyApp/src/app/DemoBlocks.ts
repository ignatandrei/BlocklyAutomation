type BlockSource =
  | "None"
  | "Demos"
  | "Download"
  | "LocalAPI"
  | "Cloud"
  
  export class DemoBlocks {
  constructor(data: Partial<DemoBlocks> = {}) {
    Object.assign(this, data)
  }
  public id: string = '';
  public description: string = "";
  public categories: string = "";
  public blocks: string = "";
  public Source: BlockSource = "None";
}
