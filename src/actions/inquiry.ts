'use server'

import prisma from '@/lib/prisma'
import { InquirySchema, type InquiryInput } from '@/lib/schemas'

export async function submitInquiry(data: InquiryInput) {
  try {
    const validatedData = InquirySchema.parse(data)
    const budgetValue = validatedData.budget ? Number(validatedData.budget) : undefined
    
    // Automated lead scoring (very basic for MVP)
    let score = 0
    if (budgetValue && budgetValue > 5000) score += 50
    if (validatedData.timeline && validatedData.timeline.toLowerCase().includes('immediate')) score += 30
    
    const inquiry = await prisma.inquiry.create({
      data: {
        ...validatedData,
        budget: budgetValue,
        score,
        status: 'NEW',
      }
    })
    
    return { success: true, id: inquiry.id }
  } catch (error) {
    console.error('Failed to submit inquiry:', error)
    return { success: false, error: 'Internal server error' }
  }
}