class ResponsibilityChainProvider {
  #provider;
  #nextProvider;

  constructor(provider, nextProvider) {
    this.#provider = provider;
    this.#nextProvider = nextProvider;
  }

  async getRate(to, from) {
    try {
      return await this.#provider.getRate(to, from);
    } catch (error) {
      if (!this.#nextProvider) throw error;
      return this.#nextProvider.getRate(to, from);
    }
  }
}

export default class ResponsibilityChainCreator {
  #providerCreator;
  #next;

  constructor(providerCreator) {
    this.#providerCreator = providerCreator;
  }

  createProvider() {
    const provider = this.#providerCreator.createProvider();
    return new ResponsibilityChainProvider(
      provider,
      this.#next?.createProvider() ?? null
    );
  }

  setNext(providerCreator) {
    this.#next = providerCreator;
  }
}
