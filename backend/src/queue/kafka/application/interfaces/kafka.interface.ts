export interface IKafkaConnection {
    sendMessages(topic: string, messages: object): Promise<void>;
}