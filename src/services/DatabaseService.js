import ApiError from '../errors/ApiError.js';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export default class DatabaseService {
  #storagePath;
  #emailsPath;

  constructor() {
    const __dirname = path.resolve();
    this.#storagePath = path.resolve(__dirname, './data');
    this.#emailsPath = path.resolve(this.#storagePath, 'emails.json');
  }

  async subscribe(email) {
    if (!existsSync(this.#storagePath)) {
      await fs.mkdir(this.#storagePath, { recursive: true });
      await fs.writeFile(this.#emailsPath, JSON.stringify([email]));
      return;
    }

    const emails = JSON.parse(await fs.readFile(this.#emailsPath));
    if (emails.includes(email))
      throw new ApiError(409, 'Email already subscribed');

    emails.push(email);
    await fs.writeFile(this.#emailsPath, JSON.stringify(emails));
  }

  async getEmails() {
    if (!existsSync(this.#emailsPath)) return [];

    return JSON.parse(await fs.readFile(this.#emailsPath));
  }
}
