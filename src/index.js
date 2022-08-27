import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import ApiError from './errors/ApiError.js';
import router from './routes/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();
app.disable('x-powered-by');

app.use(router);
app.use('*', (_req, _res, next) => {
  next(ApiError.notFound());
});
app.use(errorMiddleware);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
