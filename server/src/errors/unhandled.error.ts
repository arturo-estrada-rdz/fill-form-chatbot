import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from './error-handler';

export class UnhandledError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'UnhandledError';
    this.statusCode = 500;
  }

  statusCode: number;
}

export function isUnhandledError(error: Error): error is UnhandledError {
  return error instanceof UnhandledError;
}

export function handleUnhandledError(req: Request, res: Response, next: NextFunction): void {
  const error = new UnhandledError(`Unhandled error at ${req.originalUrl}`);
  res.status(error.statusCode).json({
    error: {
      name: error.name,
      message: error.message,
    },
  });
  next(error);
}
