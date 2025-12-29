'use client';

import type { JSX } from 'react';

import type { BootcampTask } from '@/data/bootcampTasks';

type TaskCardProps = {
  task: BootcampTask;
  isCompleted: boolean;
  isMergeLocked: boolean;
  completeLabel: string;
  doneLabel: string;
  onCompletionChange: (taskId: string, checked: boolean) => void;
};

const TaskCard = (_props: TaskCardProps): JSX.Element => {
  void _props;
  return <article />;
};

export type { TaskCardProps };
export { TaskCard };
