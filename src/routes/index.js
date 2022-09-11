import express from 'express';
import RateController from '../controllers/RateController.js';
import SubscriptionController from '../controllers/SubscriptionController.js';
import multer from 'multer';
import RateService from '../services/RateService.js';
import DatabaseService from '../services/DatabaseService.js';
import SendService from '../services/SendService.js';

const sendService = new SendService(new RateService(), new DatabaseService());
const rateController = new RateController(new RateService());
const subscriptionController = new SubscriptionController(
  sendService,
  new DatabaseService()
);

const router = express.Router();

router.get('/rate', rateController.getRate.bind(rateController));
router.post(
  '/subscribe',
  multer().none(),
  subscriptionController.subscribe.bind(subscriptionController)
);
router.post(
  '/sendEmails',
  subscriptionController.sendEmails.bind(subscriptionController)
);

export default router;
