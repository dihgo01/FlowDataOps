import { Test, TestingModule } from '@nestjs/testing';

import { QueueModule } from './queue.module';
import { KafkaService } from './kafka/application/service/kafka.service';
import { KafkaConnection } from './kafka/infrastructure/connection/kafka.connection';

describe('QueueModule', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [QueueModule],
        }).compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });

    it('should provide KafkaService', () => {
        const kafkaService = module.get<KafkaService>(KafkaService);
        expect(kafkaService).toBeInstanceOf(KafkaService);
    });

    it('should provide IKafkaConnection', () => {
        const kafkaConnection = module.get<KafkaConnection>('IKafkaConnection');
        expect(kafkaConnection).toBeInstanceOf(KafkaConnection);
    });
});