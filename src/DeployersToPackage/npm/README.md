# Node2-blockly

This package shows you your API in a blockly-like way.

To use it

npm i node2-blockly

Then you can use it like this:

```javascript
var dirBlockly=__dirname + '/../node_modules/node2-blockly/docs/';
console.log('blockly is at '+ dirBlockly);
app.use('/blocklyAutomation',express.static(dirBlockly));
app.use('/blocklyAutomation/*',express.static(dirBlockly));
```

Of course , you should have also the swagger package installed.

```javascript
const options = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('NestJS API description')
    .setVersion('0.1.0')
    .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);
``` 

More details at http://github.com/ignatandrei/BlocklyAutomation
