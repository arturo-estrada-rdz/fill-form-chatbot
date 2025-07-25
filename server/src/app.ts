import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { environment } from './config/environment';
import { swaggerDocs } from './config/swagger';
import { errorHandler } from './errors/error-handler';
import { handleNotFoundError } from './errors/not-found.error';
import formRouter from './routes/application-form.router';
import chatBotRouter from './routes/chat-bot.router';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/chat-bot', chatBotRouter);
app.use('/api/form', formRouter);

if (environment.nodeEnv !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

app.use(handleNotFoundError);
app.use(errorHandler);

export default app;
