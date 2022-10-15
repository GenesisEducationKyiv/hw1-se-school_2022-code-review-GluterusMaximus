import fsp from 'fs/promises';
import fs from 'fs';
import path from 'path';

export default class CustomersRepository {
  #storagePath;
  #customersPath;

  constructor(storagePath, customersFilename) {
    this.#storagePath = storagePath;
    this.#customersPath = path.resolve(storagePath, customersFilename);
  }

  async add(email) {
    if (!fs.existsSync(this.#storagePath)) {
      await fsp.mkdir(this.#storagePath, { recursive: true });
      await fsp.writeFile(this.#customersPath, JSON.stringify([email]));
      return;
    }

    const customers = await this.getAll();

    customers.push(email);
    await fsp.writeFile(this.#customersPath, JSON.stringify(customers));
  }

  async remove(email) {
    const customers = await this.getAll();

    const emailIndex = customers.indexOf(email);
    if (emailIndex === -1) return;

    customers.splice(email, 1);

    await fsp.writeFile(this.#customersPath, JSON.stringify(customers));
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
    if (!fs.existsSync(this.#customersPath)) throw new Error('No database');

    return JSON.parse(await fsp.readFile(this.#customersPath));
  }
}
