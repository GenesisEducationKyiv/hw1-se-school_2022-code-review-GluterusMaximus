import amqplib from 'amqplib';
import { RABBITMQ_HOST } from './constants/rabbitmq.js';

const queue = 'logs';
const connection = await amqplib.connect(RABBITMQ_HOST);
const channel = await connection.createChannel();

await channel.assertQueue(queue);
channel.consume(queue, (msg) => {
  if (msg !== null) {
    const decoded = JSON.parse(msg?.content?.toString() ?? '');

    if (decoded.level === 'error') {
      console.log(decoded);
    }

    channel.ack(msg);
  } else {
    console.log('Consumer cancelled by server');
  }
});
