import ApiError from '../errors/ApiError.js';

export default function (err, _req, res, next) {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  }

  res.status(500).json({
    message: 'An unknown error occurred',
    errors: [],
  });
  next();
}
