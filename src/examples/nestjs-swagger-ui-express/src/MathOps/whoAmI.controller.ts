import {
  Controller, Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Router } from 'express';

@ApiTags('test')
@Controller('test')
export class TestController {
  constructor() {
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async ThisIsTest(): Promise<string> {
    return "This is a test";
  }

}
