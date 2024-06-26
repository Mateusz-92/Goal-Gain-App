import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Box, Button, Container, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

import { useEditGoals } from "../../../../firebase/mutations";
import { useGetGoals } from "../../../../firebase/queries";
import {
  GoalFormValuesSchema,
  goalSchema,
  SingleGoalValuesSchema,
} from "../../../../validators/validators";
import { TextForm } from "../../../Forms/TextForm/TextForm";
import ThreeMonthsTasks, {
  DEFAULT_TASK_MODEL,
} from "../ThreeMonthsTasks/ThreeMonthsTasks";

const DEAFAULT_GOAL_MODEL: SingleGoalValuesSchema = {
  explanationQuestion: "",
  goalName: "",
  id: uuidv4(),
  tasks: [DEFAULT_TASK_MODEL],
  yourBenefits: "",
  yourDisturber: "",
};
const countValue: number = 1;

const ThreeMonthsGoalsPlanner: React.FC = () => {
  const goalId: string = "";
  // goalId - z query.

  const { t } = useTranslation(["common"]);
  const { data, isError, isLoading } = useGetGoals(goalId);
  const editGoalsWithId = useEditGoals(goalId);
  const editGoalsWithoutId = useEditGoals();
  const onAddGoalsMutation = goalId
? editGoalsWithId
: editGoalsWithoutId;

  const { control, handleSubmit, register, setValue } =
    useForm<GoalFormValuesSchema>({
      defaultValues: {
        goals: [DEAFAULT_GOAL_MODEL],
      },
      resolver: zodResolver(goalSchema),
    });

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line no-magic-numbers
      setValue("goals", data[0]);
      // setValue("goals", data);
    }
  }, [data, setValue]);

  const { append, fields, remove } = useFieldArray({ control, name: "goals" });

  const onSubmit = (data: GoalFormValuesSchema) => {
    onAddGoalsMutation.mutate(data);
  };

  if (isLoading) {
    return <div>is Loading...</div>;
  }
  if (isError) {
    return <div>wystąpił błąd</div>;
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((el, i) => (
          // comment index in eslint
          <Box key={el.id}>
            <Container>
              <Text>
                {t("goalHeader.title")} {i + countValue}{" "}
              </Text>

              <TextForm
                control={control}
                isInput={false}
                placeholder={"Nazwa celu"}
                {...register(`goals.${i}.goalName`)}
              />
            </Container>
            <TextForm
              control={control}
              isInput={false}
              label={t("goalHeader.explanationQuestion")}
              placeholder={""}
              {...register(`goals.${i}.explanationQuestion`)}
            />

            <ThreeMonthsTasks
              control={control}
              nestedTaskName={`goals.${i}.tasks`}
              register={register}
            />
            <TextForm
              control={control}
              isInput={false}
              label={"Korzyści"}
              placeholder={""}
              {...register(`goals.${i}.yourBenefits`)}
            />
            <TextForm
              control={control}
              isInput={false}
              label={"Blokady"}
              placeholder={""}
              {...register(`goals.${i}.yourDisturber`)}
            />

            <Button type="button" onClick={() => remove(i)}>
              Remove goal
            </Button>
          </Box>
        ))}

        <>
          <Button type="button" onClick={() => append(DEAFAULT_GOAL_MODEL)}>
            Add next
          </Button>

          <Button type="submit">SAVE</Button>
        </>
      </form>
    </Box>
  );
};

export default ThreeMonthsGoalsPlanner;
