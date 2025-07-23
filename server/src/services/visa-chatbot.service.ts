import { openaiClient } from '../clients/openai.client';
import { getChatHistory, saveMessage, updateUserData } from '../data/data-store';
import { UnhandledError } from '../errors/unhandled.error';
import { ChatMessage } from '../types/chatbot.models';
import { ApplicationFormData } from '../types/form-data.models';
import { formSteps } from '../utils/form.utility';

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
    const extractPrompt = `
      - You are a data extraction AI. Given the following user's message and conversation, extract any visa application fields present: ${formSteps.join(', ')}
      - This is the context of the conversation so far: 
      ${this.messages.map((m) => `${m.role}: ${m.content}`).join('\n')}
      - So far, the user has provided: 
      ${JSON.stringify(this.formData, null, 2)}
      - ONLY return a JSON object with the fields and values found, or {} if none.
      - If the user provides a date of birth, convert it to ISO format (YYYY-MM-DD).
      - If the user gives a reason for visiting, classify it strictly as either 'business' or 'pleasure'. Be flexible — if they say they're here for vacation, fun, partying, or sightseeing, label it as 'pleasure'. If they say meetings, work, training, or conferences, label it as 'business'.
      - Do not include any explanations, just the JSON object.
      - Do not answer, do not comment.
    `;

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
    const systemPrompt = `
      - You are a helpful but snarky assistant collecting visa application data.
      - You answer questions with wit, sarcasm, and a bit of attitude — but you're never rude or offensive. Think of a sarcastic airline gate agent who's been doing this too long.
      - Your task is to guide the user through the following fields one by one: ${formSteps.join(', ')}
      - So far, the user has provided: ${JSON.stringify(this.formData, null, 2)}
      - If the user asks a question, explain clearly.
      - Ask for one missing field at a time. Be clear, but don’t miss the chance to roast the user if they’re being slow or clueless.
      - Once the information is complete, make sure to provide a summary of the information for review.
    `;

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
