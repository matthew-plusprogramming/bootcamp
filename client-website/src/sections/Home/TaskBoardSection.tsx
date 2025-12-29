'use client';

import type { JSX } from 'react';

import { TaskHintToggle } from '@/app/components/TaskHintToggle';
import { useTaskCompletion } from '@/app/hooks/useTaskCompletion';
import type { BootcampTask } from '@/data/bootcampTasks';

import styles from '@/app/page.module.scss';

type TaskBoardSectionProps = {
  tasks: BootcampTask[];
};

const TaskBoardSection = ({ tasks }: TaskBoardSectionProps): JSX.Element => {
  const { getCompletionStatus, handleCompletionChange } =
    useTaskCompletion(tasks);

  return (
    <section className={styles.tasks} id="tasks">
      <div className={styles.sectionHeading}>
        <h2>Task board</h2>
        <p>
          Read the goal, open the file, and make a small change. The UI updates
          as soon as you save in VSCode.
        </p>
      </div>
      <div className={styles.taskList}>
        {tasks.map((task) => {
          const { isMergeLocked, isCompleted, completeLabel, doneLabel } =
            getCompletionStatus(task);

          return (
            <article className={styles.taskSection} id={task.id} key={task.id}>
              <input
                className={styles.taskToggle}
                type="checkbox"
                id={`${task.id}-complete`}
                checked={isCompleted}
                onChange={(event) =>
                  handleCompletionChange(task.id, event.target.checked)
                }
                disabled={isMergeLocked}
              />
              <div className={styles.taskHeader}>
                <div className={styles.taskHeaderText}>
                  <div className={styles.taskMeta}>
                    <span className={styles.taskIndex}>Task {task.order}</span>
                    {task.badges.map((badge, index) => (
                      <span
                        className={
                          index === 0 ? styles.taskBadge : styles.taskBadgeAlt
                        }
                        key={`${task.id}-${badge}`}>
                        {badge}
                      </span>
                    ))}
                  </div>
                  <h3 className={styles.taskTitle}>{task.title}</h3>
                </div>
                <label
                  className={styles.taskComplete}
                  htmlFor={`${task.id}-complete`}>
                  <span className={styles.taskCompleteLabel}>
                    {completeLabel}
                  </span>
                  <span className={styles.taskCompleteDone}>{doneLabel}</span>
                </label>
              </div>
              <div className={styles.taskBody}>
                <ul className={styles.taskDetails}>
                  <li>
                    <strong>Goal:</strong> {task.goal}
                  </li>
                  <li>
                    <strong>Expected:</strong> {task.expected}
                  </li>
                  <li>
                    <strong>Look in:</strong>{' '}
                    <code>{task.lookIn.join(', ')}</code>
                  </li>
                </ul>
                {task.action ? (
                  <a className={styles.taskAction} href={task.action.href}>
                    {task.action.label}
                  </a>
                ) : null}
                {task.hint ? (
                  <TaskHintToggle hint={task.hint} hintId={`${task.id}-hint`} />
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export { TaskBoardSection };
