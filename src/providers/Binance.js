import undici from 'undici';
import { BINANCE_ENDPOINT } from '../constants/rates.js';
import ApiError from '../errors/ApiError.js';

class BinanceProvider {
  async getRate(to, from) {
    const config = {
      method: 'GET',
    };

    const { statusCode, body } = await undici.request(
      `${BINANCE_ENDPOINT}?symbol=${from}${to}`,
      config
    );

    const data = await body.json();

    if (statusCode !== 200)
      throw new ApiError(statusCode, 'Cannot get the rate', [
        data?.msg ?? 'Unknown error',
      ]);

    const { price: rate } = data;
    return rate;
  }
}

export default class BinanceCreator {
  name = 'Binance';

  createProvider() {
    return new BinanceProvider();
  }
}
