import { openaiClient } from '../clients/openai.client';
import { getChatHistory, saveMessage, updateUserData } from '../data/data-store';
import { UnhandledError } from '../errors/unhandled.error';
import { ChatMessage } from '../types/chatbot.models';
import { ApplicationFormData } from '../types/form-data.models';
import { formSteps } from '../utils/form.utility';
import { hbsCompiler } from '../utils/hbs-compile.utility';

/**
 * Service for managing visa chatbot interactions.
 * Handles user messages, extracts form data, and generates assistant replies using OpenAI.
 */
export class VisaChatbotService {
  private formData: ApplicationFormData;
  private messages: ChatMessage[];
  private userId: string;

  /**
   * Constructs a VisaChatbotService instance for a user.
   * @param formData - The user's current visa application data.
   * @param userId - The user's unique identifier.
   */
  constructor(formData: ApplicationFormData, userId: string) {
    this.formData = formData;
    this.userId = userId;
    this.messages = getChatHistory(userId) || [];
  }

  /**
   * Uses OpenAI to extract visa application fields from a user's message.
   * @param userMessage - The user's message text.
   * @returns Partial form data extracted from the message.
   */
  private async extractDataFromMessage(userMessage: string): Promise<Partial<ApplicationFormData>> {
    const extractPrompt = await hbsCompiler('system.prompt.md', 'system-prompts', {
      conversation: this.messages.map((m) => `${m.role}: ${m.content}`).join('\n'),
      formData: JSON.stringify(this.formData, null, 2),
    });

    const completion = await openaiClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: extractPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0,
    });

    const content = completion.choices[0].message?.content ?? '{}';

    try {
      return JSON.parse(content);
    } catch {
      return {};
    }
  }

  /**
   * Generates a witty assistant reply using OpenAI, guiding the user through the visa application.
   * @returns Assistant chat message.
   */
  private async getSystemReply(): Promise<ChatMessage> {
    const systemPrompt = await hbsCompiler('form-assistant.prompt.md', 'system-prompts', {
      formSteps: formSteps.join(', '),
      formData: JSON.stringify(this.formData, null, 2),
    });

    const chat = await openaiClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: systemPrompt }, ...this.messages],
      temperature: 0.5,
    });

    const reply = chat.choices[0].message?.content ?? 'Sorry, no response.';

    return {
      role: 'assistant',
      content: reply,
      createdAt: new Date(),
    };
  }

  /**
   * Processes a user message: extracts data, updates user state, and returns the assistant's reply.
   * @param userMessage - The user's message text.
   * @returns The assistant's reply as a string.
   * @throws UnhandledError if OpenAI or processing fails.
   */
  async getResponse(userMessage: string): Promise<ChatMessage> {
    try {
      const messageFromUser: ChatMessage = {
        role: 'user',
        content: userMessage,
        createdAt: new Date(),
      };

      this.messages.push(messageFromUser);

      const fields = await this.extractDataFromMessage(userMessage);
      for (const [key, value] of Object.entries(fields)) {
        updateUserData(this.userId, key as keyof ApplicationFormData, value as string);
      }

      const reply = await this.getSystemReply();

      this.messages.push(reply);

      saveMessage(this.userId, messageFromUser); // Save user message
      saveMessage(this.userId, reply); // Save assistant reply

      return reply;
    } catch (error) {
      console.error('Error in VisaChatbotService:', error);
      throw new UnhandledError('Sorry, the chatbot is unavailable at the moment');
    }
  }
}
