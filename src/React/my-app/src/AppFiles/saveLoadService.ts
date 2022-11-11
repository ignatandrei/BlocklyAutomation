import * as FileSaver from "file-saver";
import Blockly, { Workspace, WorkspaceSvg } from "blockly/core";
export class saveLoadService {
  public DownloadBlocks(BlocklyXML: any, workspace: any, filename: any) {
    var xml = BlocklyXML.workspaceToDom(workspace, true);
    var xml_text = BlocklyXML.domToPrettyText(xml);
    //window.alert(xml_text);
    var blob = new Blob([xml_text], { type: "text/plain;charset=utf-16" });

    FileSaver.saveAs(blob, filename);
  }
  //TODO: find appropiate type reference
  public LoadFile(BlocklyXML: any, workspace: any, content: any) {
    workspace.clear();
    var dom = BlocklyXML.textToDom(content);
    BlocklyXML.domToWorkspace(dom, workspace);
  }

  public formatInt(number: number): string {
    return number < 10 ? "0" + number : number.toString(10);
  }
  public formatDate(date: Date): string {
    return (
      `${this.formatInt(date.getFullYear())}${this.formatInt(
        date.getMonth() + 1
      )}${this.formatInt(date.getDate())}` +
      `${this.formatInt(date.getHours())}${this.formatInt(
        date.getMinutes()
      )}${this.formatInt(date.getSeconds())}`
    );
  }
  //TODO: find appropiate type reference
  public saveState(workspace: Workspace, id: any) {
    var cname = "BlocklyState" + (id ? id : "");

    var xml = Blockly.Xml.workspaceToDom(workspace, true);
    var xml_text = Blockly.Xml.domToPrettyText(xml);
    window.localStorage.setItem(cname, xml_text);
  }
  public restoreState(workspace: WorkspaceSvg, id: any) {
    try {
      var cname = "BlocklyState" + (id ? id : "");
      var xml_text = window.localStorage.getItem(cname) || "";
      //<xml xmlns="https://developers.google.com/blockly/xml"></xml>
      if (xml_text.length > 62) {
        var xml = Blockly.Xml.textToDom(xml_text);
        Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, workspace);
      }
    } catch (e) {
      console.error("restore state failed", e);
    }
    return "";
  }
}
