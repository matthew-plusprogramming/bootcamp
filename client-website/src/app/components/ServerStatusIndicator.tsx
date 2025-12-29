'use client';

import { useEffect, useState } from 'react';

import styles from '../page.module.scss';

type ServerStatus = 'checking' | 'online' | 'offline';

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001').replace(
  /\/$/,
  '',
);
const HEALTH_URL = `${API_BASE}/health`;
const POLL_INTERVAL_MS = 12000;

const STATUS_LABELS: Record<ServerStatus, string> = {
  checking: 'Checking...',
  online: 'Running',
  offline: 'Offline',
};

const ServerStatusIndicator = (): JSX.Element => {
  const [status, setStatus] = useState<ServerStatus>('checking');

  useEffect(() => {
    let isMounted = true;
    let timeoutId: ReturnType<typeof window.setTimeout> | null = null;
    let controller: AbortController | null = null;

    const checkStatus = async (showChecking: boolean): Promise<void> => {
      if (!isMounted) {
        return;
      }

      if (showChecking) {
        setStatus('checking');
      }

      controller = new AbortController();

      try {
        const response = await fetch(HEALTH_URL, {
          signal: controller.signal,
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Health check failed with ${response.status}`);
        }

        if (!isMounted) {
          return;
        }

        setStatus('online');
      } catch (error) {
        if (!isMounted) {
          return;
        }

        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setStatus('offline');
      } finally {
        if (isMounted) {
          timeoutId = window.setTimeout(() => {
            checkStatus(false);
          }, POLL_INTERVAL_MS);
        }
      }
    };

    checkStatus(true);

    return () => {
      isMounted = false;
      if (controller) {
        controller.abort();
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div
      className={styles.serverStatus}
      data-status={status}
      role="status"
      aria-live="polite"
      title={`Pings ${HEALTH_URL}`}
    >
      <span className={styles.serverStatusDot} aria-hidden="true" />
      <span className={styles.serverStatusLabel}>Node server</span>
      <span className={styles.serverStatusValue}>{STATUS_LABELS[status]}</span>
    </div>
  );
};

export { ServerStatusIndicator };
