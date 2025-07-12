import cors from 'cors';
import express from 'express';
import chatBotRouter from './routes/chat-bot.router';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/chat-bot', chatBotRouter);

app.use('/', (req, res) => {
  res.send('API is working');
});

export default app;
