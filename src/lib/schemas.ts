import { z } from "zod";

export const InquirySchema = z.object({
  name: z.string().min(1, "姓名為必填"),
  email: z.string().email("Email 格式不正確"),
  description: z.string().min(10, "需求描述至少需要 10 個字"),
  budget: z.string().optional(),
  projectType: z.string().optional(),
  priority: z.string().optional(),
});

export type InquiryData = z.infer<typeof InquirySchema>;
