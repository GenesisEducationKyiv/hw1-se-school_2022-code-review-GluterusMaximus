export default class CustomersFacade {
  constructor(customersUrl: string);

  add(email: string): Promise<void>;
  remove(email: string): Promise<void>;
}
