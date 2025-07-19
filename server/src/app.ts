import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './config/swagger';
import { errorHandler } from './errors/error-handler';
import { handleNotFoundError } from './errors/not-found.error';
import chatBotRouter from './routes/chat-bot.router';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/chat-bot', chatBotRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(handleNotFoundError);
app.use(errorHandler);

export default app;
