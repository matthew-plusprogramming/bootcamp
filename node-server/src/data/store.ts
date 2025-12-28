export type Difficulty = 'intro' | 'practice' | 'stretch';

export type Exercise = {
  id: string;
  title: string;
  summary: string;
  difficulty: Difficulty;
  estMinutes: number;
  tags: string[];
};

const seedExercises: Exercise[] = [
  {
    id: 'ex-101',
    title: 'Branch and Merge Warmup',
    summary: 'Create a feature branch, make a small change, and merge it back.',
    difficulty: 'intro',
    estMinutes: 20,
    tags: ['git', 'branches'],
  },
  {
    id: 'ex-204',
    title: 'Fix the CSS Button Bug',
    summary: 'Track down a broken style and make the button readable again.',
    difficulty: 'practice',
    estMinutes: 30,
    tags: ['frontend', 'css'],
  },
  {
    id: 'ex-310',
    title: 'Add a New API Route',
    summary: 'Create a new endpoint that reuses the existing service helpers.',
    difficulty: 'stretch',
    estMinutes: 40,
    tags: ['backend', 'express'],
  },
];

const exercises: Record<string, Exercise> = seedExercises.reduce(
  (acc, exercise) => {
    acc[exercise.id] = exercise;
    return acc;
  },
  {} as Record<string, Exercise>,
);

export const db = {
  exercises,
};

export const resetExercises = (): void => {
  Object.keys(exercises).forEach((key) => delete exercises[key]);
  seedExercises.forEach((exercise) => {
    exercises[exercise.id] = exercise;
  });
};

export { seedExercises };
