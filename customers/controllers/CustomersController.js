export default class CustomersController {
  #databaseService;

  constructor(databaseService) {
    this.#databaseService = databaseService;
  }

  async add(req, res) {
    try {
      const { email } = req.body;

      await this.#databaseService.add(email);

      res.status(200).end();
    } catch (error) {
      res.status(400).json({
        message: `Could not add user: ${error.message ?? 'Unknown error'}`,
      });
    }
  }

  async remove(req, res) {
    try {
      const { email } = req.body;

      await this.#databaseService.remove(email);

      res.status(200).end();
    } catch (error) {
      res.status(400).json({
        message: `Could not remove user: ${error.message ?? 'Unknown error'}`,
      });
    }
  }
}
