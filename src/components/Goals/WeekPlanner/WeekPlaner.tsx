import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { indexNum } from "../../../constants";
import {
  WeekPlannerData,
  WeekPlannerDataSchema,
} from "../../../validators/validators";
import { TextForm } from "../../Forms/TextForm/TextForm";

import { WeekHeader } from "./WeekHeader";
const arrLength: number = 7;
const arrRadioLength: number = 10;

const DEAFAULT_WEEK_MODEL: WeekPlannerData = {
  days: Array(arrLength).fill({ date: "", description: "" }),
  endDay: "",
  goal1: "",
  goal2: "",
  goal3: "",
  isEnded: false,
  rating: "",
  startDay: "",
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

          <TextForm
            control={control}
            isInput={true}
            placeholder=""
            type="date"
            {...register("startDay")}
          />
          <TextForm
            control={control}
            isInput={true}
            placeholder=""
            type="date"
            {...register("endDay")}
          />
        </Container>
        <Container display={"flex"} justifyContent={"center"}>
          <TextForm
            control={control}
            isInput={true}
            label="Cel nr 1"
            placeholder="wpisz cel"
            type="text"
            {...register("goal1")}
          />
          <Checkbox {...register(`isEnded`)} />
        </Container>
        <Container display={"flex"} justifyContent={"center"}>
          <TextForm
            control={control}
            isInput={true}
            label="Cel nr 2"
            placeholder="wpisz cel"
            type="text"
            {...register("goal2")}
          />
          <Checkbox {...register(`isEnded`)} />
        </Container>
        <Container display={"flex"} justifyContent={"center"}>
          <TextForm
            control={control}
            isInput={true}
            label="Cel nr 3"
            placeholder="wpisz cel"
            type="text"
            {...register("goal3")}
          />
          <Checkbox {...register(`isEnded`)} />
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
          <TextForm
            control={control}
            isInput={false}
            placeholder={t("monthlyRating.answer")}
            {...register("weekRatingExplanation")}
          />
        </Box>
        <Button type="submit"> Zapisz</Button>
      </form>
    </Box>
  );
};

export default WeekPlanner;
