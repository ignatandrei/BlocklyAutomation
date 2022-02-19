import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import config from './config';
import errorHandle from './middleware/errorHandle';
import router from './routes/index';

const serve = require('koa-static');
const send = require('koa-send');
const app = new Koa();

app
  .use(cors())
  .use(async (ctx, next) => {
    if(ctx.path === '/main') {
      await send(ctx, 'tet/index.html');
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
