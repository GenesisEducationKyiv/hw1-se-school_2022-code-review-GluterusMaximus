import ApiError from '../errors/ApiError.js';

export default function (err, _req, res, next) {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.status).end();
  }

  res.status(500).end();
  next();
}
