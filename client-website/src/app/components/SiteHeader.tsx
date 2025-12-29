import type { JSX } from 'react';

import styles from '../page.module.scss';

const SiteHeader = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoMark} aria-hidden="true" />
        Veggie Rescue Bootcamp
      </div>
      <nav className={styles.nav}>
        <a href="#tasks">Task board</a>
        <a className={styles.navCta} href="#start">
          Start here
        </a>
      </nav>
    </header>
  );
};

export default SiteHeader;
