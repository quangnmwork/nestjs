

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Html, Head, Main, NextScript } from 'next/document';

import { Toaster } from '@/components/ui';
import { cn } from '@/lib/utils';

const client = new QueryClient();

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head />
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <QueryClientProvider client={client}>
          <Main />
          <NextScript /><Toaster />
        </QueryClientProvider>
      </body>
    </Html>
  );
}
