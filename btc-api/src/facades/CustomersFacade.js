import undici from 'undici';

export default class RateFacade {
  #customersUrl;

  constructor(customersUrl) {
    this.#customersUrl = customersUrl;
  }

  async add(email) {
    const config = {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await undici.request(`${this.#customersUrl}/add`, config);
  }

  async remove(email) {
    const config = {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await undici.request(`${this.#customersUrl}/remove`, config);
  }
}
