import { Injectable } from '@angular/core';
import * as  FileSaver from "file-saver";
export class saveLoadService{

  constructor() { }

  public DownloadBlocks (BlocklyXML:any , workspace:any , filename:any ) {
    var xml = BlocklyXML.workspaceToDom(workspace, true);
    var xml_text = BlocklyXML.domToPrettyText(xml);    
    //window.alert(xml_text);
    var blob = new Blob([xml_text], { type: "text/plain;charset=utf-16" });
    
    FileSaver.saveAs(blob, filename);
  }
  public A():number{
    return 1;
  }
  public LoadFile (BlocklyXML:any,workspace:any,content:any) {
    workspace.clear();
    var dom = BlocklyXML.textToDom(content);
    BlocklyXML.domToWorkspace(dom, workspace);
  }

  public formatInt(number:number):string{
    return number < 10 ? '0' + number : number.toString(10);
  }
  public formatDate(date:Date):string{

    return `${this.formatInt(date.getFullYear())}${this.formatInt((date.getMonth() + 1))}${this.formatInt(date.getDate())}` +
        `${this.formatInt(date.getHours())}${this.formatInt(date.getMinutes())}${this.formatInt(date.getSeconds())}`;

}
public saveState (BLocklyXML:any, Workspace:any, id:any){
    var cname= 'BlocklyState'+(id?id:"");
    var xml = BLocklyXML.workspaceToDom(Workspace, true);
    var xml_text = BLocklyXML.domToPrettyText(xml);
    window.localStorage.setItem(cname, xml_text);
}
public restoreState (BLocklyXML:any,workspace:any, id:any){
    
    var cname= 'BlocklyState'+(id?id:"");
    var xml_text = window.localStorage.getItem(cname);
    //<xml xmlns="https://developers.google.com/blockly/xml"></xml>
    if(( xml_text?.length || 0) >62){
        var xml = BLocklyXML.textToDom(xml_text);
        BLocklyXML.clearWorkspaceAndLoadFromXml(xml, workspace);
    }
    return "";
  }

}
