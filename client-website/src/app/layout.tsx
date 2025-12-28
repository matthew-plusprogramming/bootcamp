import type { Metadata } from 'next';
import { Fraunces, Space_Grotesk } from 'next/font/google';
import type { JSX, ReactNode } from 'react';

import './globals.scss';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Veggie Rescue Bootcamp',
  description: 'Beginner-friendly Git and full-stack practice tasks.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element => {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
