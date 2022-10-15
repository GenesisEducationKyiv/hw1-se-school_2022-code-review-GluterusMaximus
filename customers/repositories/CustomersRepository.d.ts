export default class CustomersRepository {
  #storagePath: string;
  #customersPath: string;

  constructor(storagePath: string, customersFilename: string);

  add(email: string): Promise<void>;
  remove(email: string): Promise<void>;
  includes(email: string): Promise<boolean>;
  getAll(): Promise<string[]>;
}
