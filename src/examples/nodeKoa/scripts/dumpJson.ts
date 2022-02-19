import path from 'path';
import { SwaggerRouter } from 'koa-swagger-decorator';

// init router
const router = new SwaggerRouter();

// load controllers
router.mapDir(path.resolve(__dirname, '../routes'));

// dump swagger json
router.dumpSwaggerJson({
  filename: 'swagger.json', // default is swagger.json
  dir: process.cwd(), // default is process.cwd()
});

