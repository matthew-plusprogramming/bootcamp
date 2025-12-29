export type TipTopic = 'mindset' | 'workflow' | 'craft';

export type MentorTip = {
  id: string;
  headline: string;
  summary: string;
  topic: TipTopic;
  readMinutes: number;
  tags: string[];
  author: string;
};

const seedTips: MentorTip[] = [
  {
    id: 'tip-101',
    headline: 'Ship the smallest slice',
    summary: 'Deliver a thin vertical slice so feedback arrives before polish.',
    topic: 'workflow',
    readMinutes: 4,
    tags: ['shipping', 'feedback'],
    author: 'Maya Chen',
  },
  {
    id: 'tip-205',
    headline: 'Name the intent',
    summary: 'Write commit messages that explain why the change exists.',
    topic: 'craft',
    readMinutes: 5,
    tags: ['git', 'clarity'],
    author: 'Ari Patel',
  },
  {
    id: 'tip-309',
    headline: 'Normalize the wobble',
    summary: 'Expect a dip after learning; keep iterations short and visible.',
    topic: 'mindset',
    readMinutes: 3,
    tags: ['mindset', 'consistency'],
    author: 'Leila Stone',
  },
];

const tips: Record<string, MentorTip> = seedTips.reduce(
  (acc, tip) => {
    acc[tip.id] = tip;
    return acc;
  },
  {} as Record<string, MentorTip>,
);

export const db = {
  tips,
};

export const resetTips = (): void => {
  Object.keys(tips).forEach((key) => delete tips[key]);
  seedTips.forEach((tip) => {
    tips[tip.id] = tip;
  });
};

export { seedTips };
