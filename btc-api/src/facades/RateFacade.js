export class RateFacade {
  #rateService;

  constructor(rateService) {
    this.#rateService = rateService;
  }

  async getRate(to, from) {
    return this.#rateService.getRate(to, from);
  }
}
