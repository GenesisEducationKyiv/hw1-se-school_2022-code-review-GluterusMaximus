interface EmailRepository {
  push(email: string): Promise<void>;
  remove(email: string): Promise<void>;
  includes(email: string): Promise<boolean>;
  getAll(): Promise<string[]>;
}

export default class EmailService {
  #emailRepository: EmailRepository

  constructor(emailRepository: EmailRepository);

  subscribe(email: string): Promise<void>;
  unsubscribe(email: string): Promise<void>;
  getEmails(): Promise<string[]>;
}
