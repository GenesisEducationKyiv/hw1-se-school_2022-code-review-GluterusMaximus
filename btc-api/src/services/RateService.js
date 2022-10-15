import {
  DEFAULT_FROM_CURRENCY,
  DEFAULT_TO_CURRENCY,
  RATE_PRECISION,
} from '../constants/rates.js';

export default class RateService {
  ratePrecision = RATE_PRECISION;
  #providerCreator;
  #presenter;

  constructor(providerCreator, presenter) {
    this.#providerCreator = providerCreator;
    this.#presenter = presenter;
  }

  async getRate(to = DEFAULT_TO_CURRENCY, from = DEFAULT_FROM_CURRENCY) {
    const rate = await this.#providerCreator.createProvider().getRate(to, from);

    const roundedRate = Math.round(rate);
    const roundedLength = roundedRate.toString().length;
    const finalRate =
      roundedLength >= this.ratePrecision
        ? roundedRate
        : parseFloat(rate.toFixed(this.ratePrecision - roundedLength));

    return this.#presenter.presentRate(finalRate);
  }
}
