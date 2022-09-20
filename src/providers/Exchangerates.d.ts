interface ExchangeratesProvider {
  getRate(to: string, from: string): Promise<number>;
}

export default class ExchangeratesCreator {
  createProvider(): ExchangeratesProvider;
}
