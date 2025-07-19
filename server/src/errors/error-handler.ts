import { NextFunction, Request, Response } from 'express';

/**
 * Custom error class for handling application errors.
 * It extends the built-in Error class and includes a status code.
 * @class ApplicationError
 * @extends {Error}
 */
export class ApplicationError extends Error {
  statusCode: number;
  details?: unknown;

  /**
   * Creates an instance of ApplicationError.
   * @param {string} message - The error message.
   * @param {number} [statusCode=500] - The HTTP status code (default is 500).
   */
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApplicationError';
  }
}

/**
 * Error handler middleware for Express applications.
 * It catches errors and sends a standardized JSON response.
 * @param {ApplicationError} err - The error object.
 * @param {Request} _ - The request object (not used).
 * @param {Response} res - The response object.
 */
export const errorHandler = (
  err: ApplicationError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction // express users arity to recognize this as an error handler even though it is not used
) => {
  console.error('Error occurred:', err);
  res.status(err.statusCode || 500).json({
    error: {
      name: err.name,
      message: err.message,
      statusCode: err.statusCode || 500,
      details: err.details || undefined, // Include details if available
    },
  });
};
