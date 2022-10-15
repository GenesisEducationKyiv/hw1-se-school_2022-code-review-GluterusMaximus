import { createLogger, format } from 'winston';
import { AmqpTransport } from './amqpTransport.js';

export const logger = createLogger({
  format: format.json(),
  transports: [new AmqpTransport()],
});
