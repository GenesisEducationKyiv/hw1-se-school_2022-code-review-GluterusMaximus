interface EmailRepository {
  add(email: string): Promise<void>;
  remove(email: string): Promise<void>;
  includes(email: string): Promise<boolean>;
}

export default class CustomersService {
  #customersRepostiry: CustomersRepostiry;

  constructor(customersRepostiry: CustomersRepostiry);

  add(email: string): Promise<void>;
  remove(email: string): Promise<void>;
}
