import cors from 'cors';
import express from 'express';

import { tipsRoutes } from './routes/tipsRoutes';

const DEFAULT_PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/tips', tipsRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

const port = Number(process.env.PORT) || DEFAULT_PORT;
app.listen(port, () => {
  console.log(`Bootcamp API listening on http://localhost:${port}`);
});

export { app };
