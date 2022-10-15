import express from 'express';
import RateController from '../controllers/RateController.js';
import EmailController from '../controllers/EmailController.js';
import multer from 'multer';
import RateService from '../services/RateService.js';
import EmailService from '../services/EmailService.js';
import EmailRepository from '../repositories/EmailRepository.js';
import SendService from '../services/SendService.js';
import { EMAILS_FILENAME, STORAGE_PATH } from '../constants/database.js';
import {
  MAIN_RATE_PROVIDER_CREATOR,
  SECONDARY_RATE_PROVIDER_CREATORS,
} from '../constants/rates.js';
import { setupResponsibilityChain } from './setupProviders.js';
import JsonPresenter from '../presenters/JsonPresenter.js';
import { RateFacade } from '../facades/RateFacade.js';
import UserSaga from '../sagas/UserSaga.js';
import CustomersFacade from '../facades/CustomersFacade.js';
import { CUSTOMERS_URL } from '../constants/customers.js';

const rateProvider = setupResponsibilityChain(
  MAIN_RATE_PROVIDER_CREATOR,
  SECONDARY_RATE_PROVIDER_CREATORS
);

const jsonPresenter = new JsonPresenter();

const emailRepository = new EmailRepository(STORAGE_PATH, EMAILS_FILENAME);

const emailService = new EmailService(emailRepository);
const rateService = new RateService(rateProvider, jsonPresenter);
const rateFacade = new RateFacade(rateService);
const customersFacade = new CustomersFacade(CUSTOMERS_URL);
const sendService = new SendService(rateFacade, emailRepository, jsonPresenter);

const userSaga = new UserSaga(emailService, customersFacade);

const rateController = new RateController(rateService);
const emailController = new EmailController(sendService, userSaga);

const router = express.Router();

router.get('/rate', rateController.getRate.bind(rateController));
router.post(
  '/subscribe',
  multer().none(),
  emailController.subscribe.bind(emailController)
);
router.post('/sendEmails', emailController.sendEmails.bind(emailController));

export default router;
