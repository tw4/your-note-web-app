import { z } from 'zod';
import { Note } from '@/types';
export const ZodUserValidationSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  token: z.string().min(1),
  createdAt: z.string().min(1),
  lastLogin: z.string().min(1),
  notes: z.string().min(2),
});
