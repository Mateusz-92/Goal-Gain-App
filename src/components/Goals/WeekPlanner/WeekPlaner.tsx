import React, { useEffect } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import { indexNum } from "../../../constants";
import { useEditWeekPlan } from "../../../firebase/mutations";
import { useGetWeekPlan } from "../../../firebase/queries";
import {
  WeekPlannerData,
  WeekPlannerDataSchema,
} from "../../../validators/validators";
import { TextForm } from "../../Forms/TextForm/TextForm";

import { WeekHeader } from "./WeekHeader";
import ModalApp from "../../Modal/ModalApp";
import { useUser } from "../../../context/UserContext";

const arrLength = 7;
const arrRadioLength = 10;

const DEFAULT_WEEK_MODEL: WeekPlannerData = {
  days: Array(arrLength)
    .fill(null)
    .map(() => ({ date: "", id: uuidv4(), plan: "" })),
  explanation: "",
  // eslint-disable-next-line no-magic-numbers
  goal: Array(3)
    .fill(null)
    .map(() => ({ id: uuidv4(), name: "", status: false })),
  rate: "",
  startDay: "",
};

const WeekPlanner: React.FC = () => {
  const { t } = useTranslation(["common"]);
  const weekId: string = "";
  const { data, isError, isLoading } = useGetWeekPlan(weekId);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { addPoints } = useUser();

  const editWeekWithId = useEditWeekPlan(weekId);
  const editWeekWithoutId = useEditWeekPlan();

  const onAddWeekPlannMutation = weekId ? editWeekWithId : editWeekWithoutId;
  const pointsValue: number = 250;
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<WeekPlannerData>({
    defaultValues: DEFAULT_WEEK_MODEL,
    resolver: zodResolver(WeekPlannerDataSchema),
  });
  const { fields, replace } = useFieldArray({ control, name: "days" });

  const onSubmit = (data: WeekPlannerData) => {
    onAddWeekPlannMutation.mutate(data);
    onClose();
  };
  const handleSave = handleSubmit(() => {
    onOpen();
  });
  const handleAddPointsandData = () => {
    handleSubmit(onSubmit)();
    if (!weekId) addPoints(pointsValue);
  };
  const startDay = watch("startDay");
  const rate = watch("rate");

  const isValidDate = (date: string): boolean => {
    return !isNaN(Date.parse(date));
  };

  useEffect(() => {
    if (data) {
      setValue("days", data.days);
      setValue("explanation", data.explanation);
      setValue("goal", data.goal);
      setValue("rate", data.rate);
      setValue("startDay", data.startDay);
      replace(data.days);
    }
  }, [data, replace, setValue]);

  useEffect(() => {
    if (isValidDate(startDay)) {
      fields.forEach((field, index) => {
        const date = format(addDays(new Date(startDay), index), "yyyy-MM-dd");
        setValue(`days.${index}.date`, date);
      });
    }
  }, [fields, replace, startDay, setValue]);
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
          <Text>{t("weekPlanner.weekText")} </Text>

          <TextForm
            control={control}
            isInput={true}
            placeholder=""
            type="date"
            {...register("startDay")}
          />
        </Container>
        <Container display={"flex"} justifyContent={"center"}>
          <TextForm
            control={control}
            isInput={true}
            label="Cel nr 1"
            placeholder="wpisz cel"
            type="text"
            {...register("goal.0.name")}
          />
          <Checkbox {...register(`goal.0.status`)} />
        </Container>
        <Container display={"flex"} justifyContent={"center"}>
          <TextForm
            control={control}
            isInput={true}
            label="Cel nr 2"
            placeholder="wpisz cel"
            type="text"
            {...register("goal.1.name")}
          />
          <Checkbox {...register(`goal.1.status`)} />
        </Container>
        <Container display={"flex"} justifyContent={"center"}>
          <TextForm
            control={control}
            isInput={true}
            label="Cel nr 3"
            placeholder="wpisz cel"
            type="text"
            {...register("goal.2.name")}
          />
          <Checkbox {...register(`goal.2.status`)} />
        </Container>

        {fields.map((field, index) => {
          const date = watch(`days.${index}.date`);
          return (
            <WeekHeader
              key={field.id}
              date={date || ""}
              errors={errors}
              field={field}
              index={index}
              register={register}
            />
          );
        })}

        <Box mb={4}>
          <Text>{t("weekPlanner.weekRatingQuestion")}</Text>
          <Flex alignItems="center" flexDirection={"column"}>
            <RadioGroup
              value={rate}
              onChange={(value) => setValue("rate", value)}
            >
              {[...Array(arrRadioLength)].map((_, index) => (
                <Radio
                  key={uuidv4()}
                  // key={`radio_${index}`}
                  mx={1}
                  value={String(index + indexNum)}
                >
                  {index + indexNum}
                </Radio>
              ))}
            </RadioGroup>

            {errors.rate && <Text color={"red"}>{errors.rate.message}</Text>}
          </Flex>
          <TextForm
            control={control}
            isInput={false}
            placeholder={t("monthlyRating.answer")}
            {...register("explanation")}
          />
        </Box>
        <Button type="button" onClick={handleSave}>
          Zapisz
        </Button>
        <ModalApp
          body={`Potwierdź, aby dodać dane`}
          cancelText="Anuluj"
          confirmText="Tak"
          header="Czy chcesz dodać/ edytować dane?"
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleAddPointsandData}
        />
      </form>
    </Box>
  );
};

export default WeekPlanner;
