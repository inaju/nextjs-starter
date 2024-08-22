import AuthProvider from '@/components/block/auth-provider';
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
  return <SessionProvider session={session}>
    {/* <AuthProvider>  */}
    <QueryClientProvider client={queryClient}>
      <main className={GeistSans.className}>
        <Component {...pageProps} />
        <Toaster />
      </main>
    </QueryClientProvider>
    {/* </AuthProvider> */}
  </SessionProvider >

}
