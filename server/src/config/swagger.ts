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
      },
      required: ['userId', 'message'],
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
