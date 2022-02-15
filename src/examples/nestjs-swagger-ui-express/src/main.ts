import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import express = require('express');
import * as http from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
// import fs from 'fs';
async function bootstrap() {
  
  const server = express();
  const app = await NestFactory.create(AppModule,
    new ExpressAdapter(server),
   { cors: false,
    
    httpsOptions:{requestCert:false} });
  
  // Request Validation
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Helmet Middleware against known security vulnerabilities
  // app.use(helmet());

  // Rate limiting against brute-force attacks
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 500, // limit each IP to 500 requests per windowMs
      message: 'Too many requests from this IP, please try again later',
    }),
  );

  const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 10, // start blocking after 10 requests
    message:
      'Too many accounts created from this IP, please try again after an hour',
  });
  app.use('/auth/signup', signupLimiter);
  //dist folder?
  var dirBlockly=__dirname + '/../node_modules/node2-blockly/docs/';
  console.log('blockly is at '+ dirBlockly);
  app.use('/blocklyAutomation',express.static(dirBlockly));
  app.use('/blocklyAutomation/*',express.static(dirBlockly));
  // app.use(express.static('blocklyAutomation'))
    // Swagger API Documentation
  const options = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('NestJS API description')
    .setVersion('0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
  SwaggerModule.setup('api', app, document);
  await app.init();
  // await app.listen(3000);
  http.createServer(server).listen(3000);
}

bootstrap();
