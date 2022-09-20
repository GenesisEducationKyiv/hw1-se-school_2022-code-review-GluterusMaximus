interface Provider {
  getRate(to: string, from: string): Promise<number>;
}

interface ProviderCreator {
  createProvider(): Provider;
}

interface ResponsibilityChainProvider extends Provider {
  #provider: Provider;
  #nextProvider: Provider | null;
}

export default class ResponsibilityChainCreator {
  #providerCreator: ProviderCreator;
  #next: ProviderCreator;

  constructor(providerCreator: ProviderCreator);

  createProvider(): Provider;

  setNext(providerCreator: ProviderCreator): void;
}
