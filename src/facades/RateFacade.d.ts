import RateService from '../services/RateService';

interface RateService {
  getRate(to?: string, from?: string): Promise<number>;
}

export class RateFacade {
  constructor(rateService: RateService);

  getRate(to?: string, from?: string): Promise<number>;
}
