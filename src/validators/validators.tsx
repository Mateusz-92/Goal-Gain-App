import { v4 as uuidv4 } from 'uuid';
import { string, z } from 'zod';

import i18n from '../i18n';
const minLength: number = 1;

export const generateUUID = () => uuidv4();
export const taskSchema = z.object({
  finishDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: i18n.t('common:validations.taskFinishDateInvalid'),
  }),
  id: z.string().uuid().default(generateUUID),
  isEnded: z.boolean(),
  // id: z.string().uuid().optional(),

  name: z.string().min(minLength, { message: i18n.t('common:validations.taskNameRequired') }),
});

export const singleGoalSchema = z.object({
  explanationQuestion: z.string().min(minLength, {
    message: i18n.t('common:validations.explanationQuestionRequired'),
  }),
  // id: z.string().uuid().optional(),
  goalName: z
    .string({ required_error: i18n.t('common:validations.goalNameRequired') })
    .min(minLength, { message: i18n.t('common:validations.goalNameRequired') }),
  id: z.string().uuid().default(generateUUID),

  tasks: z.array(taskSchema),
  yourBenefits: z.string().min(minLength, {
    message: i18n.t('common:validations.yourBenefitsRequired'),
  }),
  yourDisturber: z.string().min(minLength, {
    message: i18n.t('common:validations.yourDisturberRequired'),
  }),
});

export type SingleGoalValuesSchema = z.infer<typeof singleGoalSchema>;

export const goalSchema = z.object({
  date: z.string().optional(),
  goals: z.array(singleGoalSchema),
  id: z.string().optional(),
});

export type GoalFormValuesSchema = z.infer<typeof goalSchema>;

export const MonthlyRatingData = z.object({
  date: z.string(),
  explanationOfRate: z.string().min(minLength, {
    message: i18n.t('common:validations.explanationQuestionRequired'),
  }),
  id: z.string().optional(),
  lessonOfLife: z.string().min(minLength, {
    message: i18n.t('common:validations.explanationQuestionRequired'),
  }),
  monthsRate: z.string().min(minLength, {
    message: i18n.t('common:validations.explanationQuestionRequired'),
  }),
  theBiggestChalange: z.string().min(minLength, {
    message: i18n.t('common:validations.explanationQuestionRequired'),
  }),
  value: z.string().min(minLength, { message: 'Ocena jest wymagana' }),
});

export type MonthlyValuesRatingSchema = z.infer<typeof MonthlyRatingData>;

const WeekDayPlanSchema = z.object({
  date: z.string().optional(),
  id: z.string().uuid().default(generateUUID),
  plan: z.string().optional(),
});
export type WeekDayPlanData = z.infer<typeof WeekDayPlanSchema>;

const GoalWeekSchema = z.object({
  id: z.string().uuid().default(generateUUID),
  name: z.string().min(minLength, { message: i18n.t('common:validations.goalNameRequired') }),
  status: z.boolean(),
});

export const WeekPlannerDataSchema = z.object({
  // userId: z.string().min(minLength, { message: i18n.t("common:validations.userIdRequired") }),
  days: z.array(WeekDayPlanSchema),
  explanation: z.string().min(minLength, {
    message: i18n.t('common:validations.explanationRequired'),
  }),
  goal: z.array(GoalWeekSchema),
  id: string().optional(),
  rate: z.string().min(minLength, { message: i18n.t('common:validations.rateRequired') }),
  startDay: z.string().min(minLength, { message: 'Week is required' }),
});
export type WeekPlannerData = z.infer<typeof WeekPlannerDataSchema>;

export const answerForMonthSchema = z.object({

  answer: z.string().min(minLength, { message: 'answer is required' }),
  date: z.string().optional(),
  id: z.string().optional(),
  question: z.string().optional(),
});

export type answerForMonthData = z.infer<typeof answerForMonthSchema>;
export const answer = z.object({
  date: z.string(),
  text: z.string().min(minLength, { message: 'field is required' }),
});
export const monthAnswerSchema = z.object({
  answers: z.array(answer),
  id: z.string().optional(),
  month: z.string(),
  questionTitle: z.string().min(minLength, { message: 'field is required' }),
  userId: z.string(),
});
export type monthAnswerData = z.infer<typeof monthAnswerSchema>;

export const questionForMonthSchema = z.object({
  answer: z.string().optional(),
  date: z.string().optional(),
  id: z.string().optional(),
  question: z.string().min(minLength, { message: 'answer is required' }),
});
export type questionForMonthData = z.infer<typeof questionForMonthSchema>;


const passwordSchema = z.object({
  password: z.string().min(6, 'Hasło musi mieć co najmniej 6 znaków'),
});

export const loginSchema = passwordSchema.extend({
  email: z.string().email('Nieprawidłowy email'),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string().nonempty('Potwierdzenie hasła jest wymagane'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Hasła się nie zgadzają',
    path: ['confirmPassword'],
  });

export const changePasswordSchema = passwordSchema
  .extend({
    confirmPassword: z.string().nonempty('Potwierdzenie hasła jest wymagane'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Hasła się nie zgadzają',
    path: ['confirmPassword'],
  });

export type FormData = z.infer<typeof loginSchema> & {
  confirmPassword?: string;
};
