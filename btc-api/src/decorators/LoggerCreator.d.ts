interface Logger {
  info(message: string): Logger;
}

interface Provider {
  getRate(to: string, from: string): Promise<number>;
}

interface ProviderCreator {
  name: string;
  createProvider(): Provider;
}

export class LoggerProvider implements Provider {
  #provider: Provider;
  #logger: Logger;
  #name: string;

  constructor(provider: Provider, logger: Logger, name: string);
}

export default class ResponsibilityChainCreator implements ProviderCreator {
  #providerCreator: ProviderCreator;
  #logger: Logger;

  constructor(providerCreator: ProviderCreator, logger: Logger);
}
