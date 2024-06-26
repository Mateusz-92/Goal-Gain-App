import { ChangeEvent, useState } from "react";
import { Button, Flex, Input, List, ListItem } from "@chakra-ui/react";

import TitleName from "../../../UI/TitleName/TitleName";

const MonthAnswersList = () => {
  // answer ma przyjmowac jako default dane z api lub []
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");

  const addAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
    setInputText("");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleAddAnswer = () => {
    const currentDate = new Date().toLocaleDateString();
    const answerExistsToday = answers.some((answer) =>
      answer.startsWith(currentDate)
    );
    if (!answerExistsToday) {
      const newAnswer = `${currentDate} - ${inputText}`;
      addAnswer(newAnswer);
    }
  };
  return (
    <Flex direction="column" justifyItems={"self-start"} width={"90%"}>
      <TitleName textAlign="start" title={"Pytanie miesiąca"} />
      <Input
        focusBorderColor="teal.500"
        mb={4}
        mt={2}
        placeholder="Enter your answer"
        value={inputText}
        width={"100%"}
        onChange={handleInputChange}
      />
      {/* podmienic powyzszy input na TextForm */}
      <Button colorScheme="teal" mt={2} onClick={handleAddAnswer}>
        Add Answer
      </Button>
      <List alignItems={"center"} width={"80%"}>
        {answers.map((answer) => (
          <ListItem key={answer} textAlign={"start"}>
            {answer}
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};

export default MonthAnswersList;
