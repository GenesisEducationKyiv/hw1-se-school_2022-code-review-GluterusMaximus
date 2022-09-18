import express from 'express';
import RateController from '../controllers/RateController.js';
import EmailController from '../controllers/EmailController.js';
import multer from 'multer';
import RateService from '../services/RateService.js';
import EmailService from '../services/EmailService.js';
import EmailRepository from '../repositories/EmailRepository.js';
import SendService from '../services/SendService.js';
import { EMAILS_FILENAME, STORAGE_PATH } from '../constants/database.js';

const emailRepository = new EmailRepository(STORAGE_PATH, EMAILS_FILENAME);

const emailService = new EmailService(emailRepository);
const rateService = new RateService();
const sendService = new SendService(rateService, emailService);

const rateController = new RateController(rateService);
const emailController = new EmailController(sendService, emailService);

const router = express.Router();

router.get('/rate', rateController.getRate.bind(rateController));
router.post(
  '/subscribe',
  multer().none(),
  emailController.subscribe.bind(emailController)
);
router.post('/sendEmails', emailController.sendEmails.bind(emailController));

export default router;
