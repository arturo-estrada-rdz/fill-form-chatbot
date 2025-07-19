import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from './error-handler';

/**
 * Represents an HTTP 409 Conflict error.
 * Extends {@link ApplicationError} and sets statusCode to 409.
 */
export class ConflictError extends ApplicationError {
  /**
   * @param message - Error message describing the conflict.
   * Creates a new ConflictError.
   */
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }

  statusCode: number;
}

/**
 * Type guard to check if an error is a ConflictError.
 * @param error - The error to check.
 * @returns True if error is ConflictError, false otherwise.
 */
export function isConflictError(error: Error): error is ConflictError {
  return error instanceof ConflictError;
}

/**
 * Express middleware to handle ConflictError.
 * Responds with status 409 and error details.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
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
