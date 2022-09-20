import undici from 'undici';
import { COINBASE_ENDPOINT } from '../constants/rates.js';
import ApiError from '../errors/ApiError.js';

class CoinbaseProvider {
  async getRate(to, from) {
    const config = {
      method: 'GET',
    };

    const { statusCode, body } = await undici.request(
      `${COINBASE_ENDPOINT}?&currency=${from}`,
      config
    );

    const jsonResponse = await body.json();

    if (statusCode !== 200) {
      throw new ApiError(statusCode, 'Cannot get the rate', [
        ...(jsonResponse?.errors ?? ['Unknown error']),
      ]);
    }

    const {
      data: {
        rates: { [to]: rate },
      },
    } = jsonResponse;
    return rate;
  }
}

export default class CoinbaseCreator {
  createProvider() {
    return new CoinbaseProvider();
  }
}
