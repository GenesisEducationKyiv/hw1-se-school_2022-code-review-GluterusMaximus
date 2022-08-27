import { request } from 'undici';
import {
  DEFAULT_FROM_CURRENCY,
  DEFAULT_TO_CURRENCY,
  EXCHANGE_RATE_APIKEY,
  EXCHANGE_RATE_ENDPOINT,
} from '../constants/getRate.js';
import ApiError from '../errors/ApiError.js';

export default class RateService {
  async getRate(to = DEFAULT_TO_CURRENCY, from = DEFAULT_FROM_CURRENCY) {
    const config = {
      redirect: 'follow',
      headers: {
        apikey: EXCHANGE_RATE_APIKEY,
      },
      method: 'GET',
    };

    const { statusCode, body } = await request(
      `${EXCHANGE_RATE_ENDPOINT}?to=${to}&from=${from}&amount=1`,
      config
    );

    if (statusCode !== 200) throw ApiError.badRequest('Cannot get the rate');

    const {
      info: { rate },
    } = await body.json();
    return Math.round(rate);
  }
}
