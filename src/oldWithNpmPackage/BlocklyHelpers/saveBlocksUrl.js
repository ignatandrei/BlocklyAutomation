function formatInt(number) {
    return number < 10 ? '0' + number : number;
}
function formatDate(date) {

    return `${formatInt(date.getFullYear())}${formatInt((date.getMonth() + 1))}${formatInt(date.getDate())}` +
        `${formatInt(date.getHours())}${formatInt(date.getMinutes())}${formatInt(date.getSeconds())}`;

}
exports.saveState = function(BLocklyXML, Workspace, id){
    var cname= 'BlocklyState'+(id?id:"");
    var xml = BLocklyXML.workspaceToDom(Workspace, true);
    var xml_text = BLocklyXML.domToPrettyText(xml);
    window.localStorage.setItem(cname, xml_text);
}
exports.restoreState = function(BLocklyXML,workspace, id){
    
    var cname= 'BlocklyState'+(id?id:"");
    var xml_text = window.localStorage.getItem(cname);
    //<xml xmlns="https://developers.google.com/blockly/xml"></xml>
    if(xml_text?.length>62){
        var xml = BLocklyXML.textToDom(xml_text);
        BLocklyXML.clearWorkspaceAndLoadFromXml(xml, workspace);
    }
    return "";
  }