import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
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
// import { addMonthtlyEvaulation } from "../../../firebase/Api";
import { useEditMonthRate } from "../../../firebase/mutations";
import { useGetMonthlyEvaluation } from "../../../firebase/queries";
import {
  MonthlyRatingData,
  MonthlyValuesRatingSchema,
} from "../../../validators/validators";

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

// move on indexNum to constant file
const MonthlyRating: React.FC = () => {
  const monthId = "E92NQF7TvJKB4Py1gT88";
  const { t } = useTranslation(["common"]);

  const { data, isError, isLoading } = useGetMonthlyEvaluation(monthId);
  // const onAddMonthRateMutation = useEditMonthRate();
  const editMonthRateWithId = useEditMonthRate(monthId);
  const editMonthRateWithoutId = useEditMonthRate();

  const onAddMonthRateMutation = monthId
    ? editMonthRateWithId
    : editMonthRateWithoutId;

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<MonthlyValuesRatingSchema>({
    defaultValues: DEAFAULT_RATING_MODEL,
    resolver: zodResolver(MonthlyRatingData),
  });

  const onSubmit = async (data: MonthlyValuesRatingSchema) => {
    // eslint-disable-next-line no-console
    console.log("data", data);
    await onAddMonthRateMutation.mutate(data);
  };
  const value = watch("value");

  useEffect(() => {
    if (data) {
      setValue("date", data.date);
      setValue("explanationOfRate", data.explanationOfRate);
      setValue("lessonOfLife", data.lessonOfLife);
      setValue("monthsRate", data.monthsRate);
      setValue("theBiggestChalange", data.theBiggestChalange);
      setValue("value", data.value);
    }
  }, [data, setValue]);
  if (isLoading) {
    return <div>isLoading</div>;
  }
  if (isError) {
    return <div>isError</div>;
  }
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Text>Wybierz oceniany miesiąc</Text>
          <Input
            placeholder="wybierz miesiąc"
            type="month"
            {...register(`date`)}
          />
        </Container>

        <Box mb={4}>
          <Text>{t("monthlyRating.monthlyRatingQuestion")}</Text>
          <Flex
            alignItems="center"
            direction={"column"}
            justifyContent="center"
          >
            <RadioGroup
              mb={5}
              mt={5}
              value={value}
              onChange={(value) => setValue("value", value)}
            >
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
