interface RateProvider {
  getRate(to: string, from: string): Promise<number>;
}

interface ProviderCreator {
  createProvider(): RateProvider;
}

interface PresenterResponse {
  payload: string;
  contentType: string;
}

interface Presenter {
  presentRate(rate: number): PresenterResponse;
}

export default class RateService {
  #providerCreator: ProviderCreator;
  #presenter: Presenter;

  constructor(providerCreator: ProviderCreator, presenter: Presenter);

  getRate(to?: string, from?: string): Promise<number>;
}
