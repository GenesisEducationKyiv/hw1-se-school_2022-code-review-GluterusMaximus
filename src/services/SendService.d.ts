import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface RateService {
  getRate(): Promise<number>;
}

interface DatabaseService {
  getEmails(): Promise<string[]>;
}

interface PresenterResponse {
  payload: string;
  contentType: string;
}

interface Presenter {
  presentMailingResult(notSent: string[]): PresenterResponse;
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
