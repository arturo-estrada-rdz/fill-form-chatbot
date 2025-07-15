import { NextFunction, Request, Response } from 'express';
import { getChatHistory as getChats, getUserData } from '../data/data-store';
import { VisaChatbotService } from '../services/visa-chatbot.service';

export class ChatBotController {
  async messageChatBot(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, message } = req.body;
      const userFormData = getUserData(userId);

      const bot = new VisaChatbotService(userFormData, userId);
      const reply = await bot.getResponse(message);

      res.json({ reply });
    } catch (error) {
      next(error);
    }
  }

  async ping(_req: Request, res: Response) {
    res.json({ reply: 'Ping recieved' });
  }

  async getChatHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const userData = getUserData(userId);

      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }

      const chatHistory = getChats(userId);

      res.json(chatHistory);
    } catch (error) {
      next(error);
    }
  }
}

export const chatBotController = new ChatBotController();
