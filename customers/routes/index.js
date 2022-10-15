import express from 'express';
import { CUSTOMERS_FILENAME, STORAGE_PATH } from '../constants/database.js';
import CustomersController from '../controllers/CustomersController.js';
import CustomersRepository from '../repositories/CustomersRepository.js';
import CustomersService from '../services/CustomersService.js';

const customersRepository = new CustomersRepository(
  STORAGE_PATH,
  CUSTOMERS_FILENAME
);
const customersService = new CustomersService(customersRepository);
const customersController = new CustomersController(customersService);

const router = express.Router();

router.post('/add', customersController.add.bind(customersController));
router.post('/remove', customersController.remove.bind(customersController));

export default router;
