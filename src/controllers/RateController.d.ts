import { NextFunction, Request, Response } from 'express';
import RateService from '../services/RateService';

export default class RateControllerd {
  #rateService: RateService;

  constructor(rateService: RateService);

  getRate(req: Request, res: Response, next: NextFunction): Promise<void>;
}
