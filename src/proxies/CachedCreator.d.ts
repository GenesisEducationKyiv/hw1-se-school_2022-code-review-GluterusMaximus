interface Provider {
  getRate(to: string, from: string): Promise<number>;
}

interface ProviderCreator {
  name: string;
  createProvider(): Provider;
}

interface Cache {
  get(key: string): any;
  set(key: string, value: any): boolean;
}

interface CacheClass {
  new (options: { stdTTL: number }): Cache;
}

export class CachedProvider implements Provider {
  #cache: Cache;
  #provider: Provider;

  constructor(provider: Provider, cache: Cache);
}

export default class CachedCreator implements ProviderCreator {
  #cache: Cache;
  #providerCreator: ProviderCreator;

  constructor(providerCreator: ProviderCreator, Cache: CacheClass);
}
