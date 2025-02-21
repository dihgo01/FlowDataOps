import { Module } from '@nestjs/common';
import { ExecutionService } from './application/service/execution.service';
import { ExecutionController } from './presenter/execution.controller';
import { ExecutionRepository } from './infrastructure/typeorm/repository/execution.repository';
import { DatabaseModule } from 'src/database/database.module';

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
