import fsp from 'fs/promises';
import fs from 'fs';
import path from 'path';
import ApiError from '../errors/ApiError.js';

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

  async remove(email) {
    const emails = await this.getAll();

    const emailIndex = emails.indexOf(email);
    if (emailIndex === -1) return;

    emails.splice(email, 1);

    await fsp.writeFile(this.#emailsPath, JSON.stringify(emails));
  }

  async includes(email) {
    try {
      const customers = await this.getAll();

      return customers.includes(email);
    } catch (error) {
      return false;
    }
  }

  async getAll() {
    if (!fs.existsSync(this.#emailsPath))
      throw ApiError.internal('No database');

    return JSON.parse(await fsp.readFile(this.#emailsPath));
  }
}
