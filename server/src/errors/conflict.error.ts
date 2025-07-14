import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from './error-handler';

export class ConflictError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }

  statusCode: number;
}

export function isConflictError(error: Error): error is ConflictError {
  return error instanceof ConflictError;
}

export function handleConflictError(req: Request, res: Response, next: NextFunction): void {
  const error = new ConflictError(`Conflict occurred at ${req.originalUrl}`);
  res.status(error.statusCode).json({
    error: {
      name: error.name,
      message: error.message,
    },
  });
  next(error);
}
