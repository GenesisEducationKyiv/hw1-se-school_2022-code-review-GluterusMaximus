import {} from 'dotenv/config';
import app from './app.js';

const port = Number(process.env.CUSTOMERS_PORT ?? 5000);

app.listen(port, () => {
  console.log(`Customers service started on port ${port}`);
});
