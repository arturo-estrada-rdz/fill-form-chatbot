import dotenv from 'dotenv';

dotenv.config();

export interface Environment {
  port: number | string;
  nodeEnv: string;
  apiUrl: string;
  openaiApiKey: string;
}

export const environment: Environment = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiUrl: process.env.API_URL || 'http://localhost:3000/api',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
};
