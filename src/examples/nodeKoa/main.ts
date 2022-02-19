import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import config from './config';
import errorHandle from './middleware/errorHandle';
import router from './routes/index';


const serve = require('koa-static');
const send = require('koa-send');
const app = new Koa();
const path=require('path');
app
  .use(cors())
  .use(async (ctx, next) => {
    if(ctx.path === '/BlocklyAutomation' || ctx.path === '/BlocklyAutomation/') {
      var folder= "tet";
      console.log('root'+folder);
      var file=path.join(folder, 'index.html');
      await send(ctx, file);
      return;
    }
    if(ctx.path.startsWith('/BlocklyAutomation') ) {
      
      var fileToServe = ctx.path.replace('/BlocklyAutomation','');
      
      var folder= "tet";
      var file = path.join(folder, fileToServe);
      console.log('serving ' + file);
      await send(ctx, file);
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
