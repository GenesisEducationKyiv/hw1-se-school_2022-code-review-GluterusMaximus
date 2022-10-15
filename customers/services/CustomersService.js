export default class CustomersService {
  #customersRepository;

  constructor(customersRepository) {
    this.#customersRepository = customersRepository;
  }

  async add(email) {
    if (await this.#customersRepository.includes(email))
      throw new Error('Email already subscribed');

    await this.#customersRepository.add(email);
  }

  async remove(email) {
    if (!(await this.#customersRepository.includes(email)))
      throw new Error('Email not subscribed');

    await this.#customersRepository.remove(email);
  }
}
