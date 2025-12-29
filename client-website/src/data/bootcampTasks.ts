export type BootcampTask = {
  id: string;
  order: number;
  title: string;
  badges: string[];
  goal: string;
  expected: string;
  lookIn: string[];
  completion?: 'manual' | 'merge';
  completed?: boolean;
  action?: {
    label: string;
    href: string;
  };
  hint?: string;
};

export const bootcampTasks: BootcampTask[] = [
  {
    id: 'task-1',
    order: 1,
    title: 'Fix the broken "Jump to task board" button',
    badges: ['Bugfix', 'Start here'],
    goal: 'Make the "Jump to task board" button in Start the loop scroll to the Task board section.',
    expected: 'Clicking it jumps to the Task board section.',
    lookIn: ['client-website/src/sections/Home/StartLoopSection.tsx'],
    completion: 'manual',
    hint: 'Hint: In `StartLoopSection.tsx`, the button points to `#tASks`, but the Task board section uses the id `tasks`.',
  },
  {
    id: 'task-2',
    order: 2,
    title: 'Extract a TaskCard component',
    badges: ['Components'],
    goal: 'Move each task section into a reusable component with props, and add a "Next task" button to every card.',
    expected:
      'The task board looks the same, the markup lives in one component, and every card includes a Next task button.',
    lookIn: [
      'client-website/src/sections/Home/TaskBoardSection.tsx',
      'client-website/src/app/components/TaskCard.tsx',
    ],
    completion: 'manual',
    hint: 'Hint: The full card markup lives in `TaskBoardSection.tsx` inside the tasks map; move it into `TaskCard.tsx`, and place the new Next task link near the existing action link area.',
  },
  {
    id: 'task-3',
    order: 3,
    title: 'Toggle the "Look in" file list',
    badges: ['State'],
    goal: 'Hide the "Look in" file paths by default and add a button to reveal them.',
    expected:
      'Each card can show or hide the file list without a page refresh.',
    lookIn: [
      'client-website/src/sections/Home/TaskBoardSection.tsx',
      'client-website/src/app/components/TaskHintToggle.tsx',
    ],
    completion: 'manual',
    hint: 'Hint: The "Look in" list item is in `TaskBoardSection.tsx`; mirror the toggle pattern in `TaskHintToggle.tsx` to manage local state.',
  },
  {
    id: 'task-4',
    order: 4,
    title: 'Show the total task count',
    badges: ['Data flow', 'UI'],
    goal: 'Display how many tasks are in the list under the Task board heading.',
    expected: 'The task count updates automatically when the array changes.',
    lookIn: ['client-website/src/sections/Home/TaskBoardSection.tsx'],
    completion: 'manual',
    hint: 'Hint: In `TaskBoardSection.tsx` inside the Task board heading, render something like `${tasks.length} tasks` beneath the title.',
  },
  {
    id: 'task-5',
    order: 5,
    title: 'Add an empty state for tasks',
    badges: ['Conditional UI'],
    goal: 'Show a friendly message when there are no tasks.',
    expected: 'The empty state appears only when the array is empty.',
    lookIn: ['client-website/src/sections/Home/TaskBoardSection.tsx'],
    completion: 'manual',
    hint: 'Hint: Add a conditional in `TaskBoardSection.tsx` to render a fallback when `tasks.length === 0` before the map.',
  },
  {
    id: 'task-6',
    order: 6,
    title: 'Fix the mentor tips API preview request',
    badges: ['API', 'Data flow'],
    goal: 'Point the fetch to the correct API path so tips load.',
    expected: 'Cards render with headlines, summaries, and tags.',
    lookIn: [
      'client-website/src/app/components/LiveTips.tsx',
      'node-server/src/index.ts',
      'node-server/src/routes/tipsRoutes.ts',
    ],
    completion: 'manual',
    hint: "Hint: `LiveTips.tsx` requests `/api/tips`, but the list route is mounted at `/tips` (see `app.use('/tips', tipsRoutes)` and `tipsRoutes.get('/')`).",
  },
  {
    id: 'task-7',
    order: 7,
    title: 'Add a topic filter endpoint',
    badges: ['Express', 'Routing'],
    goal: 'Add /tips/topic/:topic to filter by topic.',
    expected: 'Endpoint returns the filtered list with a 200 status.',
    lookIn: [
      'node-server/src/routes/tipsRoutes.ts',
      'node-server/src/services/tips.ts',
    ],
    completion: 'manual',
    hint: "Hint: Add `tipsRoutes.get('/topic/:topic')` near the list route in `node-server/src/routes/tipsRoutes.ts` and filter `listTips()` by `topic` (see `TipTopic` in `node-server/src/data/store.ts`).",
  },
  {
    id: 'task-8',
    order: 8,
    title: 'Add simple middleware',
    badges: ['Middleware', 'Express'],
    goal: 'Add a basic middleware to log the request.',
    expected: 'Middleware logs the req object for every request.',
    lookIn: ['node-server/src/index.ts'],
    completion: 'manual',
    hint: 'Hint: Drop a new `app.use` right after the existing `cors()`/`express.json()` calls in `node-server/src/index.ts`.',
  },
  {
    id: 'task-9',
    order: 9,
    title: 'Merge S1: clean merge (new file)',
    badges: ['Git merge', 'S1'],
    goal: 'Merge scenario/merge-clean-new-file into your dev branch to add a new section divider component.',
    expected: 'Merge commit lands with the new component file and no conflicts.',
    lookIn: [
      'client-website/src/app/components/SectionDivider.tsx',
      'client-website/src/app/page.tsx',
    ],
    completion: 'merge',
    completed: false,
    hint: 'Hint: After merging, open `SectionDivider.tsx` and confirm it exists; `page.tsx` should import it.',
  },
  {
    id: 'task-10',
    order: 10,
    title: 'Merge S2: clean merge (same file)',
    badges: ['Git merge', 'S2'],
    goal: 'Update the footer copy, then merge scenario/merge-clean-same-file.',
    expected: 'Merge succeeds without conflicts; both footer edits appear.',
    lookIn: ['client-website/src/app/components/SiteFooter.tsx'],
    completion: 'merge',
    completed: false,
    hint: 'Hint: Edit the second paragraph line that starts with `Each task points` before merging.',
  },
  {
    id: 'task-11',
    order: 11,
    title: 'Merge S3: conflict on the same line',
    badges: ['Git merge', 'S3'],
    goal: 'Change the hero headline, then merge scenario/conflict-same-line.',
    expected: 'Git reports a same-line conflict in the hero headline you must resolve.',
    lookIn: ['client-website/src/sections/Home/HeroSectionContent.tsx'],
    completion: 'merge',
    completed: false,
    hint: 'Hint: Update the `<h1>` line in `HeroSectionContent.tsx` before merging.',
  },
  {
    id: 'task-12',
    order: 12,
    title: 'Merge S4: semantic list order',
    badges: ['Git merge', 'S4'],
    goal: 'Add a new hero badge, then merge scenario/semantic-list-order.',
    expected: 'Auto-merge succeeds; reorder the badges alphabetically.',
    lookIn: ['client-website/src/sections/Home/HeroSectionContent.tsx'],
    completion: 'merge',
    completed: false,
    hint: 'Hint: In the badges list, insert `<span>Ship with Git</span>` after `Read the codebase` before merging.',
  },
  {
    id: 'task-13',
    order: 13,
    title: 'Merge S5: delete vs edit conflict',
    badges: ['Git merge', 'S5'],
    goal: 'Edit the server status label, then merge scenario/conflict-delete-vs-edit.',
    expected: 'Git reports a modify/delete conflict; resolve it so the status pill still shows.',
    lookIn: [
      'client-website/src/app/components/ServerStatusIndicator.tsx',
      'client-website/src/sections/Home/StartLoopSection.tsx',
    ],
    completion: 'merge',
    completed: false,
    hint: 'Hint: Change the `Node server` label in `ServerStatusIndicator.tsx` before merging.',
  },
  {
    id: 'task-14',
    order: 14,
    title: 'Merge S6: rename vs edit',
    badges: ['Git merge', 'S6'],
    goal: 'Edit the mentor tips heading, then merge scenario/conflict-rename-vs-edit.',
    expected: 'Confirm the rename landed and the heading edit survived.',
    lookIn: [
      'client-website/src/sections/Home/MentorTipsSection.tsx',
      'client-website/src/sections/Home/MentorTipsPreviewSection.tsx',
    ],
    completion: 'merge',
    completed: false,
    hint: 'Hint: Update the `<h2>` line in `MentorTipsSection.tsx` before merging; after the merge, check `MentorTipsPreviewSection.tsx` for your heading.',
  },
];
