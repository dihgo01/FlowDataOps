import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { IKafkaConnection } from '../../application/interfaces/kafka.interface';

@Injectable()
export class KafkaConnection implements IKafkaConnection, OnModuleInit, OnModuleDestroy {
    private readonly kafka = new Kafka({
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
    });

    public producer: Producer;

    async onModuleInit() {
        this.producer = this.kafka.producer();
        await this.producer.connect();
        console.log('Kafka connection initialized');
    }

    async sendMessages(topic: string, message: object): Promise<void> {
        await this.producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
        });
        console.log('Message sent to Kafka');
    }

    async onModuleDestroy() {
        await this.producer.disconnect();
        console.log('Kafka connection destroyed');
    }
}