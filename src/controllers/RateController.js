export default class RateController {
  #rateService;

  constructor(rateService) {
    this.#rateService = rateService;
  }

  async getRate(_req, res, next) {
    try {
      const rate = await this.#rateService.getRate();
      res.status(200).json(rate);
    } catch (error) {
      next(error);
    }
  }
}
