export class ResponsibilityChainProvider {
  #provider;
  #nextCreator;

  constructor(provider, nextCreator) {
    this.#provider = provider;
    this.#nextCreator = nextCreator;
  }

  async getRate(to, from) {
    try {
      return await this.#provider.getRate(to, from);
    } catch (error) {
      if (!this.#nextCreator) throw error;
      return this.#nextCreator.createProvider().getRate(to, from);
    }
  }
}

export default class ResponsibilityChainCreator {
  #providerCreator;
  initNextCreator = null;

  constructor(providerCreator) {
    this.#providerCreator = providerCreator;
    this.name = providerCreator.name;
  }

  createProvider() {
    const provider = this.#providerCreator.createProvider();
    const nextCreator = this.initNextCreator();
    return new ResponsibilityChainProvider(provider, nextCreator);
  }
}
