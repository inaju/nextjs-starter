import '@/styles/globals.css';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { GeistSans } from "geist/font/sans";
const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return <QueryClientProvider client={queryClient}>
    <main className={GeistSans.className}>
      <Component {...pageProps} />
    </main>  
      </QueryClientProvider>

}
