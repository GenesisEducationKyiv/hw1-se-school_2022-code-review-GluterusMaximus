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

  async getEmails() {
    return this.#emailRepository.getAll();
  }
}
