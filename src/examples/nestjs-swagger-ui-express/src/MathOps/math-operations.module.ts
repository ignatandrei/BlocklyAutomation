import {Module} from '@nestjs/common';
import { MathController} from './math.controller';
import { TestController } from './whoAmI.controller';

@Module({
    imports: [],
    providers: [],
    exports: [],
    controllers: [
        MathController ,
        TestController
        ],
})
export class MathOperationsModule {
}
