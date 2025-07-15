import express from 'express';
import { chatBotController } from '../controllers/chat-bot.controller';
import { handleMethodNotAllowedError } from '../errors/method-not-allowed';

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

router.get('/:userId', chatBotController.getChatHistory);

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
 *               type: object
 *               properties:
 *                 reply:
 *                   type: string
 *                   example: Hello, how can I assist you today?
 *       405:
 *         description: Method Not Allowed
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
router.post('/', chatBotController.messageChatBot);

router.all('/', handleMethodNotAllowedError);

export default router;
