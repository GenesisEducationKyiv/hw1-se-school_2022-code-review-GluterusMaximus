export default class DatabaseService {
  #storagePath: string;
  #emailsPath: string;

  subscribe(email: string): Promise<void>;
  getEmails(): Promise<string[]>;
}
