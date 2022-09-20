import {
  DEFAULT_FROM_CURRENCY,
  DEFAULT_TO_CURRENCY,
} from '../constants/rates.js';

export default class RateService {
  #providerCreator;

  constructor(providerCreator) {
    this.#providerCreator = providerCreator;
  }

  async getRate(to = DEFAULT_TO_CURRENCY, from = DEFAULT_FROM_CURRENCY) {
    const rate = await this.#providerCreator.createProvider().getRate(to, from);

    return Math.round(rate);
  }
}
