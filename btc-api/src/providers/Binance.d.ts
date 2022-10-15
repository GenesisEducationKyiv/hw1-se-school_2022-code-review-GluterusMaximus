interface BinanceProvider {
  getRate(to: string, from: string): Promise<number>;
}

export default class BinanceCreator {
  name: string;

  createProvider(): BinanceProvider;
}
