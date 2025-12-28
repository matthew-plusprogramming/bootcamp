import type { JSX } from 'react';

import styles from './HeroSectionContent.module.scss';

const HeroSectionContent = (): JSX.Element => {
  return (
    <div className={styles.hero}>
      <p className={styles.kicker}>Veggie Rescue Bootcamp</p>
      <h1>Small tasks. Clear wins. Real momentum.</h1>
      <p className={styles.lede}>
        This repo is built for beginner devs who want focused practice. Each
        task is short, explicit, and safe to experiment with.
      </p>

      <div className={styles.actions}>
        <a className={styles.primaryAction} href="#start">
          Pick a task
        </a>
        <a className={styles.secondaryAction} href="#api">
          See the API data
        </a>
      </div>

      <div className={styles.badges}>
        <span>React + Next</span>
        <span>Express API</span>
        <span>In-memory data</span>
      </div>
    </div>
  );
};

export { HeroSectionContent };
