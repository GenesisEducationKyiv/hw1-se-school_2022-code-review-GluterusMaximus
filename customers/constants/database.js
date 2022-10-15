import path from 'path';

const __dirname = path.resolve();

export const STORAGE_PATH = path.resolve(
  __dirname,
  process.env.STORAGE_PATH_RELATIVE || './customers/data'
);

export const CUSTOMERS_FILENAME = 'customers.json';
