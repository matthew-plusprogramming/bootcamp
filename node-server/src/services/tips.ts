import { randomUUID } from 'node:crypto';

import { db, type MentorTip, type TipTopic } from '../data/store';

export type TipInput = {
  headline: string;
  summary: string;
  topic: TipTopic;
  readMinutes: number;
  tags: string[];
  author: string;
};

export const listTips = (): MentorTip[] => Object.values(db.tips);

export const getTipById = (id: string): MentorTip | null => db.tips[id] ?? null;

export const createTip = (input: TipInput): MentorTip => {
  const id = `tip-${randomUUID()}`;
  const tip: MentorTip = {
    id,
    ...input,
  };
  db.tips[id] = tip;
  return tip;
};
