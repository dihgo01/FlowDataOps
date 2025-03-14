import { Global, Module } from '@nestjs/common';
import { KafkaService } from './kafka/application/service/kafka.service';
import { KafkaConnection } from './kafka/infrastructure/connection/kafka.connection';

@Global()
@Module({
  imports: [],
  providers: [
    KafkaService,
    {
      provide: 'IKafkaConnection',
      useClass: KafkaConnection,
    }
  ],
  exports: [KafkaService, 'IKafkaConnection'],
})
export class QueueModule { }
