import ApiError from '../errors/ApiError.js';
import { logger } from '../logger/initLogger.js';

export default function (err, _req, res, next) {
  console.log(err);
  // logger.error(err);

  if (err instanceof ApiError) {
    res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
    return next();
  }

  res.status(500).json({
    message: 'An unknown error occurred',
    errors: [],
  });
  next();
}
