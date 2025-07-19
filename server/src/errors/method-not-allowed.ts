import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from './error-handler';

/**
 * Custom error class for handling Method Not Allowed errors.
 * It extends the ApplicationError class and sets the status code to 405.
 * @class MethodNotAllowedError
 * @extends {ApplicationError}
 * @param {string} message - The error message.
 * @property {number} statusCode - The HTTP status code (405).
 */
export class MethodNotAllowedError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'MethodNotAllowedError';
    this.statusCode = 405;
  }

  statusCode: number;
}

/**
 * Type guard to check if an error is an instance of MethodNotAllowedError.
 * @param {Error} error - The error object to check.
 * @returns {boolean} - Returns true if the error is a MethodNotAllowedError, otherwise false.
 */
export function isMethodNotAllowedError(error: Error): error is MethodNotAllowedError {
  return error instanceof MethodNotAllowedError;
}

/**
 * Middleware to handle Method Not Allowed errors.
 * It creates a MethodNotAllowedError and sends a JSON response with the error details.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
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
