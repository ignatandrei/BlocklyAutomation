import {
  Controller, Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Router } from 'express';

@ApiTags('math')
@Controller('math')
export class MathController {
  constructor() {
  }

  @Get('add/:x/:y')
  @HttpCode(HttpStatus.OK)
  async ThisIsAdd(
      @Param('x', ParseIntPipe) x: number,
      @Param('y', ParseIntPipe) y: number,
  ): Promise<number> {
    return (x + y);
  }

  
  @Get('substract/:x/:y')
  @HttpCode(HttpStatus.OK)
  async ThisIsSubstract(
      @Param('x', ParseIntPipe) x: number,
      @Param('y', ParseIntPipe) y: number,
  ): Promise<number> {
    return (x  -y );
  }

  @Get('divide/:x/:y')
  @HttpCode(HttpStatus.OK)  
  async DivideMe(
      @Param('x', ParseIntPipe) x: number,
      @Param('y', ParseIntPipe) y: number,
  ): Promise<number> {
    return (x / y);
  }

  @Get('multiply/:x/:y')
  @HttpCode(HttpStatus.OK)
  async MultiplyOperation(
      @Param('x', ParseIntPipe) x: number,
      @Param('y', ParseIntPipe) y: number,
  ): Promise<number> {
    return (x * y);
  }

}
