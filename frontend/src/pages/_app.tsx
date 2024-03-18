import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';

import type { AppProps } from 'next/app';

import { Toaster } from '@/components/ui';

// if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
//   require('../mocks');
// }

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <QueryClientProvider client={client}>
      <Provider>
        <Component {...pageProps} />
        <Toaster />
      </Provider>
    </QueryClientProvider>
  );
}
