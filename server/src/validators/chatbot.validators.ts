import { body, param } from 'express-validator/lib/middlewares/validation-chain-builders';

export const chatbotMessageValidators = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('message').notEmpty().withMessage('Message is required'),
];

export const chatbotHistoryValidators = [
  param('userId').notEmpty().withMessage('User ID is required'),
];
