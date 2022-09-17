import express from 'express';
import RateController from '../controllers/RateController.js';
import EmailController from '../controllers/EmailController.js';
import multer from 'multer';
import RateService from '../services/RateService.js';
import DatabaseService from '../services/DatabaseService.js';
import SendService from '../services/SendService.js';

const sendService = new SendService(new RateService(), new DatabaseService());
const rateController = new RateController(new RateService());
const emailController = new EmailController(sendService, new DatabaseService());

const router = express.Router();

router.get('/rate', rateController.getRate.bind(rateController));
router.post(
  '/subscribe',
  multer().none(),
  emailController.subscribe.bind(emailController)
);
router.post('/sendEmails', emailController.sendEmails.bind(emailController));

export default router;
