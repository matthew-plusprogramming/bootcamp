import type { JSX } from 'react';

import { LiveTips } from '@/app/components/LiveTips';

import styles from '@/app/page.module.scss';

const MentorTipsSection = (): JSX.Element => {
  return (
    <section className={styles.preview} id="tips">
      <div className={styles.sectionHeading}>
        <h2>Mentor tips</h2>
        <p>
          Preview tips pulled from the API. Start the node-server to see seeded
          data.
        </p>
      </div>
      <LiveTips />
    </section>
  );
};

export { MentorTipsSection };
