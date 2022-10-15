import nodemailer from 'nodemailer';
import {
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
} from '../constants/mailing.js';

export default class SendService {
  #rateService;
  #emailRepository;
  #presenter;

  #transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  constructor(rateService, emailRepository, presenter) {
    this.#emailRepository = emailRepository;
    this.#rateService = rateService;
    this.#presenter = presenter;
  }

  async sendEmails() {
    const notSent = [];
    const emails = await this.#emailRepository.getAll();
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

    return this.#presenter.presentMailingResult(notSent);
  }
}
