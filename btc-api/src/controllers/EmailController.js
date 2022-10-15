import ApiError from '../errors/ApiError.js';
import { validateEmail } from '../utils/validators.js';

export default class EmailController {
  #sendService;
  #databaseService;

  constructor(sendService, databaseService) {
    this.#sendService = sendService;
    this.#databaseService = databaseService;
  }

  async subscribe(req, res, next) {
    try {
      const { email } = req.body;

      if (!email || !validateEmail(email))
        throw new ApiError(400, 'Invalid email');

      await this.#databaseService.subscribe(email);
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }

  async unsubscribe(req, res, next) {
    try {
      const { email } = req.body;

      await this.#databaseService.unsubscribe(email);

      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }

  async sendEmails(_req, res, next) {
    try {
      const { payload, contentType } = await this.#sendService.sendEmails();
      res.set('Content-Type', contentType);
      res.status(200).send(payload);
    } catch (error) {
      next(error);
    }
  }
}
