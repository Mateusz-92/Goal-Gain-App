import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { indexNum } from "../../../constants";
import {
  WeekPlannerData,
  WeekPlannerDataSchema,
} from "../../../validators/validators";

import { WeekHeader } from "./WeekHeader";
const arrLength: number = 7;
const arrRadioLength: number = 10;

const DEAFAULT_WEEK_MODEL: WeekPlannerData = {
  days: Array(arrLength).fill({ date: "", description: "" }),
  goal1: "",
  goal2: "",
  goal3: "",
  isEnded: false,
  rating: "",
  week: "",
  weekRatingExplanation: "",
};

const WeekPlanner: React.FC = () => {
  const { t } = useTranslation(["common"]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<WeekPlannerData>({
    defaultValues: DEAFAULT_WEEK_MODEL,
    resolver: zodResolver(WeekPlannerDataSchema),
  });
  const { fields } = useFieldArray({ control, name: "days" });

  const onSubmit = (data: WeekPlannerData) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Text>{t("weekPlanner.weekText")} </Text>
          <Input type="week" {...register("week")} />
          {errors.week && <Text color={"red"}>{errors.week.message}</Text>}
        </Container>
        <Container display={"flex"} justifyContent={"center"}>
          <Text alignSelf={"center"}>{t("weekPlanner.goal1")}</Text>
          <Input
            {...register("goal1")}
            marginLeft={3}
            marginRight={3}
            width={"75 %"}
          />
          <Checkbox {...register(`isEnded`)} />
          {errors.goal1 && <Text color={"red"}>{errors.goal1.message}</Text>}
        </Container>
        <Container display={"flex"} justifyContent={"center"}>
          <Text alignSelf={"center"}>{t("weekPlanner.goal2")} </Text>
          <Input
            marginLeft={3}
            marginRight={3}
            width={"75 %"}
            {...register("goal2")}
          />
          <Checkbox {...register(`isEnded`)} />
          {errors.goal2 && <Text color={"red"}>{errors.goal2.message}</Text>}
        </Container>
        <Container display={"flex"} justifyContent={"center"}>
          <Text alignSelf={"center"}>{t("weekPlanner.goal3")}</Text>
          <Input
            marginLeft={3}
            marginRight={3}
            width={"75 %"}
            {...register("goal3")}
          />
          <Checkbox {...register(`isEnded`)} />
          {errors.goal3 && <Text color={"red"}>{errors.goal3.message}</Text>}
        </Container>

        {fields.map((field, index) => (
          <WeekHeader
            key={`field_${Math.random()}`}
            errors={errors}
            field={field}
            index={index}
            register={register}
          />
        ))}

        <Box mb={4}>
          <Text>{t("weekPlanner.weekRatingQuestion")}</Text>
          <Flex alignItems="center" flexDirection={"column"}>
            <RadioGroup>
              {[...Array(arrRadioLength)].map((_, index) => (
                <Radio
                  {...register(`rating`)}
                  // key={index}
                  key={`radio_${Math.random()}`}
                  mx={1}
                  value={String(index + indexNum)}
                >
                  {index + indexNum}
                </Radio>
              ))}
            </RadioGroup>
            {errors.rating && (
              <Text color={"red"}>{errors.rating.message}</Text>
            )}
          </Flex>
          <Textarea
            placeholder={t("monthlyRating.answer")}
            {...register("weekRatingExplanation")}
          />
          {errors.weekRatingExplanation && (
            <Text color={"red"}>{errors.weekRatingExplanation.message}</Text>
          )}
        </Box>
        <Button type="submit"> Zapisz</Button>
      </form>
    </Box>
  );
};

export default WeekPlanner;
