import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface RateService {
  getRate(): Promise<number>;
}

interface DatabaseService {
  getEmails(): Promise<string[]>;
}

interface Presenter {
  presentMailingResult(notSent: string[]): string;
}

export default class SendService {
  #rateService: RateService;
  #databaseService: DatabaseService;
  #presenter: Presenter;
  #transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(
    rateService: RateService,
    databaseService: DatabaseService,
    presenter: Presenter
  );

  sendEmails(): Promise<string[]>;
}
