'use client';

import { useCallback, useMemo } from 'react';

import { useLocalStorageState } from '@/app/hooks/useLocalStorageState';
import type { BootcampTask } from '@/data/bootcampTasks';

type TaskCompletionState = Record<string, boolean>;

type TaskCompletionStatus = {
  isMergeLocked: boolean;
  isCompleted: boolean;
  completeLabel: string;
  doneLabel: string;
};

const TASK_COMPLETION_STORAGE_KEY = 'bootcamp-task-completion';

const mergeTaskCompletion = (
  current: TaskCompletionState,
  stored: TaskCompletionState,
): TaskCompletionState => ({
  ...current,
  ...stored,
});

const isManualTask = (task: BootcampTask): boolean =>
  (task.completion ?? 'manual') === 'manual';

const buildManualTaskIds = (tasks: BootcampTask[]): Set<string> => {
  const ids = new Set<string>();
  tasks.forEach((task) => {
    if (isManualTask(task)) {
      ids.add(task.id);
    }
  });
  return ids;
};

const buildDefaultCompletion = (
  tasks: BootcampTask[],
): TaskCompletionState => {
  const acc: TaskCompletionState = {};
  tasks.forEach((task) => {
    if (isManualTask(task)) {
      acc[task.id] = Boolean(task.completed);
    }
  });
  return acc;
};

const parseTaskCompletion = (
  value: string,
  manualTaskIds: Set<string>,
): TaskCompletionState | null => {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object') {
      return null;
    }

    const normalized: TaskCompletionState = {};

    for (const [taskId, storedValue] of Object.entries(parsed)) {
      if (!manualTaskIds.has(taskId) || typeof storedValue !== 'boolean') {
        continue;
      }
      normalized[taskId] = storedValue;
    }

    return normalized;
  } catch {
    return null;
  }
};

const useTaskCompletion = (
  tasks: BootcampTask[],
): {
  getCompletionStatus: (task: BootcampTask) => TaskCompletionStatus;
  handleCompletionChange: (taskId: string, checked: boolean) => void;
} => {
  const manualTaskIds = useMemo(() => buildManualTaskIds(tasks), [tasks]);
  const defaultCompletion = useMemo(() => buildDefaultCompletion(tasks), [tasks]);
  const deserialize = useCallback(
    (value: string) => parseTaskCompletion(value, manualTaskIds),
    [manualTaskIds],
  );

  const [taskCompletion, setTaskCompletion] = useLocalStorageState(
    TASK_COMPLETION_STORAGE_KEY,
    defaultCompletion,
    {
      deserialize,
      merge: mergeTaskCompletion,
    },
  );

  const handleCompletionChange = useCallback(
    (taskId: string, checked: boolean): void => {
      if (!manualTaskIds.has(taskId)) {
        return;
      }

      setTaskCompletion((prev) => {
        if (prev[taskId] === checked) {
          return prev;
        }

        return {
          ...prev,
          [taskId]: checked,
        };
      });
    },
    [manualTaskIds, setTaskCompletion],
  );

  const getCompletionStatus = useCallback(
    (task: BootcampTask): TaskCompletionStatus => {
      const completionMode = task.completion ?? 'manual';
      const isMergeLocked = completionMode === 'merge';
      const isCompleted = isMergeLocked
        ? Boolean(task.completed)
        : Boolean(taskCompletion[task.id]);
      const completeLabel = isMergeLocked
        ? 'Complete via merge'
        : 'Mark complete';
      const doneLabel = isMergeLocked ? 'Merged' : 'Completed';

      return {
        isMergeLocked,
        isCompleted,
        completeLabel,
        doneLabel,
      };
    },
    [taskCompletion],
  );

  return { getCompletionStatus, handleCompletionChange };
};

export type { TaskCompletionStatus };
export { useTaskCompletion };
