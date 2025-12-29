'use client';

import type { JSX } from 'react';

import styles from './LiveTips.module.scss';

type MentorTip = {
  id: string;
  headline: string;
  summary: string;
  topic: string;
  readMinutes: number;
  tags: string[];
  author: string;
};

type MentorTipCardProps = {
  tip: MentorTip;
};

const toTitleCase = (value: string): string =>
  value ? value[0].toUpperCase() + value.slice(1) : value;

const MentorTipCard = ({ tip }: MentorTipCardProps): JSX.Element => {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.topic}>{toTitleCase(tip.topic)}</span>
        <span className={styles.time}>{tip.readMinutes} min</span>
      </div>
      <h3>{tip.headline}</h3>
      <p>{tip.summary}</p>
      <p className={styles.author}>By {tip.author}</p>
      <div className={styles.tags}>
        {tip.tags?.map((tag) => (
          <span key={`${tip.id}-${tag}`}>{tag}</span>
        ))}
      </div>
    </article>
  );
};

export type { MentorTip, MentorTipCardProps };
export { MentorTipCard };
