var FileSaver = require('file-saver');
exports.DownloadBlocks = function(BlocklyXML, workspace, filename) {
    var xml = BlocklyXML.workspaceToDom(workspace, true);
    var xml_text = BlocklyXML.domToPrettyText(xml);    
    //window.alert(xml_text);
    var blob = new Blob([xml_text], { type: "text/plain;charset=utf-16" });
    FileSaver.saveAs(blob, filename);
}
exports.LoadFile = function(BlocklyXML,workspace,content) {
        workspace.clear();
        var dom = BlocklyXML.textToDom(content);
        BlocklyXML.domToWorkspace(dom, workspace);
}