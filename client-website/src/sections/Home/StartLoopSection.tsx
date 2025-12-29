import type { JSX } from 'react';

import styles from '@/app/page.module.scss';

const StartLoopSection = (): JSX.Element => {
  return (
    <section className={styles.start} id="start">
      <div className={styles.sectionHeading}>
        <h2>Start the loop</h2>
        <p>Small steps. Fast feedback. Repeat.</p>
      </div>
      <ol className={styles.steps}>
        <li>
          <strong>Run the servers.</strong> Start the API, then the client app.
        </li>
        <li>
          <strong>Read a task.</strong> Skim the goal and jump into the file it
          references.
        </li>
        <li>
          <strong>Make a tiny change.</strong> Save and confirm the UI updates.
        </li>
      </ol>
      <a className={styles.taskAction} href="#tASks">
        Jump to task board
      </a>
    </section>
  );
};

export { StartLoopSection };
