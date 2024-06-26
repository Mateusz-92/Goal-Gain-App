import React from "react";
import { Box } from "@chakra-ui/react";

import CircleItem from "../CircleItem/CircleItem"

// eslint-disable-next-line no-magic-numbers
const ammount: number[] = [1, 4, 6, 7];

const CircleList: React.FC = () => {
  return (
    <Box display="flex" flexWrap="wrap">
      {ammount.map((value) => (
        <CircleItem key={value} value={value} />
      ))}
    </Box>
  );
};

export default CircleList;
