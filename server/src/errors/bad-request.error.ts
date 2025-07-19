import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from './error-handler';

/**
 * Represents an HTTP 400 Bad Request error.
 * Extends {@link ApplicationError} and sets statusCode to 400.
 */
export class BadRequestError extends ApplicationError {
  /**
   * Creates a new BadRequestError.
   * @param message - Error message describing the bad request.
   */
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }

  statusCode: number;
}

/**
 * Type guard to check if an error is a BadRequestError.
 * @param error - The error to check.
 * @returns True if error is BadRequestError, false otherwise.
 */
export function isBadRequestError(error: Error): error is BadRequestError {
  return error instanceof BadRequestError;
}

/**
 * Express middleware to handle BadRequestError.
 * Responds with status 400 and error details.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
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
