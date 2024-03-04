import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { handlers } from '../src/mocks/handlers';
import { HttpResponse, http } from 'msw';

initialize({ onUnhandledRequest: 'warn' });

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
};

export default preview;
