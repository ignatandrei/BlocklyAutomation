import { Injectable } from '@angular/core';
import * as  FileSaver from "file-saver";
@Injectable({
  providedIn: 'root'
})
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
}
