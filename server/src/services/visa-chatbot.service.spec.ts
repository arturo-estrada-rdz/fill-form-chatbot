/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { openaiClient } from '../clients/openai.client';
import { ApplicationFormData } from '../types/form-data.models';
import { VisaChatbotService } from './visa-chatbot.service';

vi.mock('../clients/openai.client', () => ({
  openaiClient: {
    chat: {
      completions: {
        create: vi.fn(),
      },
    },
  },
}));

describe('VisaChatbotService', () => {
  let visaChatbotService: VisaChatbotService;

  const applicationFormData: ApplicationFormData = {};

  beforeEach(() => {
    visaChatbotService = new VisaChatbotService(applicationFormData, 'test-user-id');
  });

  describe('initialization', () => {
    it('should initialize with empty form data and chat history', () => {
      expect(visaChatbotService).toBeTruthy();
      expect(visaChatbotService).toBeDefined();
      expect(visaChatbotService).toBeInstanceOf(VisaChatbotService);
    });
  });

  describe('getResponse', () => {
    it('should return a response from OpenAI', async () => {
      const userMessage = 'What is the visa application process?';
      const mockResponse = {
        choices: [{ message: { content: 'The visa application process involves...' } }],
      };

      vi.spyOn(openaiClient.chat.completions, 'create').mockResolvedValue(mockResponse as any);

      const response = await visaChatbotService.getResponse(userMessage);
      expect(response.content).toBe('The visa application process involves...');
    });
  });

  it('should handle errors from OpenAI', async () => {
    const userMessage = 'What is the visa application process?';
    vi.spyOn(openaiClient.chat.completions, 'create').mockRejectedValue(new Error('OpenAI error'));

    await expect(visaChatbotService.getResponse(userMessage)).rejects.toThrow(
      'Sorry, the chatbot is unavailable at the moment'
    );
  });
});
