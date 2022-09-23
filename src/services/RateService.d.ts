export default class RateService {
  getRate(to?: string, from?: string): Promise<number>;
}
