import { NextFunction, Request, Response } from 'express';
import { applicationFormService } from '../services/application-form.service';

export class ApplicationFormController {
  async submitForm(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, form } = req.body;
      const result = await applicationFormService.submitForm(form, userId);
      res.status(201).json({ result });
    } catch (error) {
      console.error('Error in form submission');
      next(error);
    }
  }

  async saveFormData(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, form } = req.body;
      const result = await applicationFormService.saveFormData(form, userId);
      res.status(201).json({ result });
    } catch (error) {
      console.error('Error in form submission');
      next(error);
    }
  }

  async getFormData(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const formData = await applicationFormService.getFormData(userId);
      res.json(formData);
    } catch (error) {
      next(error);
    }
  }
}

export const applicationFormController = new ApplicationFormController();
