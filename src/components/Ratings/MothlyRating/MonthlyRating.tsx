import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  MonthlyRatingData,
  MonthlyValuesRatingSchema,
} from "../../../validators/validators";

type MonthlyRatingProps = {
  month: string;
};

type monthlyRating = {
  explanationOfRate: string;
  lessonOfLife: string;
  monthsRate: string;
  theBiggestChalange: string;
  value: string;
};
const arrRadioLength: number = 10;
const DEAFAULT_RATING_MODEL: monthlyRating = {
  explanationOfRate: "",
  lessonOfLife: "",
  monthsRate: "",
  theBiggestChalange: "",
  value: "",
};
export const indexNum: number = 1;
// move on indexNum to constant file
const MonthlyRating: React.FC<MonthlyRatingProps> = ({ month }) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<MonthlyValuesRatingSchema>({
    defaultValues: DEAFAULT_RATING_MODEL,
    resolver: zodResolver(MonthlyRatingData),
  });

  const onSubmit = (data: MonthlyValuesRatingSchema) => {
    // eslint-disable-next-line no-console
    console.log("data", data);
  };
  const { t } = useTranslation(["common"]);
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h2" mb={4} size="lg">
          {t("monthlyRating.monthlyRatingHeader")} - {month}
        </Heading>
        <Box mb={4}>
          <Text>{t("monthlyRating.monthlyRatingQuestion")}</Text>
          <Flex
            alignItems="center"
            direction={"column"}
            justifyContent="center"
          >
            <RadioGroup mb={5} mt={5}>
              {[...Array(arrRadioLength)].map((_, index) => (
                <Radio
                  {...register(`value`)}
                  // key={index}
                  key={`radio_${Math.random()}`}
                  mx={1}
                  value={String(index + indexNum)}
                >
                  {index + indexNum}
                </Radio>
              ))}
            </RadioGroup>
            {errors.value && <Text color={"red"}>{errors.value.message}</Text>}
          </Flex>
          <Textarea
            {...register(`monthsRate`)}
            placeholder={t("monthlyRating.explanationOfQuestion")}
          />

          {errors.monthsRate && (
            <Text color={"red"}>{errors.monthsRate.message}</Text>
          )}
        </Box>
        <Box>
          <Text mb={5}>{t("monthlyRating.Question1")}</Text>
          <Textarea
            {...register(`explanationOfRate`)}
            placeholder={t("monthlyRating.answer")}
          />

          {errors.explanationOfRate && (
            <Text color={"red"}>{errors.explanationOfRate.message}</Text>
          )}
        </Box>
        <Box>
          <Text mb={5}>{t("monthlyRating.Question2")}</Text>
          <Textarea
            {...register(`theBiggestChalange`)}
            placeholder={t("monthlyRating.answer")}
          />

          {errors.theBiggestChalange && (
            <Text color={"red"}>{errors.theBiggestChalange.message}</Text>
          )}
        </Box>
        <Box>
          <Text mb={5}>{t("monthlyRating.Question3")}</Text>
          <Textarea
            {...register(`lessonOfLife`)}
            placeholder={t("monthlyRating.answer")}
          />

          {errors.lessonOfLife && (
            <Text color={"red"}>{errors.lessonOfLife.message}</Text>
          )}
        </Box>
        <Button type="submit">Zapisz</Button>
      </form>
    </Box>
  );
};

export default MonthlyRating;
