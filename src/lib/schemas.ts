import { z } from 'zod'

export const InquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  projectType: z.string().min(2, 'Project type is required'),
  honeypot: z.string().optional(),
})

export type InquiryInput = z.infer<typeof InquirySchema>

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginInput = z.infer<typeof LoginSchema>
