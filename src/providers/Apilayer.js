import undici from 'undici';
import { APILAYER_APIKEY, APILAYER_ENDPOINT } from '../constants/rates.js';
import ApiError from '../errors/ApiError.js';

class ApilayerProvider {
  async getRate(to, from) {
    const config = {
      redirect: 'follow',
      headers: {
        apikey: APILAYER_APIKEY,
      },
      method: 'GET',
    };

    const { statusCode, body } = await undici.request(
      `${APILAYER_ENDPOINT}?to=${to}&from=${from}&amount=1`,
      config
    );

    const data = await body.json();

    if (statusCode !== 200)
      throw new ApiError(statusCode, 'Cannot get the rate', [
        data?.message ?? 'Unknown error',
      ]);

    const {
      info: { rate },
    } = data;
    return rate;
  }
}

export default class ApilayerCreator {
  createProvider() {
    return new ApilayerProvider();
  }
}
