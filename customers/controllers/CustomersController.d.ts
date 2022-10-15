import { Request, Response } from 'express';

interface DatabaseService {
  add(email: string): Promise<void>;
  remove(email: string): Promise<void>;
}

export default class CustomersController {
  #databaseService: DatabaseService;

  constructor(databaseService: DatabaseService);

  add(req: Request, res: Response): Promise<void>;
  remove(req: Request, res: Response): Promise<void>;
}
