import RateService from '../services/RateService.js';

class RateController {
  #rateService = new RateService();

  async getRate(_req, res, next) {
    try {
      const rate = await this.#rateService.getRate();
      res.status(200).json(rate);
    } catch (error) {
      next(error);
    }
  }
}

export default new RateController();
