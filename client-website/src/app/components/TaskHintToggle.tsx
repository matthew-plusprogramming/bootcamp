'use client';

import { useState, type JSX } from 'react';

import styles from '../page.module.scss';

type TaskHintToggleProps = {
  hint: string;
  hintId: string;
};

const TaskHintToggle = ({
  hint,
  hintId,
}: TaskHintToggleProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <button
        className={styles.taskHintToggle}
        type="button"
        onClick={() => setIsVisible((prev) => !prev)}
        aria-expanded={isVisible}
        aria-controls={hintId}
      >
        {isVisible ? 'Hide hint' : 'Show hint'}
      </button>
      {isVisible ? (
        <div className={styles.taskHint} id={hintId}>
          {hint}
        </div>
      ) : null}
    </>
  );
};

export { TaskHintToggle };
