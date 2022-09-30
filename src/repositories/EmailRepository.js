import fsp from 'fs/promises';
import fs from 'fs';
import path from 'path';

export default class EmailRepository {
  #storagePath;
  #emailsPath;

  constructor(storagePath, emailsFilename) {
    this.#storagePath = storagePath;
    this.#emailsPath = path.resolve(storagePath, emailsFilename);
  }

  async push(email) {
    if (!fs.existsSync(this.#storagePath)) {
      await fsp.mkdir(this.#storagePath, { recursive: true });
      await fsp.writeFile(this.#emailsPath, JSON.stringify([email]));
      return;
    }

    const emails = await this.getAll();

    emails.push(email);
    await fsp.writeFile(this.#emailsPath, JSON.stringify(emails));
  }

  async includes(email) {
    const emails = await this.getAll();

    return emails.includes(email);
  }

  async getAll() {
    if (!fs.existsSync(this.#emailsPath)) return [];

    return JSON.parse(await fsp.readFile(this.#emailsPath));
  }
}
