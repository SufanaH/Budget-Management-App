import { z, ZodType } from 'zod';



const Validation = z.object({
    amount: z.number().positive({ message: 'The amount must be a positive number' }),

})

/* export const IncomeExpenceTypes: ZodType<{ source: string; amount: number; date: string; id:string }>  = z.object({
  source: z.string().min(1).max(50),
  amount: z.number().positive(),
  date: z.string(),
  id: z.string()
});

type IncomeExpenceTypes = z.infer<typeof IncomeExpenceTypes>;

export const TargetForSavingFormSchema = z.object({
  target: z.number().positive({ message: 'The Target must be a positive number' }),
});


export const TransferForSavingFormSchema = z.object({
  amount: z.number().positive(),
});
 */


export default Validation;