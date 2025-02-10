import { Module } from '@nestjs/common';
import { StepService } from './application/service/step.service';
import { StepController } from './presenter/step.controller';
import { StepRepository } from './infrastructure/typeorm/repository/step.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [StepController],
  providers: [
    StepService,
    {
      provide: 'IStepRepository',
      useClass: StepRepository,
    },
  ],
  exports: [StepService, 'IStepRepository'],
})
export class StepsModule { }
