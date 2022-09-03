import DatabaseService from './DatabaseService.js';
import RateService from './RateService.js';
import nodemailer from 'nodemailer';
import {
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
} from '../constants/sendEmails.js';

export default class SendService {
  #rateService = new RateService();
  #databaseService = new DatabaseService();

  #transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  async sendEmails() {
    const notSent = [];
    const emails = await this.#databaseService.getEmails();
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
