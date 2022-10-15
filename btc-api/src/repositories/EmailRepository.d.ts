export default class EmailRepository {
  #storagePath: string;
  #emailsPath: string;

  constructor(storagePath: string, emailsFilename: string);

  push(email: string): Promise<void>;
  remove(email: string): Promise<void>;
  includes(email: string): Promise<boolean>;
  getAll(): Promise<string[]>;
}
