import { z } from "zod";

import i18n from "../i18n";

const minLength: number = 1;

export const taskSchema = z.object({
  finishDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: i18n.t("common:validations.taskFinishDateInvalid"),
  }),
  isEnded: z.boolean(),
  name: z
    .string()
    .min(minLength, { message: i18n.t("common:validations.taskNameRequired") }),
});

export const goalSchema = z.object({
  explanationQuestion: z.string().min(minLength, {
    message: i18n.t("common:validations.explanationQuestionRequired"),
  }),
  goalName: z
    .string({ required_error: i18n.t("common:validations.goalNameRequired") })
    .min(minLength, { message: i18n.t("common:validations.goalNameRequired") }),
  tasks: z.array(taskSchema),
  yourBenefits: z.string().min(minLength, {
    message: i18n.t("common:validations.yourBenefitsRequired"),
  }),
  yourDisturber: z.string().min(minLength, {
    message: i18n.t("common:validations.yourDisturberRequired"),
  }),
});

export type GoalFormValuesSchema = z.infer<typeof goalSchema>;

export const MonthlyRatingData = z.object({
  explanationOfRate: z.string().min(minLength, {
    message: i18n.t("common:validations.explanationQuestionRequired"),
  }),
  lessonOfLife: z.string().min(minLength, {
    message: i18n.t("common:validations.explanationQuestionRequired"),
  }),
  monthsRate: z.string().min(minLength, {
    message: i18n.t("common:validations.explanationQuestionRequired"),
  }),
  theBiggestChalange: z.string().min(minLength, {
    message: i18n.t("common:validations.explanationQuestionRequired"),
  }),
  value: z.string().min(minLength, { message: "Ocena jest wymagana" }),
});

export type MonthlyValuesRatingSchema = z.infer<typeof MonthlyRatingData>;
const WeekDaySchema = z.object({
  date: z.string().min(minLength, { message: "Date is required" }),
  description: z
    .string()
    .min(minLength, { message: "Description is required" }),
});

export const WeekPlannerDataSchema = z.object({
  days: z.array(WeekDaySchema),
  goal1: z.string().min(minLength, { message: "Goal 1 is required" }),
  goal2: z.string().min(minLength, { message: "Goal 2 is required" }),
  goal3: z.string().min(minLength, { message: "Goal 3 is required" }),
  rating: z.string().min(minLength, { message: "Graduate is required" }),
  week: z.string().min(minLength, { message: "Week is required" }),
  weekRatingExplanation: z
    .string()
    .min(minLength, { message: "Explanation is requaired" }),
});

export type WeekPlannerData = z.infer<typeof WeekPlannerDataSchema>;
