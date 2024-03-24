import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { MonthAnswersProvider } from "./context/MonthAnswersContext";
import { router } from "./routes";

import "./App.css";

const App = () => {
  return (
    <MonthAnswersProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </MonthAnswersProvider>
  );
};

export default App;
