import ApiError from '../errors/ApiError.js';
import { validateEmail } from '../utils/validators.js';

export default class EmailController {
  #sendService;
  #userSaga;

  constructor(sendService, userSaga) {
    this.#sendService = sendService;
    this.#userSaga = userSaga;
  }

  async subscribe(req, res, next) {
    try {
      const { email } = req.body;

      if (!email || !validateEmail(email))
        throw new ApiError(400, 'Invalid email');

      await this.#userSaga.execute({ email });
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
