import {
  DEFAULT_FROM_CURRENCY,
  DEFAULT_TO_CURRENCY,
} from '../constants/rates.js';

export default class RateService {
  #providerCreator;
  #presenter;

  constructor(providerCreator, presenter) {
    this.#providerCreator = providerCreator;
    this.#presenter = presenter;
  }

  async getRate(to = DEFAULT_TO_CURRENCY, from = DEFAULT_FROM_CURRENCY) {
    const rate = await this.#providerCreator.createProvider().getRate(to, from);

    const roundedRate = Math.round(rate);

    return this.#presenter.presentRate(roundedRate);
  }
}
