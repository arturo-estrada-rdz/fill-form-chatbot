import { NextFunction, Request, Response } from 'express';
import { getChatHistory as getChats, getUserData, userExists } from '../data/data-store';
import { NotFoundError } from '../errors/not-found.error';
import { VisaChatbotService } from '../services/visa-chatbot.service';

/**
 * Controller for chat bot API endpoints.
 * Handles messaging, ping, and chat history retrieval.
 */
export class ChatBotController {
  /**
   * Handles sending a message to the chat bot and returns its response.
   * @param req - Express request containing userId and message in body.
   * @param res - Express response.
   * @param next - Express next middleware function.
   */
  async messageChatBot(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, message } = req.body;
      const userFormData = getUserData(userId);

      const bot = new VisaChatbotService(userFormData, userId);
      const result = await bot.getResponse(message);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Health check endpoint for the chat bot service.
   * @param _req - Express request (unused).
   * @param res - Express response.
   */
  async ping(_req: Request, res: Response) {
    res.json({ reply: 'Ping recieved' });
  }

  /**
   * Retrieves chat history for a specific user.
   * Throws NotFoundError if user data does not exist.
   * @param req - Express request containing userId in params.
   * @param res - Express response.
   * @param next - Express next middleware function.
   */
  async getChatHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      if (!userExists(userId)) {
        throw new NotFoundError(`Chat for user with ID ${userId} not found`);
      }

      const chatHistory = getChats(userId);

      res.json(chatHistory);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves the user form data.
   * @param req - Express request containing userId in params.
   * @param res - Express response.
   * @param next - Express next middleware function.
   */
  async getFormData(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      if (!userExists(userId)) {
        throw new NotFoundError(`User with ID ${userId} not found`);
      }

      const formData = getUserData(userId);
      res.json(formData);
    } catch (error) {
      next(error);
    }
  }
}

/**
 * Singleton instance of ChatBotController.
 */
export const chatBotController = new ChatBotController();
