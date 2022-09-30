import undici from 'undici';
import { EXCHANGERATES_ENDPOINT } from '../constants/rates.js';
import ApiError from '../errors/ApiError.js';

class ExchangeratesProvider {
  async getRate(to, from) {
    const config = {
      method: 'GET',
    };

    const { statusCode, body } = await undici.request(
      `${EXCHANGERATES_ENDPOINT}?&base=${from}&symbols=${to}`,
      config
    );

    const data = await body.json();

    if (statusCode !== 200)
      throw new ApiError(statusCode, 'Cannot get the rate', [
        data?.error?.message ?? 'Unknown error',
      ]);

    const {
      rates: { [to]: rate },
    } = data;
    return rate;
  }
}

export default class ExchangeratesCreator {
  name = 'Exchangerates';

  createProvider() {
    return new ExchangeratesProvider();
  }
}
