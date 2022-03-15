import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
