import { NextFunction, Request, Response } from 'express';
import { getUserData } from '../data/data-store';
import { VisaChatbotService } from '../services/visa-chatbot.service';

export class ChatBotController {
  async messageChatBot(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, message } = req.body;
      const userData = getUserData(userId);

      const bot = new VisaChatbotService(userData);
      const reply = await bot.getResponse(message);

      res.json({ reply });
    } catch (error) {
      next(error);
    }
  }

  async ping(_req: Request, res: Response) {
    res.json({ reply: 'Ping recieved' });
  }
}

export const chatBotController = new ChatBotController();
