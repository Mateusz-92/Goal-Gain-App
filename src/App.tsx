import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import UserAvatar from "./components/UserAvatar/UserAvatar";
import { UserProvider } from "./context/UserContext";
import { router } from "./routes";

import "./App.css";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 60_000,
    },
  },
  queryCache: new QueryCache(),
});
const App = () => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <RouterProvider router={router} />
          <UserAvatar />
        </UserProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
