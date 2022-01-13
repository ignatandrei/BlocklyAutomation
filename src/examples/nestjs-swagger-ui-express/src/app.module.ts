import { Module } from '@nestjs/common';
import { MathOperationsModule } from './MathOps/math-operations.module';

@Module({
  imports: [MathOperationsModule],
})
export class AppModule {
}
