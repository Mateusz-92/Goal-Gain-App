import React from "react";
import { Control, useFieldArray } from "react-hook-form";
import { MinusIcon } from "@chakra-ui/icons";
import { Box, Button, Checkbox, Container, IconButton } from "@chakra-ui/react";
import { TextForm } from "../../../Forms/TextForm/TextForm";

export type TaskItem = {
  date?: string;
  id: string;
  text: string;
};

export const DEFAULT_TASK_MODEL = { finishDate: "", isEnded: false, name: "" };

const ThreeMonthsTasks: React.FC<{
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  control: Control<any>;
  nestedTaskName: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  register: any;
}> = ({ control, nestedTaskName, register }) => {
  const { append, fields, remove } = useFieldArray({
    control,
    name: nestedTaskName,
  });
  const countValue: number = 1;
  return (
    <Box>
      {fields.map((task, i) => (
        <Container key={task.id}>
          <Container>
            {/* <Text>Zadanie {i + countValue}</Text> */}
            <TextForm
              control={control}
              isInput={true}
              label={`Zadanie ${i + countValue}`}
              placeholder={"Wpisz zadanie"}
              {...register(`${nestedTaskName}.${i}.name`)}
            />
            {/* <Input {...register(`${nestedTaskName}.${i}.name`)} /> */}
            <TextForm
              control={control}
              isInput={true}
              type="Date"
              {...register(`${nestedTaskName}.${i}.finishDate`)}
            />
            <Checkbox {...register(`${nestedTaskName}.${i}.isEnded`)} />
          </Container>

          <IconButton
            aria-label="MinusIcon"
            icon={<MinusIcon />}
            onClick={() => remove(i)}
          />
        </Container>
      ))}

      <Button type="button" onClick={() => append(DEFAULT_TASK_MODEL)}>
        Dodaj zadanie
      </Button>
    </Box>
  );
};

export default ThreeMonthsTasks;
