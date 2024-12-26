import { RouterProvider } from 'react-router-dom';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AuthProvider } from './context/AuthContext';
import { router } from './routes';

import './App.css';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 60_000,
    },
  },
  queryCache: new QueryCache(),
});
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { AlertProvider } from './context/AlertContext';

const theme = extendTheme({
  fonts: {
    body: 'Poppins, sans-serif',
    heading: 'Ubuntu, sans-serif',
  },
  styles: {
    global: {
      ':root': {},
      body: {
        bg: 'var(--light-gray)',
      },
    },
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === 'development' ? (
          <ReactQueryDevtools initialIsOpen={false} />
        ) : null}
        <AlertProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </AlertProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
