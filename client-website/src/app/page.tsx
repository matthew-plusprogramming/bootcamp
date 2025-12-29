import type { JSX } from 'react';

import SiteFooter from '@/app/components/SiteFooter';
import SiteHeader from '@/app/components/SiteHeader';
import { bootcampTasks } from '@/data/bootcampTasks';
import { HeroSectionContent } from '@/sections/Home/HeroSectionContent';
import { MentorTipsPreviewSection } from '@/sections/Home/MentorTipsPreviewSection';
import { StartLoopSection } from '@/sections/Home/StartLoopSection';
import { TaskBoardSection } from '@/sections/Home/TaskBoardSection';

import styles from './page.module.scss';

const Home = (): JSX.Element => {
  return (
    <div className={styles.page}>
      <SiteHeader />

      <main className={styles.main}>
        <section className={styles.hero}>
          <HeroSectionContent />
        </section>

        <StartLoopSection />

        <MentorTipsPreviewSection />

        <TaskBoardSection tasks={bootcampTasks} />
      </main>

      <SiteFooter />
    </div>
  );
};

export default Home;
