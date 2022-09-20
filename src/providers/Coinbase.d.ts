interface CoinbaseProvider {
  getRate(to: string, from: string): Promise<number>;
}

export default class CoinbaseCreator {
  createProvider(): CoinbaseProvider;
}
