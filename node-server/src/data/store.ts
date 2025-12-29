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
  {
    id: 'tip-623',
    headline: 'Timebox the rabbit hole',
    summary:
      'Set a timer when debugging to avoid endless detours before asking for help.',
    topic: 'workflow',
    readMinutes: 3,
    tags: ['debugging', 'habits'],
    author: 'Priya Nair',
  },
  {
    id: 'tip-708',
    headline: 'Write notes to future you',
    summary: 'Leave short comments only when intent is not obvious.',
    topic: 'craft',
    readMinutes: 5,
    tags: ['comments', 'maintenance'],
    author: 'Chris Lane',
  },
  {
    id: 'tip-902',
    headline: 'Build momentum with wins',
    summary: 'Stack a few small completions to reset confidence.',
    topic: 'mindset',
    readMinutes: 3,
    tags: ['momentum', 'confidence'],
    author: 'Taylor Brooks',
  },
];

const tips: Record<string, MentorTip> = seedTips.reduce((acc, tip) => {
  acc[tip.id] = tip;
  return acc;
}, {} as Record<string, MentorTip>);

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
