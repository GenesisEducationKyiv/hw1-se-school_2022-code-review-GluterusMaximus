import ApiError from '../errors/ApiError.js';
import DatabaseService from '../services/DatabaseService.js';
import SendService from '../services/SendService.js';
import { validateEmail } from '../utils/validators.js';

class SubscriptionController {
  #sendService = new SendService();
  #databaseService = new DatabaseService();

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

  async sendEmails(_req, res, next) {
    try {
      const notSent = await this.#sendService.sendEmails();
      res.status(200).json({ notSent });
    } catch (error) {
      next(error);
    }
  }
}

export default new SubscriptionController();
