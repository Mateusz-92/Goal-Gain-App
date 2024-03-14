import { ChakraProvider, Heading } from "@chakra-ui/react";

import "./App.css";

const App = () => {
  return (
    <ChakraProvider>
      <Heading>Goal Gain App - Osiągaj swoje cele !</Heading>
    </ChakraProvider>
  );
};

export default App;
