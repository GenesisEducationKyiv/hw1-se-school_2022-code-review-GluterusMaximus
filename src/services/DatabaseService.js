import ApiError from '../errors/ApiError.js';
import fsp from 'fs/promises';
import fs from 'fs';
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
    if (!fs.existsSync(this.#storagePath)) {
      await fsp.mkdir(this.#storagePath, { recursive: true });
      await fsp.writeFile(this.#emailsPath, JSON.stringify([email]));
      return;
    }

    const emails = JSON.parse(await fsp.readFile(this.#emailsPath));
    if (emails.includes(email))
      throw new ApiError(409, 'Email already subscribed');

    emails.push(email);
    await fsp.writeFile(this.#emailsPath, JSON.stringify(emails));
  }

  async getEmails() {
    if (!fs.existsSync(this.#emailsPath)) return [];

    return JSON.parse(await fsp.readFile(this.#emailsPath));
  }
}
