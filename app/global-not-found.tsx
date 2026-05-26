import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';

import './globals.css';
import InteractiveNotFound from '@/components/Layout/InteractiveNotFound';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} font-sans`}>
        <InteractiveNotFound />
      </body>
    </html>
  );
}
