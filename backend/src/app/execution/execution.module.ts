import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ExecutionController } from './presenter/execution.controller';
import { ExecutionService } from './application/service/execution.service';
import { ExecutionRepository } from './infrastructure/typeorm/repository/execution.repository';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [ExecutionController],
  providers: [
    ExecutionService, 
    {
      provide: 'IExecutionRepository',
      useClass: ExecutionRepository,
    },
  ],
  exports: [ExecutionService, 'IExecutionRepository'],
})
export class ExecutionModule { }
