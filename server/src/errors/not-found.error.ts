import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from './error-handler';

export class NotFoundError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }

  statusCode: number;
}

export function isNotFoundError(error: Error): error is NotFoundError {
  return error instanceof NotFoundError;
}

export function handleNotFoundError(req: Request, res: Response, next: NextFunction): void {
  const error = new NotFoundError(`Resource not found at ${req.originalUrl}`);
  res.status(error.statusCode).json({
    error: {
      name: error.name,
      message: error.message,
    },
  });
  next(error);
}
