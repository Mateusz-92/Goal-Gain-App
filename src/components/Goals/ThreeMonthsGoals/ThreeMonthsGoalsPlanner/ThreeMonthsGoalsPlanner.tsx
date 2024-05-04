import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Box, Button, Container, Text, Textarea } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { GoalFormValuesSchema, goalSchema,SingleGoalValuesSchema } from "../../../../validators/validators";
import ThreeMonthsTasks, {
  DEFAULT_TASK_MODEL,
} from "../ThreeMonthsTasks/ThreeMonthsTasks";
const DEAFAULT_GOAL_MODEL:SingleGoalValuesSchema = {
  explanationQuestion: "",
  goalName: "",
  tasks: [DEFAULT_TASK_MODEL],
  yourBenefits: "",
  yourDisturber: "",
};
const countValue: number = 1;
// const dummyGoals = [
//   {
//     goalName: "Zdobyć nowe umiejętności programistyczne",
//     explanationQuestion: "Dlaczego chcę zdobyć nowe umiejętności?",
//     yourBenefits: "Zwiększenie atrakcyjności na rynku pracy",
//     yourDisturber: "Brak pewności siebie w obecnych umiejętnościach",
//     tasks: [
//       {
//         name: "Przeanalizować trendy na rynku IT",
//         finishDate: "2024-05-15",
//         isEnded: false,
//       },
//       {
//         name: "Zapisać się na kurs programowania",
//         finishDate: "2024-05-20",
//         isEnded: false,
//       },
//       {
//         name: "Praktykować codziennie przez 1 godzinę",
//         finishDate: "2024-06-30",
//         isEnded: false,
//       },
//     ],
//   },
//   {
//     goalName: "Poprawić kondycję fizyczną",
//     explanationQuestion: "Dlaczego chcę poprawić kondycję fizyczną?",
//     yourBenefits: "Zwiększenie energii i samopoczucia",
//     yourDisturber: "Brak aktywności fizycznej w codziennym życiu",
//     tasks: [
//       {
//         name: "Zapisać się na siłownię",
//         finishDate: "2024-05-10",
//         isEnded: false,
//       },
//       {
//         name: "Rozpocząć trening biegowy",
//         finishDate: "2024-05-15",
//         isEnded: false,
//       },
//       {
//         name: "Regularnie ćwiczyć przez co najmniej 30 minut dziennie",
//         finishDate: "2024-06-30",
//         isEnded: true,
//       },
//     ],
//   },
// ];

const ThreeMonthsGoalsPlanner: React.FC = () => {
  const { t } = useTranslation(["common"]);

  // const { control, handleSubmit, register } = useForm({
    const { control, handleSubmit, register } = useForm<GoalFormValuesSchema>({
    defaultValues: {
      goals: [DEAFAULT_GOAL_MODEL],
    },
    resolver: zodResolver(goalSchema),
  });

  const { append, fields, remove } = useFieldArray({ control, name: "goals" });

  const onSubmit = () => {};
  // const onSubmit = (data: GoalSchema) => console.log("data", data);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((_, i) => (
          <Box key={Math.random()}>
            <Container>
              <Text>
                {t("goalHeader.title")} {i + countValue}{" "}
              </Text>

              <Textarea {...register(`goals.${i}.goalName`)} />
            </Container>
            <Text>{t("goalHeader.explanationQuestion")}</Text>

            <Textarea {...register(`goals.${i}.explanationQuestion`)} />
            <ThreeMonthsTasks
              control={control}
              nestedTaskName={`goals.${i}.tasks`}
              register={register}
            />
            <Text>korzycsi</Text>
            <Textarea {...register(`goals.${i}.yourBenefits`)} />
            <Text>Blokady</Text>
            <Textarea {...register(`goals.${i}.yourDisturber`)} />
            <Button type="button" onClick={() => remove(i)}>
              Remove goal
            </Button>
          </Box>
        ))}
        <Button type="button" onClick={() => append(DEAFAULT_GOAL_MODEL)}>
          Add next
        </Button>
        <Button type="submit">SAVE</Button>
      </form>
    </Box>
  );
};

export default ThreeMonthsGoalsPlanner;
