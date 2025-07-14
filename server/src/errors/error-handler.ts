import { Request, Response } from 'express';

export class ApplicationError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApplicationError';
  }
}

export const errorHandler = (err: ApplicationError, _: Request, res: Response) => {
  console.error('Error occurred:', err);
  res.status(err.statusCode || 500).json({
    error: {
      name: err.name,
      message: err.message,
      statusCode: err.statusCode || 500,
    },
  });
};
