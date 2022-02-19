# Node2-blockly

This package shows you your API in a blockly-like way.

To use it

npm i node2-blockly

## Example with Express 

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
 Full working example at https://github.com/ignatandrei/BlocklyAutomation/tree/main/src/examples/nestjs-swagger-ui-express


## Example with koa
Then you can use it like this:

```javascript
const app = new Koa();

app
  .use(cors())
  
  .use(async (ctx, next) => {
    if(ctx.path.startsWith('/BlocklyAutomation') ) {
      var folder=path.join("node_modules", 'node2-blockly','docs');// "tet";
      console.log('root for blockly '+folder);
      if(ctx.path === '/BlocklyAutomation' || ctx.path === '/BlocklyAutomation/') {
        var file=path.join(folder, 'index.html');
        await send(ctx, file);
        return;
      }
      
      var fileToServe = ctx.path.replace('/BlocklyAutomation','');
      var file = path.join(folder, fileToServe);
      if(fs.existsSync(file)) {
        console.log('serving ' + file);
        await send(ctx, file);
      }
      else{
        //serving index
        var file=path.join(folder, 'index.html');
        await send(ctx, file);
        return;
      }
      return;
    }
    
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  })
```

Of course, you should have koa-swagger-decorator

Full working example at https://github.com/ignatandrei/BlocklyAutomation/tree/main/src/examples/nodeKoa
 


More details at http://github.com/ignatandrei/BlocklyAutomation
