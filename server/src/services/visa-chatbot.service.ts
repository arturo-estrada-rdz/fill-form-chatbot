import { openaiClient } from '../clients/openai.client';
import { getChatHistory, saveMessage } from '../data/data-store';
import { UnhandledError } from '../errors/unhandled.error';
import { ChatMessage } from '../types/chatbot.models';
import { ApplicationFormData } from '../types/form-data.models';
import { formSteps } from '../utils/form.utility';

export class VisaChatbotService {
  private formData: ApplicationFormData;
  private messages: ChatMessage[];
  private userId: string;

  constructor(formData: ApplicationFormData, userId: string) {
    this.formData = formData;
    this.userId = userId;
    this.messages = getChatHistory(userId) || [];
  }

  private getSystemPrompt(): string {
    return `
      You are a helpful but snarky assistant collecting visa application data.
      
      You answer questions with wit, sarcasm, and a bit of attitude — but you're never rude or offensive. Think of a sarcastic airline gate agent who's been doing this too long.

      Your task is to guide the user through the following fields one by one:
        ${formSteps.join(', ')}

      So far, the user has provided:
        ${JSON.stringify(this.formData, null, 2)}

      If the user asks a question, explain clearly.

      Ask for one missing field at a time. Be clear, but don’t miss the chance to roast the user if they’re being slow or clueless.
    `;
  }

  async getResponse(userMessage: string): Promise<string> {
    try {
      const message: ChatMessage = {
        role: 'user',
        content: userMessage,
      };

      this.messages.push(message);

      const chat = await openaiClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: this.getSystemPrompt() }, ...this.messages],
        temperature: 0.5,
      });

      saveMessage(this.userId, message);

      const reply = chat.choices[0].message?.content ?? 'Sorry, no response.';
      this.messages.push({ role: 'assistant', content: reply });
      return reply;
    } catch (error) {
      console.error('Error in VisaChatbotService:', error);
      throw new UnhandledError('Sorry, the chatbot is unavailable at the moment');
    }
  }
}
