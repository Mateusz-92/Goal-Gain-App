import React from "react";
import { Box, Text } from "@chakra-ui/react";

import CircleList from "../CircleList/CircleList";

const SavingsComponent: React.FC = () => {
  return (
    <Box>
      <Text>
        Skręslaj kwoty co tydzien a w ciągu 3 miesięcy oszczędzisz 2000zł
      </Text>
      <CircleList />
    </Box>
  );
};

export default SavingsComponent;
