export class LoggerProvider {
  #provider;
  #logger;
  #name;

  constructor(provider, logger, name) {
    this.#provider = provider;
    this.#logger = logger;
    this.#name = name;
  }

  async getRate(to, from) {
    this.#logger.debug({ to, from });
    const rate = await this.#provider.getRate(to, from);
    this.#logger.info(`${this.#name} returned rate: ${rate}`);
    return rate;
  }
}

export default class LoggerCreator {
  #providerCreator;
  #logger;

  constructor(providerCreator, logger) {
    this.#providerCreator = providerCreator;
    this.#logger = logger;
    this.name = providerCreator.name;
  }

  createProvider() {
    const provider = this.#providerCreator.createProvider();
    return new LoggerProvider(provider, this.#logger, this.name);
  }
}
