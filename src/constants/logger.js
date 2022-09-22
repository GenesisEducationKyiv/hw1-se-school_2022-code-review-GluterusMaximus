import path from 'path';

export const RATE_LOG_PATH = path.resolve(
  process.env.RATE_LOG_PATH_RELATIVE ?? './logs/rateLog.log'
);
