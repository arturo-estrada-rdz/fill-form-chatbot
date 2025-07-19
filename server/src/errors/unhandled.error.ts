import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from './error-handler';

/**
 * Custom error class for handling Unhandled errors.
 * It extends the ApplicationError class and sets the status code to 500.
 * @class UnhandledError
 * @extends {ApplicationError}
 * @param {string} message - The error message.
 * @property {number} statusCode - The HTTP status code (500).
 */
export class UnhandledError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'UnhandledError';
    this.statusCode = 500;
  }

  statusCode: number;
}

/**
 * Type guard to check if an error is an instance of UnhandledError.
 * @param {Error} error - The error object to check.
 * @returns {boolean} - Returns true if the error is an UnhandledError, otherwise false.
 */
export function isUnhandledError(error: Error): error is UnhandledError {
  return error instanceof UnhandledError;
}

/**
 * Middleware to handle Unhandled errors.
 * It creates an UnhandledError and sends a JSON response with the error details.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
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
