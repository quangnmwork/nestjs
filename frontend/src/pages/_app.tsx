import '@/styles/globals.css';
import type { AppProps } from 'next/app';


if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  console.log('Enable mocking')
  require('../mocks')
}

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
