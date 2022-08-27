import ApiError from '../errors/ApiError.js';

// eslint-disable-next-line no-unused-vars
export default function (err, _req, res, _next) {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.status).end();
    // .json({
    //   message: err.message,
    //   errors: err.errors,
    // });
  }

  res.status(500).end();
  // .json({
  //   message: 'An unknown error occurred',
  //   errors: [],
  // });
}
