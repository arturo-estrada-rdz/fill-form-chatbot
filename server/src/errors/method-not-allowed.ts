import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from './error-handler';

export class MethodNotAllowedError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'MethodNotAllowedError';
    this.statusCode = 405;
  }

  statusCode: number;
}

export function isMethodNotAllowedError(error: Error): error is MethodNotAllowedError {
  return error instanceof MethodNotAllowedError;
}

export function handleMethodNotAllowedError(req: Request, res: Response, next: NextFunction): void {
  const error = new MethodNotAllowedError(`Method ${req.method} Not Allowed on ${req.originalUrl}`);
  res.status(error.statusCode).json({
    error: {
      name: error.name,
      message: error.message,
    },
  });
  next(error);
}
