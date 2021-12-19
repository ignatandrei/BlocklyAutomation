// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";
  // import * as fs from "fs";


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let currentPanel: vscode.WebviewPanel | undefined = undefined;
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "bavscode" is now active in the web extension host!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  context.subscriptions.push(
    vscode.commands.registerCommand("bavscode.startweb", () => {
      const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;
      if (currentPanel) {
        // If we already have a panel, show it in the target column
        currentPanel.reveal(columnToShowIn);
      } else {
        currentPanel = vscode.window.createWebviewPanel(
          "bavscodestartweb", // Identifies the type of the webview. Used internally
          "Blockly Automation", // Title of the panel displayed to the user
          vscode.ViewColumn.One, // Editor column to show the new webview panel in.
          {
			// Only allow the webview to access resources in our extension's media directory
			localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath,'src', 'compiled'))],
			enableScripts: true
		  }
        );
		const onDiskPath = vscode.Uri.file(
			path.join(context.extensionPath, 'compiled', 'src','index.html')
		  );
		const htmlTest = currentPanel.webview.asWebviewUri(onDiskPath);
    const pathUriTest = htmlTest.with({scheme: 'vscode-resource'});
    const pathHtmlTest = context.asAbsolutePath("compiled/index.html");
    const pathjS= getUrlFromCompiled(context,currentPanel.webview,"test.js");
      // var data= fs.readFileSync(pathHtmlTest, "utf8");
      // console.log(data);

    
    const sc1= getUrlFromCompiled(context, currentPanel.webview, "runtime.60255b5df5151220.js");
    const sc2 = getUrlFromCompiled(context, currentPanel.webview, "polyfills.553d90e6b6bac41c.js");
    const sc3 = getUrlFromCompiled(context, currentPanel.webview, "scripts.41e8272f8e78f586.js");
    const sc4 = getUrlFromCompiled(context, currentPanel.webview, "main.7c302f3402e3f20e.js");

    
    //var data=fs.readFileSync(pathHtml, 'utf8');
    // console.log(data);
        //  currentPanel.webview.html = getWebviewContentTest(htmlTest,pathUriTest,pathHtmlTest,pathjS);
		currentPanel.webview.html =getWebviewContent(sc1,sc2,sc3,sc4);
    

		currentPanel.onDidDispose(
			() => {
			  currentPanel = undefined;
			},
			null,
			context.subscriptions
		  );
      }
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
function  getUrlFromCompiled(context: vscode.ExtensionContext, webView:vscode.Webview, file: string): vscode.Uri {
  const onDiskPath = vscode.Uri.file(
    path.join(context.extensionPath,'src', 'compiled', file)
    );
    // console.log(onDiskPath);
    const scriptUri = (onDiskPath).with({ 'scheme': 'vscode-resource' });
    return scriptUri;
    const html = webView.asWebviewUri(onDiskPath);
    return html;
}
function getWebviewContentTest(html: vscode.Uri , pathUri: vscode.Uri, pathHtml: string,scriptSrc: vscode.Uri): string {
return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cat Coding</title>
        
    </head>
    <body>
        
        <h1 id="lines-of-code-counter">html ${html}</h1>
        <h1 id="lines-of-code-counter">pathuri ${pathUri}</h1>
        <h1 id="lines-of-code-counter">pathhtml ${pathHtml}</h1>
        <h1 id="lines-of-code-counter">scriptsrc ${scriptSrc}</h1>
    
        <script src= '${scriptSrc}'></script>
    </body>
    </html>`;
}
function getWebviewContent(sc1: vscode.Uri , sc2: vscode.Uri ,sc3: vscode.Uri, sc4: vscode.Uri ): string {
    
  
      return `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>Automation with Blockly</title>
  <base href="vscode-resource:/c%3A/Users/Surface1/Documents/GitHub/BlocklyAutomation/src/apps/bavscode/src/compiled/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <style type="text/css">@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmSU5fCRc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmSU5fABc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmSU5fCBc4AMP6lbBP.woff2) format('woff2');unicode-range:U+1F00-1FFF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmSU5fBxc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0370-03FF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmSU5fCxc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmSU5fChc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmSU5fBBc4AMP6lQ.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu72xKKTU1Kvnz.woff2) format('woff2');unicode-range:U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu5mxKKTU1Kvnz.woff2) format('woff2');unicode-range:U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu7mxKKTU1Kvnz.woff2) format('woff2');unicode-range:U+1F00-1FFF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4WxKKTU1Kvnz.woff2) format('woff2');unicode-range:U+0370-03FF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu7WxKKTU1Kvnz.woff2) format('woff2');unicode-range:U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu7GxKKTU1Kvnz.woff2) format('woff2');unicode-range:U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9fCRc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9fABc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9fCBc4AMP6lbBP.woff2) format('woff2');unicode-range:U+1F00-1FFF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9fBxc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0370-03FF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9fCxc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9fChc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}</style>
  <style type="text/css">@font-face{font-family:'Material Icons';font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/materialicons/v118/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');}.material-icons{font-family:'Material Icons';font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:'liga';-webkit-font-smoothing:antialiased;}</style>
<style>html,body{height:100%}body{margin:0;font-family:Roboto,Helvetica Neue,sans-serif}</style><link rel="stylesheet" href="styles.7ea1cb5114aeab57.css" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="styles.7ea1cb5114aeab57.css"></noscript></head>
<body>
  <script>
    window.setTimeout(() => {
      document.getElementById('loadingFirstTime').style.display = 'none';
    }, 5000);
  </script>
 <app-root></app-root>
 <div id="loadingFirstTime" style="display: block;">
 <h1>Loading blocks, swaggers and data .... please wait </h1>
  When the site is loaded , please click <span style="color: white;background: rgb(167, 18, 18)"> Execute  </span>  button

</div> 
<script src="${sc1}" type="module"></script>
<script src="${sc2}" type="module"></script>
<script src="${sc3}" defer></script>
<script src="${sc4}" type="module"></script>

</body></html>`;
   
}
  


