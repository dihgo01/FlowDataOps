import { Module } from '@nestjs/common';
import { FlowService } from './application/service/flow.service';
import { FlowController } from './presenter/flow.controller';
import { FlowRepository } from './infrastructure/typeorm/repository/flow.repository';

@Module({
  controllers: [FlowController],
  providers: [
    FlowService,
    {
      provide: 'IFlowRepository',
      useClass: FlowRepository,
    },
  ],
  exports: [FlowService, 'IFlowRepository'],
})
export class FlowModule { }
