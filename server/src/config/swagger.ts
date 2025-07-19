import swaggerJSDoc, { Components, Options } from 'swagger-jsdoc';
import { environment } from './environment';

const components: Components = {
  schemas: {
    ErrorResponse: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            message: {
              type: 'string',
            },
            statusCode: {
              type: 'integer',
            },
          },
          required: ['name', 'message'],
        },
      },
    },
    ChatMessage: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          example: '12345',
          description: 'The ID of the user sending the message',
        },
        message: {
          type: 'string',
          example: 'Hello, I need help with something.',
          description: 'The message content sent to the chat bot',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2023-10-01T12:00:00Z',
          description: 'The timestamp when the message was created',
        },
      },
      required: ['userId', 'message'],
    },
    ChatResponse: {
      type: 'object',
      properties: {
        reply: {
          type: 'string',
          example: 'Hello, how can I assist you today?',
          description: 'The response message from the chat bot',
        },
      },
    },
    ChatHistory: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/ChatMessage',
      },
      description: 'An array of chat messages for a user',
    },
    ApplicationFormData: {
      type: 'object',
      properties: {
        fullName: {
          type: 'string',
          example: 'John Doe',
          description: 'The name of the applicant',
        },
        dateOfBirth: {
          type: 'string',
          format: 'date',
          example: '1990-01-01',
          description: 'The date of birth of the applicant',
        },
        passportNumber: {
          type: 'string',
          example: 'A12345678',
          description: 'The passport number of the applicant',
        },
        nationality: {
          type: 'string',
          example: 'American',
          description: 'The nationality of the applicant',
        },
        purposeOfVisit: {
          type: 'string',
          example: 'Tourism',
          description: 'The purpose of the applicant’s visit',
        },
        durationOfStay: {
          type: 'string',
          example: '2 weeks',
          description: 'The duration of the applicant’s stay',
        },
        contactInfo: {
          type: 'string',
          example: 'john.doe@domain.com',
          description: 'The contact information of the applicant',
        },
      },
    },
  },
};

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Fill Form Chatbot API',
      version: '1.0.0',
      description: 'API documentation for the Fill Form Chatbot application',
    },
    servers: [{ url: `http://localhost:${environment.port}`, description: 'Development server' }],
    components,
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
