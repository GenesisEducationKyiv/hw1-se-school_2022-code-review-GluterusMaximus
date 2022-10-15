import Transport from 'winston-transport';
import amqplib from 'amqplib';
import { RABBITMQ_HOST } from '../constants/logger.js';

export class AmqpTransport extends Transport {
  queue = 'logs';
  retryConnection = 500;

  constructor(options) {
    super(options);
  }

  log(info, callback) {
    this.sendToQueue(info);
    callback();
  }

  async sendToQueue(info) {
    await this.connect();
    this.channel?.sendToQueue(this.queue, Buffer.from(JSON.stringify(info)));
  }

  async connect() {
    this.connection = await amqplib.connect(RABBITMQ_HOST);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue);
  }
}
