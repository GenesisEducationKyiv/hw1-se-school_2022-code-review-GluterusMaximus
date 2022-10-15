import { NextFunction, Request, Response } from 'express';
import EmailService from '../services/EmailService';
import SendService from '../services/SendService';

export default class EmailController {
  #sendService: SendService;
  #databaseService: EmailService;

  constructor(sendService: SendService, databaseService: EmailService);

  subscribe(req: Request, res: Response, next: NextFunction): Promise<void>;
  unsubscribe(req: Request, res: Response, next: NextFunction): Promise<void>;
  sendEmails(req: Request, res: Response, next: NextFunction): Promise<void>;
}
