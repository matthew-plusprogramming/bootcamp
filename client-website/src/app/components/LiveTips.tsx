'use client';

import { useEffect, useState } from 'react';

import { MentorTipCard, type MentorTip } from './MentorTipCard';
import styles from './LiveTips.module.scss';

type LoadState = 'loading' | 'ready' | 'error';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
const TOPIC_OPTIONS = [
  { value: 'all', label: 'All topics' },
  { value: 'mindset', label: 'Mindset' },
  { value: 'workflow', label: 'Workflow' },
  { value: 'craft', label: 'Craft' },
] as const;

type TipTopic = (typeof TOPIC_OPTIONS)[number]['value'];

const LiveTips = (): JSX.Element => {
  const [state, setState] = useState<LoadState>('loading');
  const [tips, setTips] = useState<MentorTip[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<TipTopic>('all');

  const requestPath =
    activeTopic === 'all'
      ? '/api/tips'
      : `/tips/topic/${encodeURIComponent(activeTopic)}`;
  const requestUrl = `${API_URL}${requestPath}`;

  useEffect(() => {
    const controller = new AbortController();

    const loadTips = async (): Promise<void> => {
      try {
        setState('loading');
        setErrorMessage(null);

        const response = await fetch(requestUrl, {
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
          (item): item is MentorTip =>
            typeof item === 'object' && item !== null && 'id' in item,
        );

        setTips(normalized);
        setState('ready');
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        setErrorMessage('Could not reach the API. Something is wrong.');
        setState('error');
      }
    };

    loadTips();

    return () => {
      controller.abort();
    };
  }, [requestUrl]);

  const renderContent = (): JSX.Element => {
    if (state === 'loading') {
      return (
        <p className={styles.status}>Loading mentor tips from the API...</p>
      );
    }

    if (state === 'error') {
      return (
        <div className={styles.error}>
          <p>{errorMessage}</p>
          <p className={styles.hint}>
            Expected base URL: <code>{API_URL}</code>
          </p>
          <p className={styles.hint}>
            Requested path: <code>{requestPath}</code>
          </p>
        </div>
      );
    }

    if (tips.length === 0) {
      return (
        <p className={styles.status}>
          No tips yet. Add one with a POST to <code>/tips</code>.
        </p>
      );
    }

    return (
      <div className={styles.grid}>
        {tips.map((tip) => (
          <MentorTipCard key={tip.id} tip={tip} />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.liveTips}>
      <div className={styles.filters}>
        <label className={styles.filterLabel} htmlFor="tip-topic">
          Filter by topic
        </label>
        <div className={styles.filterControl}>
          <select
            className={styles.filterSelect}
            id="tip-topic"
            value={activeTopic}
            onChange={(event) =>
              setActiveTopic(event.target.value as TipTopic)
            }>
            {TOPIC_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export { LiveTips };
