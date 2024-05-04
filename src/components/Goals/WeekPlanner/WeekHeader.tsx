import {
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Container, Input, Text, Textarea } from "@chakra-ui/react";

import { days } from "../../../constants";
import { WeekPlannerData } from "../../../validators/validators";

type WeekHeaderProps = {
  errors: FieldErrors<WeekPlannerData>;
  field: FieldArrayWithId<WeekPlannerData, "days", "id">;
  index: number;
  register: UseFormRegister<WeekPlannerData>;
};

export const WeekHeader = ({
  errors,
  field,
  index,
  register,
}: WeekHeaderProps) => {
  const isError = errors && errors.days && errors.days[index];
  return (
    <Container key={field.id}>
      <Text>{days[index]}</Text>
      <Input type="date" {...register(`days.${index}.date`)} />
      {isError
? <Text color={"red"}>{isError.date?.message}</Text>
: null}
      <Textarea {...register(`days.${index}.description`)} />
      {isError
? (
        <Text color={"red"}>{isError.description?.message}</Text>
      )
: null}
    </Container>
  );
};
