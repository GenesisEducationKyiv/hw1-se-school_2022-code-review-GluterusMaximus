import ApiError from '../errors/ApiError.js';
import SubscriptionService from '../services/SubscriptionService.js';
import { validateEmail } from '../utils/validators.js';

class SubscriptionController {
  #subService = new SubscriptionService();

  async subscribe(req, res, next) {
    try {
      const { email } = req.body;

      if (!email || !validateEmail(email))
        throw new ApiError(400, 'Invalid email');

      await this.#subService.subscribe(email);
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }

  async sendEmails(_req, res, next) {
    try {
      const notSent = await this.#subService.sendEmails();
      res.status(200).json({ notSent });
    } catch (error) {
      next(error);
    }
  }
}

export default new SubscriptionController();
