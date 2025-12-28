'use client';

import { useEffect, useState } from 'react';

import styles from './LiveExercises.module.scss';

type Exercise = {
  id: string;
  title: string;
  summary: string;
  difficulty: string;
  estMinutes: number;
  tags: string[];
};

type LoadState = 'loading' | 'ready' | 'error';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

const toTitleCase = (value: string): string =>
  value ? value[0].toUpperCase() + value.slice(1) : value;

const LiveExercises = (): JSX.Element => {
  const [state, setState] = useState<LoadState>('loading');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadExercises = async (): Promise<void> => {
      try {
        const response = await fetch(`${API_URL}/exercises`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`API responded with ${response.status}`);
        }

        const data = (await response.json()) as unknown;
        if (!Array.isArray(data)) {
          throw new Error('API payload was not a list.');
        }

        const normalized = data.filter(
          (item): item is Exercise =>
            typeof item === 'object' && item !== null && 'id' in item,
        );

        setExercises(normalized);
        setState('ready');
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        setErrorMessage(
          'Could not reach the API. Start the node-server to see seeded data.',
        );
        setState('error');
      }
    };

    loadExercises();

    return () => {
      controller.abort();
    };
  }, []);

  if (state === 'loading') {
    return <p className={styles.status}>Loading exercises from the API...</p>;
  }

  if (state === 'error') {
    return (
      <div className={styles.error}>
        <p>{errorMessage}</p>
        <p className={styles.hint}>
          Expected base URL: <code>{API_URL}</code>
        </p>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <p className={styles.status}>
        No exercises yet. Add one with a POST to <code>/exercises</code>.
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {exercises.map((exercise) => (
        <article className={styles.card} key={exercise.id}>
          <div className={styles.cardHeader}>
            <span className={styles.difficulty}>
              {toTitleCase(exercise.difficulty)}
            </span>
            <span className={styles.time}>{exercise.estMinutes} min</span>
          </div>
          <h3>{exercise.title}</h3>
          <p>{exercise.summary}</p>
          <div className={styles.tags}>
            {exercise.tags?.map((tag) => (
              <span key={`${exercise.id}-${tag}`}>{tag}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
};

export { LiveExercises };
