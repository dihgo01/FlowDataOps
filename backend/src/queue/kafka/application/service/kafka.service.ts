import { Inject, Injectable } from '@nestjs/common';

import { IKafkaConnection } from '../interfaces/kafka.interface';

@Injectable()
export class KafkaService {

  constructor(
    @Inject('IKafkaConnection')
    private readonly kafkaInfrastructure: IKafkaConnection
  ) { }

  async sendMessage(topic: string, messages: object): Promise<void> {
    await this.kafkaInfrastructure.sendMessages(topic, messages);
  }
}