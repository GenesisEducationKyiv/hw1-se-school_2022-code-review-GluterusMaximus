import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface RateService {
  getRate(): Promise<number>;
}

interface DatabaseService {
  getEmails(): Promise<string[]>;
}

export default class SendService {
  #rateService: RateService;
  #databaseService: DatabaseService;
  #transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(rateService: RateService, databaseService: DatabaseService);

  sendEmails(): Promise<string[]>;
}
