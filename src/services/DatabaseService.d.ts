export default class DatabaseService {
  #storagePath: string;
  #emailsPath: string;

  constructor(storagePath: string, emailsFilename: string);

  subscribe(email: string): Promise<void>;
  getEmails(): Promise<string[]>;
}
