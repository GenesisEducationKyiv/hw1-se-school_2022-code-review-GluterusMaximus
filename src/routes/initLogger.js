import { createLogger, format, transports } from 'winston';
import { RATE_LOG_PATH } from '../constants/logger.js';

export const logger = createLogger({
  format: format.json(),
  transports: [new transports.File({ filename: RATE_LOG_PATH })],
});
