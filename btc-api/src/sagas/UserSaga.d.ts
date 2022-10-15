interface EmailService {
  subscribe(email: string): Promise<void>;
  unsubscribe(email: string): Promise<void>;
}

interface CustomersFacade {
  add(email: string): Promise<void>;
  remove(email: string): Promise<void>;
}

export default class UserSaga {
  execute({ email: string }): Promise<void>;

  constructor(emailService: EmailService, customersFacade: CustomersFacade);
}
