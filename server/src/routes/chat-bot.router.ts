import express from 'express';
import { chatBotController } from '../controllers/chat-bot.controller';
import { handleMethodNotAllowedError } from '../errors/method-not-allowed';
import {
  chatbotHistoryValidators,
  chatbotMessageValidators,
} from '../validators/chatbot.validators';
import { validate } from '../validators/validate';

const router = express.Router();

/**
 * @openapi
 * /api/chat-bot:
 *   get:
 *     summary: Ping the chat bot service
 *     responses:
 *       200:
 *         description: Service is up and running
 */
router.get('/', chatBotController.ping);

/**
 * @openapi
 * /api/chat-bot/{userId}:
 *   get:
 *     summary: Get chat history for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's unique identifier
 *     responses:
 *       200:
 *         description: Chat history for the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatHistory'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:userId', validate(chatbotHistoryValidators), chatBotController.getChatHistory);

/**
 * @openapi
 * /api/chat-bot:
 *   post:
 *     summary: Send a message to the chat bot
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatMessage'
 *     responses:
 *       200:
 *         description: Response from the chat bot
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', validate(chatbotMessageValidators), chatBotController.messageChatBot);

/**
 * @openapi
 * /api/chat-bot/form-data/{userId}:
 *   get:
 *     summary: Get form data for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's unique identifier
 *     responses:
 *       200:
 *         description: User form data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApplicationFormData'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/form-data/:userId', chatBotController.getFormData);

router.all('/', handleMethodNotAllowedError);

export default router;
