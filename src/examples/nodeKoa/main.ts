import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import config from './config';
import errorHandle from './middleware/errorHandle';
import router from './routes/index';

const fs = require('fs');
const serve = require('koa-static');
const send = require('koa-send');
const app = new Koa();
const path=require('path');
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
  .use(serve('.'))
  .use(serve("main",{index: "index.html"}))
  .use(bodyParser())
  .use(errorHandle())
  .use(router.routes())
  .use(router.allowedMethods());

export default app.listen(config.port, () => {
  console.log(`App is listening on ${config.port}.`);
});
