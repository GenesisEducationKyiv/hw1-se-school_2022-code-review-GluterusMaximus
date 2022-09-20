interface RateProvider {
  getRate(to: string, from: string): Promise<number>;
}

interface ProviderCreator {
  createProvider(): RateProvider;
}

export default class RateService {
  #providerCreator;

  constructor(providerCreator: ProviderCreator);

  getRate(to?: string, from?: string): Promise<number>;
}
