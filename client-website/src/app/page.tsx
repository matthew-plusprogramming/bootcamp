import type { JSX } from 'react';

import SiteFooter from '@/app/components/SiteFooter';
import SiteHeader from '@/app/components/SiteHeader';
import { TaskHintToggle } from '@/app/components/TaskHintToggle';
import { bootcampTasks } from '@/data/bootcampTasks';
import { HeroSectionContent } from '@/sections/Home/HeroSectionContent';

import styles from './page.module.scss';

const Home = (): JSX.Element => {
  return (
    <div className={styles.page}>
      <SiteHeader />

      <main className={styles.main}>
        <section className={styles.hero}>
          <HeroSectionContent />
        </section>

        <section className={styles.start} id="start">
          <div className={styles.sectionHeading}>
            <h2>Start the loop</h2>
            <p>Small steps. Fast feedback. Repeat.</p>
          </div>
          <ol className={styles.steps}>
            <li>
              <strong>Run the servers.</strong> Start the API, then the client
              app.
            </li>
            <li>
              <strong>Read a task.</strong> Skim the goal and jump into the file
              it references.
            </li>
            <li>
              <strong>Make a tiny change.</strong> Save and confirm the UI
              updates.
            </li>
          </ol>
        </section>

        <section className={styles.tasks} id="tasks">
          <div className={styles.sectionHeading}>
            <h2>Task board</h2>
            <p>
              Read the goal, open the file, and make a small change. The UI
              updates as soon as you save.
            </p>
          </div>
          <div className={styles.taskList}>
            {bootcampTasks.map((task) => {
              const completionMode = task.completion ?? 'manual';
              const isMergeLocked = completionMode === 'merge';
              const completeLabel = isMergeLocked
                ? 'Complete via merge'
                : 'Mark complete';
              const doneLabel = isMergeLocked ? 'Merged' : 'Completed';

              return (
                <article
                  className={styles.taskSection}
                  id={task.id}
                  key={task.id}
                >
                  <input
                    className={styles.taskToggle}
                    type="checkbox"
                    id={`${task.id}-complete`}
                    defaultChecked={Boolean(task.completed)}
                    disabled={isMergeLocked}
                  />
                  <div className={styles.taskHeader}>
                    <div className={styles.taskHeaderText}>
                      <div className={styles.taskMeta}>
                        <span className={styles.taskIndex}>
                          Task {task.order}
                        </span>
                        {task.badges.map((badge, index) => (
                          <span
                            className={
                              index === 0
                                ? styles.taskBadge
                                : styles.taskBadgeAlt
                            }
                            key={`${task.id}-${badge}`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                      <h3 className={styles.taskTitle}>{task.title}</h3>
                    </div>
                    <label
                      className={styles.taskComplete}
                      htmlFor={`${task.id}-complete`}
                    >
                      <span className={styles.taskCompleteLabel}>
                        {completeLabel}
                      </span>
                      <span className={styles.taskCompleteDone}>
                        {doneLabel}
                      </span>
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
                      <TaskHintToggle
                        hint={task.hint}
                        hintId={`${task.id}-hint`}
                      />
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Home;
