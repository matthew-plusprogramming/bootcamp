import type { JSX } from 'react';

import { LiveExercises } from '@/app/components/LiveExercises';
import { HeroSectionContent } from '@/sections/Home/HeroSectionContent';

import styles from './page.module.scss';

const Home = (): JSX.Element => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoMark} aria-hidden="true" />
          Veggie Rescue Bootcamp
        </div>
        <nav className={styles.nav}>
          <a href="#practice">Practice</a>
          <a href="#api">API Preview</a>
          <a className={styles.navCta} href="#start">
            Start here
          </a>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <HeroSectionContent />
        </section>

        <section className={styles.practice} id="practice">
          <div className={styles.sectionHeading}>
            <h2>What you will practice</h2>
            <p>
              Each task is scoped to one skill so you can learn quickly without
              getting lost.
            </p>
          </div>
          <div className={styles.practiceGrid}>
            <article className={styles.practiceCard}>
              <h3>Git workflows</h3>
              <p>
                Branch, merge, and recover from conflicts with small, safe
                changes.
              </p>
            </article>
            <article className={styles.practiceCard}>
              <h3>React components</h3>
              <p>
                Create and wire UI pieces with clear props, styles, and layout.
              </p>
            </article>
            <article className={styles.practiceCard}>
              <h3>Express endpoints</h3>
              <p>
                Add routes that reuse services and return clean, predictable
                JSON.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.api} id="api">
          <div className={styles.sectionHeading}>
            <h2>Live API preview</h2>
            <p>
              The Express server seeds a few exercises on startup. Start the
              API to see them here.
            </p>
          </div>
          <LiveExercises />
        </section>

        <section className={styles.start} id="start">
          <div className={styles.sectionHeading}>
            <h2>Start in three steps</h2>
            <p>Keep the loop short so you can iterate fast.</p>
          </div>
          <ol className={styles.steps}>
            <li>
              <strong>Run the servers.</strong> Start the API, then the client.
            </li>
            <li>
              <strong>Pick a task.</strong> Read the before/after goal and open
              the relevant file.
            </li>
            <li>
              <strong>Ship a small change.</strong> Commit, review, and repeat.
            </li>
          </ol>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Built for beginner developers and mentors.</p>
        <p>Run `node-server` + `client-website` locally to get started.</p>
      </footer>
    </div>
  );
};

export default Home;
