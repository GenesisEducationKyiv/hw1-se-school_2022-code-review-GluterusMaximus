interface Provider {
  getRate(to: string, from: string): Promise<number>;
}

interface ProviderCreator {
  name: string;
  createProvider(): Provider;
}

export class ResponsibilityChainProvider implements Provider {
  #provider: Provider;
  #nextProvider: Provider | null;

  constructor(provider: Provider, nextProvider: Provider);
}

export default class ResponsibilityChainCreator implements ProviderCreator {
  #providerCreator: ProviderCreator;
  #next: ProviderCreator;

  constructor(providerCreator: ProviderCreator);

  setNext(providerCreator: ProviderCreator): void;
}
