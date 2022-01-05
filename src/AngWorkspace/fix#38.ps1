$arr = Get-ChildItem -Path . -Filter blockly_compressed.js -r | %{$_.FullName}
#Write-Host $arr
$arr | %{
Write-Host "modif	" $_
$c = Get-Content -path $_

$oldGet= "Blockly.DropDownDiv.getContentDiv=function(){return Blockly.DropDownDiv.content_};"
$newGet = "Blockly.DropDownDiv.getContentDiv=function(){  var z=Blockly.DropDownDiv.content_;if(!z){   Blockly.DropDownDiv.DIV_=false;Blockly.DropDownDiv.createDom();}return Blockly.DropDownDiv.content_;};"

$c = $c.replace( $oldGet, $newGet)
$c | Set-Content $_
}
Remove-Item ".angular" -Recurse -ErrorAction Ignore
Write-Host "deleted the .angular folder , do ng serve again"