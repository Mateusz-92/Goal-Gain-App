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

export const singleGoalSchema = z.object({
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

export type SingleGoalValuesSchema = z.infer<typeof singleGoalSchema>;

export const goalSchema = z.object({
  goals: z.array(singleGoalSchema),
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
  date: z
    .string()
    .min(minLength, { message: i18n.t("common:validations.dateOfDay") }),
  description: z.string().optional(),
  // .min(minLength, { message: "Description is required" }),
});

export const WeekPlannerDataSchema = z.object({
  days: z.array(WeekDaySchema),
  goal1: z
    .string()
    .min(minLength, { message: i18n.t("common:validations.weekGoal") }),
  goal2: z
    .string()
    .min(minLength, { message: i18n.t("common:validations.weekGoal") }),
  goal3: z
    .string()
    .min(minLength, { message: i18n.t("common:validations.weekGoal") }),
  isEnded: z.boolean().optional(),
  rating: z.string().min(minLength, { message: "Graduate is required" }),
  week: z.string().min(minLength, { message: "Week is required" }),
  weekRatingExplanation: z
    .string()
    .min(minLength, { message: "Explanation is requaired" }),
});

export type WeekPlannerData = z.infer<typeof WeekPlannerDataSchema>;
