import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from './error-handler';

/**
 * Custom error class for handling Not Found errors.
 * It extends the ApplicationError class and sets the status code to 404.
 * @class NotFoundError
 * @extends {ApplicationError}
 * @param {string} message - The error message.
 * @property {number} statusCode - The HTTP status code (404).
 */
export class NotFoundError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }

  statusCode: number;
}

/**
 * Type guard to check if an error is an instance of NotFoundError.
 * @param {Error} error - The error object to check.
 * @returns {boolean} - Returns true if the error is a NotFoundError, otherwise false.
 */
export function isNotFoundError(error: Error): error is NotFoundError {
  return error instanceof NotFoundError;
}

/**
 * Middleware to handle Not Found errors.
 * It creates a NotFoundError and sends a JSON response with the error details.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
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
