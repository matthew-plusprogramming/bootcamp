import { randomUUID } from 'node:crypto';

import { db, type Difficulty, type Exercise } from '../data/store';

export type ExerciseInput = {
  title: string;
  summary: string;
  difficulty: Difficulty;
  estMinutes: number;
  tags: string[];
};

export const listExercises = (): Exercise[] => Object.values(db.exercises);

export const getExerciseById = (id: string): Exercise | null =>
  db.exercises[id] ?? null;

export const createExercise = (input: ExerciseInput): Exercise => {
  const id = `ex-${randomUUID()}`;
  const exercise: Exercise = {
    id,
    ...input,
  };
  db.exercises[id] = exercise;
  return exercise;
};
