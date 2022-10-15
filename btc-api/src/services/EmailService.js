import ApiError from '../errors/ApiError.js';

export default class EmailService {
  #emailRepository;

  constructor(emailRepository) {
    this.#emailRepository = emailRepository;
  }

  async subscribe(email) {
    if (await this.#emailRepository.includes(email))
      throw ApiError.conflict('Email already subscribed');

    await this.#emailRepository.push(email);
  }

  async unsubscribe(email) {
    if (!(await this.#emailRepository.includes(email)))
      throw ApiError.badRequest('Email not subscribed');

    await this.#emailRepository.remove(email);
  }

  async getEmails() {
    return this.#emailRepository.getAll();
  }
}
