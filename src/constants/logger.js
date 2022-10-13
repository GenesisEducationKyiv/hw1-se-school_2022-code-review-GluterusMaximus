import path from 'path';

export const RATE_LOG_PATH = path.resolve(
  process.env.RATE_LOG_PATH_RELATIVE ?? './logs/rateLog.log'
);

export const RABBITMQ_HOST =
  process.env.RABBITMQ_HOST ?? 'amqp://guest:guest@rabbitmq:5672';

export const RABBITMQ_URL = process.env.RABBITMQ_URL ?? 'amqp://localhost:5672';
