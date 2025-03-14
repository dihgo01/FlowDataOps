import { Test, TestingModule } from '@nestjs/testing';
import { KafkaService } from './kafka.service';
import { IKafkaConnection } from '../interfaces/kafka.interface';

describe('KafkaService', () => {
  let service: KafkaService;
  let kafkaConnectionMock: IKafkaConnection;

  beforeEach(async () => {
    kafkaConnectionMock = {
      sendMessages: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KafkaService,
        {
          provide: 'IKafkaConnection',
          useValue: kafkaConnectionMock,
        },
      ],
    }).compile();

    service = module.get<KafkaService>(KafkaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call sendMessages on kafkaInfrastructure with correct parameters', async () => {
    const topic = 'test-topic';
    const messages = { key: 'value' };

    await service.sendMessage(topic, messages);

    expect(kafkaConnectionMock.sendMessages).toHaveBeenCalledWith(topic, messages);
  });
});