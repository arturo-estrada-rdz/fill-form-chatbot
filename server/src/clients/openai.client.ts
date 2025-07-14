import { OpenAI } from 'openai';
import { environment } from '../config/environment';

export const openaiClient = new OpenAI({
  apiKey: environment.openaiApiKey,
});
