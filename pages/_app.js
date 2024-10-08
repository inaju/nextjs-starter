import ErrorBoundary from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { GeistSans } from "geist/font/sans";
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps } }) {

  return <ErrorBoundary>
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <main className={GeistSans.className}>
          <Component {...pageProps} />
          <Toaster />
        </main>
      </QueryClientProvider>
    </SessionProvider >
  </ErrorBoundary>

}
