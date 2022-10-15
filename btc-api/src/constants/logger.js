import path from 'path';

export const RATE_LOG_PATH = path.resolve(
  process.env.RATE_LOG_PATH_RELATIVE ?? './logs/rateLog.log'
);

export const RABBITMQ_PORT = Number(process.env.RABBITMQ_PORT ?? 5672);

export const RABBITMQ_USER = process.env.RABBITMQ_USER ?? 'guest';
export const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD ?? 'guest';

export const RABBITMQ_HOST = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@rabbitmq:${RABBITMQ_PORT}`;
