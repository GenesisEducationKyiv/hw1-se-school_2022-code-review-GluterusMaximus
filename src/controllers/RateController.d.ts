import { NextFunction, Request, Response } from 'express';

interface RateService {
  getRate(to?: string, from?: string): Promise<number>;
}

export default class RateControllerd {
  #rateService: RateService;

  constructor(rateService: RateService);

  getRate(req: Request, res: Response, next: NextFunction): Promise<void>;
}
