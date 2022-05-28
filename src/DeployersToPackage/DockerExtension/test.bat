:1
pause
docker extension uninstall blockly-automation:0.0.1 
del  ui\*.* /F /Q /S
cd ..\..\AngWorkspace
rem cmd /C start /B /WAIT /REALTIME  npm run buildDesktop
start /separate /wait /REALTIME cmd /c "npm run buildDesktop" 
cd ..\DeployersToPackage\DockerExtension
xcopy ..\..\AngWorkspace\dist\auto-blockly-app\*.* ui\ /E  
cd ui\assets\loadAtStartup\
del swaggers.json
ren swaggersForDockerExtension.json swaggers.json
cd ..
cd ..
cd ..

cd ui\assets\showUsage
rmdir /S /Q demoBlocks
ren demoBlocksDockerExtension demoBlocks
cd ..
cd ..
cd ..

docker build -t blockly-automation:0.0.1 .
docker extension install blockly-automation:0.0.1 -f
goto 1