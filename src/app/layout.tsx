import type { Metadata } from 'next';
import { Geist_Mono, Inter, Source_Sans_3 } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { APP_NAME } from '@/lib/env';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const lesson = Source_Sans_3({ variable: '--font-lesson', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) }
    : {}),
  robots: { index: false, follow: false },
  title: { default: APP_NAME, template: `%s · ${APP_NAME}` },
  description: 'Training for the project management team',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lesson.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
