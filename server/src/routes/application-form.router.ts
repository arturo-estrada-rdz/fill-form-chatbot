import express from 'express';
import { applicationFormController } from '../controllers/application-form.controller';
import { handleMethodNotAllowedError } from '../errors/method-not-allowed';

const router = express.Router();

/**
 * @openapi
 * /api/form/{userId}:
 *   get:
 *     summary: Get form data for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's unique identifier
 *     responses:
 *       200:
 *         description: User form data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApplicationFormData'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:userId', applicationFormController.getFormData);

/**
 * @openapi
 * /api/form/:
 *   post:
 *     summary: Submit a completed application form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user's unique identifier
 *               form:
 *                 $ref: '#/components/schemas/ApplicationFormData'
 *     responses:
 *       201:
 *         description: Form submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', applicationFormController.submitForm);

/**
 * @openapi
 * /api/form/draft:
 *   post:
 *     summary: Save a draft of the application form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user's unique identifier
 *               form:
 *                 $ref: '#/components/schemas/ApplicationFormData'
 *     responses:
 *       200:
 *         description: Draft saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/draft', applicationFormController.saveFormData);

router.all('/:userId', handleMethodNotAllowedError);
router.all('/', handleMethodNotAllowedError);
router.all('/draft', handleMethodNotAllowedError);

export default router;
