interface ApilayerProvider {
  getRate(to: string, from: string): Promise<number>;
}

export default class ApilayerCreator {
  name: string;

  createProvider(): ApilayerProvider;
}
