import type { JSX } from 'react';

import { LiveTips } from '@/app/components/LiveTips';

import styles from '@/app/page.module.scss';

const MentorTipsPreviewSection = (): JSX.Element => {
  return (
    <section className={styles.preview} id="tips">
      <div className={styles.sectionHeading}>
        <h2>Mentor tips preview</h2>
        <p>
          Preview tips pulled from the API. Start the node-server to see seeded data. (note this will not work until you do task 6)
        </p>
      </div>
      <LiveTips />
    </section>
  );
};

export { MentorTipsPreviewSection };
