import { NextFunction, Request, Response } from 'express';
import SendService from '../services/SendService';

interface UserSaga {
  execute(params: any): Promise<void>;
}

export default class EmailController {
  #sendService: SendService;
  #userSaga: UserSaga;

  constructor(sendService: SendService, userSaga: UserSaga);

  subscribe(req: Request, res: Response, next: NextFunction): Promise<void>;
  unsubscribe(req: Request, res: Response, next: NextFunction): Promise<void>;
  sendEmails(req: Request, res: Response, next: NextFunction): Promise<void>;
}
