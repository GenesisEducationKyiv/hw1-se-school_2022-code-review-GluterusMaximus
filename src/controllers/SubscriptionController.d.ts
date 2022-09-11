import { NextFunction, Request, Response } from 'express';

interface SendService {
  sendEmails(): Promise<string[]>;
}

interface DatabaseService {
  subscribe(email: string): Promise<void>;
}

export default class SubscriptionController {
  #sendService: SendService;
  #databaseService: DatabaseService;

  constructor(sendService: SendService, databaseService: DatabaseService);

  subscribe(req: Request, res: Response, next: NextFunction): Promise<void>;
  sendEmails(req: Request, res: Response, next: NextFunction): Promise<void>;
}
