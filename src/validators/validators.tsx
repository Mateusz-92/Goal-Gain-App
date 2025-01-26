import { v4 as uuidv4 } from 'uuid';
import { string, z } from 'zod';

const minLength: number = 1;
const fieldIsRequired: string = 'Pole jest wymagane';
export const generateUUID = () => uuidv4();
export const taskSchema = z.object({
  finishDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: fieldIsRequired,
  }),
  id: z.string().uuid().default(generateUUID),
  isEnded: z.boolean(),

  name: z
    .string()
    .max(75, { message: 'Maksymalna długość tesktu wynosi 75 znaków' })
    .min(minLength, fieldIsRequired),
});

export const singleGoalSchema = z.object({
  explanationQuestion: z.string().min(minLength, {
    message: fieldIsRequired,
  }),
  goalName: z
    .string({ required_error: fieldIsRequired })
    .min(minLength, { message: fieldIsRequired })
    .max(100, { message: 'Maksymalna długość tesktu wynosi 100 znaków' }),
  id: z.string().uuid().default(generateUUID),

  tasks: z.array(taskSchema),
  yourBenefits: z
    .string()
    .max(75, { message: 'Maksymalna długość tesktu wynosi 100 znaków' })
    .min(minLength, {
      message: fieldIsRequired,
    }),
  yourDisturber: z
    .string()
    .max(75, { message: 'Maksymalna długość tesktu wynosi 75 znaków' })
    .min(minLength, {
      message: fieldIsRequired,
    }),
});

export type SingleGoalValuesSchema = z.infer<typeof singleGoalSchema>;

export const goalSchema = z.object({
  date: z.string().optional(),
  goals: z.array(singleGoalSchema).min(1),
  id: z.string().optional(),
});

export type GoalFormValuesSchema = z.infer<typeof goalSchema>;

export const MonthlyRatingData = z.object({
  date: z.string().refine(
    (inputDate) => {
      const currentMonth = new Date().toISOString().slice(0, 7);

      return inputDate === currentMonth;
    },
    {
      message: 'Możesz ocenić tylko obecny miesiąc',
    },
  ),
  explanationOfRate: z
    .string()
    .max(75, { message: 'Maksymalna długość tesktu wynosi 75 znaków' })
    .min(minLength, {
      message: fieldIsRequired,
    }),
  id: z.string().optional(),
  lessonOfLife: z
    .string()
    .max(75, { message: 'Maksymalna długość tesktu wynosi 75 znaków' })
    .min(minLength, {
      message: fieldIsRequired,
    }),
  monthsRate: z.string().min(minLength, {
    message: fieldIsRequired,
  }),
  theBiggestChalange: z
    .string()
    .max(75, { message: 'Maksymalna długość tesktu wynosi 75 znaków' })
    .min(minLength, {
      message: fieldIsRequired,
    }),
  value: z.string().min(minLength, { message: 'Ocena jest wymagana' }),
});

export type MonthlyValuesRatingSchema = z.infer<typeof MonthlyRatingData>;

const WeekDayPlanSchema = z.object({
  date: z.string().optional(),
  id: z.string().uuid().default(generateUUID),
  plan: z.string().max(75, { message: fieldIsRequired }).optional(),
});
export type WeekDayPlanData = z.infer<typeof WeekDayPlanSchema>;

const GoalWeekSchema = z.object({
  id: z.string().uuid().default(generateUUID),
  name: z
    .string()
    .max(75, { message: 'Maksymalna długość tesktu wynosi 75 znaków' })
    .min(minLength, { message: fieldIsRequired }),
  status: z.boolean(),
});

export const WeekPlannerDataSchema = z.object({
  days: z.array(WeekDayPlanSchema),
  explanation: z.string().min(minLength, {
    message: fieldIsRequired,
  }),
  goal: z.array(GoalWeekSchema),
  id: string().optional(),
  rate: z.string().optional(),
  startDay: z.string().min(minLength, { message: fieldIsRequired }),
});
export type WeekPlannerData = z.infer<typeof WeekPlannerDataSchema>;

export const answerForMonthSchema = z.object({
  answer: z
    .string()
    .max(75, { message: 'Maksymalna długość tesktu wynosi 75 znaków' })
    .min(minLength, { message: fieldIsRequired }),
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
  questionTitle: z
    .string()
    .max(75, { message: 'Maksymalna długość tesktu wynosi 75 znaków' })
    .min(minLength, { message: fieldIsRequired }),
  userId: z.string(),
});
export type monthAnswerData = z.infer<typeof monthAnswerSchema>;

export const questionForMonthSchema = z.object({
  answer: z.string().max(75, { message: 'Maksymalna długość tesktu wynosi 75 znaków' }).optional(),
  date: z.string().optional(),
  id: z.string().optional(),
  question: z.string().min(minLength, { message: fieldIsRequired }),
});
export type questionForMonthData = z.infer<typeof questionForMonthSchema>;

const passwordSchema = z.object({
  password: z
    .string()
    .max(75, { message: 'Maksymalna długość tesktu wynosi 75 znaków' })
    .min(6, 'Hasło musi mieć co najmniej 6 znaków'),
});

export const loginSchema = passwordSchema.extend({
  email: z
    .string()
    .max(75, { message: 'Maksymalna długość tesktu wynosi 75 znaków' })
    .email('Nieprawidłowy email'),
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
export const habitValidationSchema = z.object({
  date: z
    .string()
    .min(minLength, { message: 'Pole jest wymagane' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data musi być w formacie YYYY-MM-DD'),
  habits: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z
          .string()
          .min(minLength, { message: 'Pole jest wymagane' })
          .max(75, { message: 'Maksymalna długość tesktu wynosi 75 znaków' }),

        status: z.boolean(),
      }),
    )
    .min(1),
});

export type HabitFormValues = z.infer<typeof habitValidationSchema>;
