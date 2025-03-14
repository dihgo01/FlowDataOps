import { Test, TestingModule } from '@nestjs/testing';
import { KafkaConnection } from './kafka.connection';
import { Kafka, Producer } from 'kafkajs';

jest.mock('kafkajs', () => {
    const mockProducer = {
        connect: jest.fn(),
        send: jest.fn(),
        disconnect: jest.fn(),
    };
    return {
        Kafka: jest.fn(() => ({
            producer: jest.fn(() => mockProducer),
        })),
        Producer: jest.fn(() => mockProducer),
    };
});

describe('KafkaConnection', () => {
    let kafkaConnection: KafkaConnection;
    let producer: Producer;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [KafkaConnection],
        }).compile();

        kafkaConnection = module.get<KafkaConnection>(KafkaConnection);
        producer = kafkaConnection['producer'];
    });

    it('should be defined', () => {
        expect(kafkaConnection).toBeDefined();
    });

    describe('onModuleInit', () => {
        it('should connect the producer', async () => {
            await kafkaConnection.onModuleInit();
            expect(kafkaConnection.producer.connect).toHaveBeenCalled();
        });
    });

    describe('sendMessages', () => {
        it('should send messages to Kafka', async () => {
            const topic = 'test-topic';
            const message = { key: 'value' };
            await kafkaConnection.onModuleInit();

            await kafkaConnection.sendMessages(topic, message);

            expect(kafkaConnection.producer.send).toHaveBeenCalledWith({
                topic,
                messages: [{ value: JSON.stringify(message) }],
            });
        });
    });

    describe('onModuleDestroy', () => {
        it('should disconnect the producer', async () => {
            await kafkaConnection.onModuleInit();

            await kafkaConnection.onModuleDestroy();
            expect(kafkaConnection.producer.disconnect).toHaveBeenCalled();
        });
    });
});