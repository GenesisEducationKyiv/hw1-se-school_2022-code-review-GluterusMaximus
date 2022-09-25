interface RateProvider {
  getRate(to: string, from: string): Promise<number>;
}

interface ProviderCreator {
  createProvider(): RateProvider;
}

interface Presenter {
  presentRate(rate: number): string;
}

export default class RateService {
  #providerCreator: ProviderCreator;
  #presenter: Presenter;

  constructor(providerCreator: ProviderCreator, presenter: Presenter);

  getRate(to?: string, from?: string): Promise<number>;
}
