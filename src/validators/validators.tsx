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

export type GoalSchema = z.infer<typeof goalSchema>;
