echo 'install'
npm install -g npm@8.3.0
# npm install -g ngx-pwa-icons
npm install -g http-server@14.0.0

npm install @angular/cli@13

cd projects
cd blockly-helpers
npm i
cd ..
cd blockly-scripts
npm i
cd ..
cd blockly-swagger
npm i
cd ..
cd ..

#npm i -force
#cd ./AutoBlocklyApp/ 
#npm i -force

#cd ..

echo 'now : npm run start'
echo 'now : npm run addPWA'
echo 'now : npm run PWArun'
echo 'ngx-pwa-icons from angular site'