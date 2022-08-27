import ApiError from '../errors/ApiError.js';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import RateService from './RateService.js';
import nodemailer from 'nodemailer';
import {
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
} from '../constants/sendEmails.js';

export default class SubscriptionService {
  #storagePath;
  #emailsPath;
  #rateService = new RateService();

  #transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

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

  async sendEmails() {
    if (!existsSync(this.#emailsPath)) return [];

    const notSent = [];
    const emails = JSON.parse(await fs.readFile(this.#emailsPath));
    const rate = await this.#rateService.getRate();

    for (const email of emails) {
      try {
        await this.#transporter.sendMail({
          from: SMTP_USER,
          to: email,
          subject: 'Current BTC to UAH rate',
          text: '',
          html: `<h1>The current BTC to UAH rate is ${rate}</h1>`,
        });
      } catch (error) {
        console.log(error);
        notSent.push(email);
      }
    }

    return notSent;
  }
}
