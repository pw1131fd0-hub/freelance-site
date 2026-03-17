'use server'

import prisma from '@/lib/prisma'
import { InquirySchema, type InquiryInput } from '@/lib/schemas'

export async function submitInquiry(data: InquiryInput) {
  try {
    const validatedData = InquirySchema.parse(data)
    const budgetValue = validatedData.budget ? Number(validatedData.budget) : undefined
    
    // Automated lead scoring
    let score = 0
    if (budgetValue) {
      if (budgetValue > 10000) score += 50
      else if (budgetValue > 5000) score += 30
      else if (budgetValue > 2000) score += 15
    }
    
    const timeline = validatedData.timeline?.toLowerCase() || ''
    if (timeline.includes('immediate')) score += 30
    if (timeline.includes('1-3 months')) score += 15
    
    const messageLength = validatedData.message.length
    if (messageLength > 200) score += 20
    else if (messageLength > 50) score += 10
    
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