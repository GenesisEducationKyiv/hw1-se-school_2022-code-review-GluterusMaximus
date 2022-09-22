import { CACHE_TTL_SECONDS } from '../constants/rates.js';

export class CachedProvider {
  #cache;
  #provider;

  constructor(provider, cache) {
    this.#provider = provider;
    this.#cache = cache;
  }

  async getRate(to, from) {
    const cachedRate = this.#cache.get('rate');
    if (cachedRate) return cachedRate;

    const rate = await this.#provider.getRate(to, from);
    this.#cache.set('rate', rate);
    return rate;
  }
}

export default class CachedCreator {
  #cache;
  #providerCreator;

  constructor(providerCreator, Cache) {
    this.#cache = new Cache({ stdTTL: CACHE_TTL_SECONDS });
    this.#providerCreator = providerCreator;
    this.name = this.#providerCreator.name;
  }

  createProvider() {
    const provider = this.#providerCreator.createProvider();
    return new CachedProvider(provider, this.#cache);
  }
}
