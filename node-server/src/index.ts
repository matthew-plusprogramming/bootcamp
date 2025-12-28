import cors from 'cors';
import express from 'express';

import {
  createExercise,
  getExerciseById,
  listExercises,
  type ExerciseInput,
} from './services/exercises';

const DEFAULT_PORT = 3001;
const VALID_DIFFICULTIES = new Set(['intro', 'practice', 'stretch']);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const parseExerciseInput = (
  body: unknown,
):
  | { ok: true; value: ExerciseInput }
  | { ok: false; error: string } => {
  if (!isRecord(body)) {
    return { ok: false, error: 'Request body must be an object.' };
  }

  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const summary = typeof body.summary === 'string' ? body.summary.trim() : '';

  if (!title) {
    return { ok: false, error: 'Title is required.' };
  }

  if (!summary) {
    return { ok: false, error: 'Summary is required.' };
  }

  const difficultyRaw =
    typeof body.difficulty === 'string'
      ? body.difficulty.toLowerCase()
      : 'intro';
  const difficulty = VALID_DIFFICULTIES.has(difficultyRaw)
    ? (difficultyRaw as ExerciseInput['difficulty'])
    : 'intro';

  const estMinutesRaw = body.estMinutes;
  const estMinutes =
    typeof estMinutesRaw === 'number' && Number.isFinite(estMinutesRaw)
      ? Math.max(5, Math.round(estMinutesRaw))
      : 30;

  const tags = Array.isArray(body.tags)
    ? body.tags
        .filter((tag) => typeof tag === 'string')
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  return {
    ok: true,
    value: {
      title,
      summary,
      difficulty,
      estMinutes,
      tags,
    },
  };
};

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/exercises', (_req, res) => {
  res.json(listExercises());
});

app.get('/exercises/:id', (req, res) => {
  const exercise = getExerciseById(req.params.id);
  if (!exercise) {
    res.status(404).json({ error: 'Exercise not found.' });
    return;
  }
  res.json(exercise);
});

app.post('/exercises', (req, res) => {
  const parsed = parseExerciseInput(req.body);
  if (!parsed.ok) {
    res.status(400).json({ error: parsed.error });
    return;
  }

  const created = createExercise(parsed.value);
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
