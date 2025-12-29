import type { JSX } from 'react';

import styles from '../page.module.scss';

const SiteFooter = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <p>Built for beginner developers and mentors.</p>
      <p>Each task points to a real file so edits show up immediately.</p>
    </footer>
  );
};

export default SiteFooter;
