import { NextFunction, Request, Response } from 'express';
import { ValidationChain } from 'express-validator/lib/chain';
import { validationResult } from 'express-validator/lib/validation-result';
import { BadRequestError } from '../errors/bad-request.error';

/**
 * Middleware generator for validating Express requests using express-validator.
 *
 * @param validations - Array of ValidationChain objects specifying validation rules.
 * @returns Express middleware that runs validations and throws BadRequestError if validation fails.
 *
 * Usage:
 *   app.post('/route', validate([body('field').notEmpty()]), handler);
 *
 * If validation fails, responds with a BadRequestError containing details.
 */
export function validate(validations: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations in parallel
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);

    // If there are errors, throw a BadRequestError with details
    if (!errors.isEmpty()) {
      const details = errors.array();
      const error = new BadRequestError(`Validation failed at ${req.path}`);
      error.details = details;
      throw error;
    }

    // If no errors, proceed to the next middleware
    next();
  };
}
