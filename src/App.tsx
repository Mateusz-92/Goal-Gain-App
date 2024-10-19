import { RouterProvider } from 'react-router-dom';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
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
        <AuthProvider>
          <UserProvider>
            {/* <UserAvatar /> */}

            <RouterProvider router={router} />
          </UserProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
