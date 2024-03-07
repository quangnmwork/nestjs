

import { Html, Head, Main, NextScript } from 'next/document';

import { Toaster } from '@/components/ui';
import { cn } from '@/lib/utils';


export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head />
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <Main />
        <NextScript /><Toaster />
      </body>
    </Html>
  );
}
