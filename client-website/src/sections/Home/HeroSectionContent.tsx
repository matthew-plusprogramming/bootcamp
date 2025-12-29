import type { JSX } from 'react';

import styles from './HeroSectionContent.module.scss';

const HeroSectionContent = (): JSX.Element => {
  return (
    <div className={styles.hero}>
      <p className={styles.kicker}>Live Bootcamp Worksheet</p>
      <h1>Run the site. Read the tasks. Ship the update.</h1>
      <p className={styles.lede}>
        This repo is a hands-on worksheet. Each task points you to the code,
        and every save updates the UI.
      </p>

      <div className={styles.actions}>
        <a className={styles.primaryAction} href="#tasks">
          Browse tasks
        </a>
        <a className={styles.secondaryAction} href="#start">
          Start the loop
        </a>
      </div>

      <div className={styles.badges}>
        <span>Read the codebase</span>
        <span>Edit + refresh</span>
        <span>Express + Next</span>
      </div>
    </div>
  );
};

export { HeroSectionContent };
