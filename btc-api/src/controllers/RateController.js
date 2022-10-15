export default class RateController {
  #rateService;

  constructor(rateService) {
    this.#rateService = rateService;
  }

  async getRate(_req, res, next) {
    try {
      const { payload, contentType } = await this.#rateService.getRate();
      res.set('Content-Type', contentType);
      res.status(200).send(payload);
    } catch (error) {
      next(error);
    }
  }
}
