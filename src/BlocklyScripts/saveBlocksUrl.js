function formatInt(number) {
    return number < 10 ? '0' + number : number;
}
function formatDate(date) {

    return `${formatInt(date.getFullYear())}${formatInt((date.getMonth() + 1))}${formatInt(date.getDate())}` +
        `${formatInt(date.getHours())}${formatInt(date.getMinutes())}${formatInt(date.getSeconds())}`;

}
exports.saveState = function(BLocklyXML, Workspace){
    var cname= 'BlocklyState';
    var xml = BLocklyXML.workspaceToDom(Workspace, true);
    var xml_text = BLocklyXML.domToPrettyText(xml);
    window.localStorage.setItem(cname, xml_text);
}
exports.restoreState = function(BLocklyXML,workspace){
    
    var cname= 'BlocklyState';
    var xml_text = window.localStorage.getItem(cname);
    if(xml_text){
        var xml = BLocklyXML.textToDom(xml_text);
        BLocklyXML.clearWorkspaceAndLoadFromXml(xml, workspace);
    }
    return "";
  }