import React from "react";
import { Heading } from "@chakra-ui/react";

type TitleNameProps = {
  textAlign?: "start" | "center";
  title: string;
};

const TitleName: React.FC<TitleNameProps> = ({
  textAlign = "start",
  title,
}) => {
  return (
    <Heading size="md" textAlign={textAlign}>
      {title}
    </Heading>
  );
};

export default TitleName;
