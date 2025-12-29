import cors from 'cors';
import express from 'express';

import {
  createTip,
  getTipById,
  listTips,
  type TipInput,
} from './services/tips';

const DEFAULT_PORT = 3001;
const VALID_TOPICS = new Set(['mindset', 'workflow', 'craft']);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const parseTipInput = (
  body: unknown,
):
  | { ok: true; value: TipInput }
  | { ok: false; error: string } => {
  if (!isRecord(body)) {
    return { ok: false, error: 'Request body must be an object.' };
  }

  const headline =
    typeof body.headline === 'string' ? body.headline.trim() : '';
  const summary = typeof body.summary === 'string' ? body.summary.trim() : '';

  if (!headline) {
    return { ok: false, error: 'Headline is required.' };
  }

  if (!summary) {
    return { ok: false, error: 'Summary is required.' };
  }

  const authorRaw = typeof body.author === 'string' ? body.author.trim() : '';
  const author = authorRaw || 'Mentor';

  const topicRaw =
    typeof body.topic === 'string' ? body.topic.toLowerCase() : 'workflow';
  const topic = VALID_TOPICS.has(topicRaw)
    ? (topicRaw as TipInput['topic'])
    : 'workflow';

  const readMinutesRaw = body.readMinutes;
  const readMinutes =
    typeof readMinutesRaw === 'number' && Number.isFinite(readMinutesRaw)
      ? Math.max(2, Math.round(readMinutesRaw))
      : 4;

  const tags = Array.isArray(body.tags)
    ? body.tags
        .filter((tag) => typeof tag === 'string')
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  return {
    ok: true,
    value: {
      headline,
      summary,
      topic,
      readMinutes,
      tags,
      author,
    },
  };
};

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/tips', (_req, res) => {
  res.json(listTips());
});

app.get('/tips/:id', (req, res) => {
  const tip = getTipById(req.params.id);
  if (!tip) {
    res.status(404).json({ error: 'Tip not found.' });
    return;
  }
  res.json(tip);
});

app.post('/tips', (req, res) => {
  const parsed = parseTipInput(req.body);
  if (!parsed.ok) {
    res.status(400).json({ error: parsed.error });
    return;
  }

  const created = createTip(parsed.value);
  res.status(201).json(created);
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

const port = Number(process.env.PORT) || DEFAULT_PORT;
app.listen(port, () => {
  console.log(`Bootcamp API listening on http://localhost:${port}`);
});

export { app };
