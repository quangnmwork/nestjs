import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { handlers } from '../src/mocks/handlers';
import { HttpResponse, http } from 'msw';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react';
import { Toaster } from '../src/components/ui'

initialize({ onUnhandledRequest: 'warn' });

const mockedClient = new QueryClient();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: handlers,
    },
  },
  loaders: [mswLoader],
  decorators: [(Story) => (<QueryClientProvider client={mockedClient}><Story /><Toaster /></QueryClientProvider>)],
};

export default preview;
