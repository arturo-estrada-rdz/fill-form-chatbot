import { openaiClient } from '../clients/openai.client';
import { UnhandledError } from '../errors/unhandled.error';
import { ChatMessage } from '../types/chatbot.models';
import { ApplicationFormData } from '../types/form-data.models';
import { formSteps } from '../utils/form.utility';

export class VisaChatbotService {
  private formData: ApplicationFormData;
  private messages: ChatMessage[];

  constructor(formData: ApplicationFormData) {
    this.formData = formData;
    this.messages = [];
  }

  private getSystemPrompt(): string {
    return `
      You are a helpful assistant collecting visa application data.

      Your task is to guide the user through the following fields one by one:
        ${formSteps.join(', ')}

      So far, the user has provided:
        ${JSON.stringify(this.formData, null, 2)}

      If the user asks a question, explain clearly.

      If they provide data, confirm and ask for the next field.
    `;
  }

  async getResponse(userMessage: string): Promise<string> {
    try {
      this.messages.push({ role: 'user', content: userMessage });

      const chat = await openaiClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: this.getSystemPrompt() }, ...this.messages],
        temperature: 0.5,
      });

      const reply = chat.choices[0].message?.content ?? 'Sorry, no response.';
      this.messages.push({ role: 'assistant', content: reply });
      return reply;
    } catch (error) {
      console.error('Error in VisaChatbotService:', error);
      throw new UnhandledError('Sorry, the chatbot is unavailable at the moment');
    }
  }
}
