import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from './error-handler';

export class BadRequestError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }

  statusCode: number;
}

export function isBadRequestError(error: Error): error is BadRequestError {
  return error instanceof BadRequestError;
}

export function handleBadRequestError(req: Request, res: Response, next: NextFunction): void {
  const error = new BadRequestError(`Bad request at ${req.originalUrl}`);
  res.status(error.statusCode).json({
    error: {
      name: error.name,
      message: error.message,
    },
  });
  next(error);
}
