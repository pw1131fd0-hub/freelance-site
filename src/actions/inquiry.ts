'use server'

import prisma from '@/lib/prisma'
import { InquirySchema, type InquiryInput } from '@/lib/schemas'
import { headers } from 'next/headers'

// In-memory rate limiting (Note: clears on server restart, not persistent across multi-node)
const RATE_LIMIT_MS = 60000 // 1 minute
const submissionLog = new Map<string, number>()

export async function submitInquiry(data: InquiryInput) {
  const clientIp = headers().get('x-forwarded-for')?.split(',')[0] || 'unknown'
  const now = Date.now()
  const lastTime = submissionLog.get(clientIp)

  if (lastTime && now - lastTime < RATE_LIMIT_MS) {
    return { success: false, error: 'TRANSMISSION FREQUENCY EXCEEDED. PLEASE WAIT 60 SECONDS.' }
  }

  try {
    const validatedData = InquirySchema.parse(data)

    // Honeypot check
    if (validatedData.honeypot) {
      console.warn(`Spambot detected from ${clientIp}`)
      return { success: true, id: 'spambot-filtered' } // Silent success for spambots
    }

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
        name: validatedData.name,
        email: validatedData.email,
        budget: budgetValue,
        timeline: validatedData.timeline,
        message: validatedData.message,
        projectType: validatedData.projectType,
        score,
        status: 'NEW',
      }
    })
    
    // Update rate limit log
    submissionLog.set(clientIp, now)
    
    return { success: true, id: inquiry.id }
  } catch (error) {
    console.error('Failed to submit inquiry:', error)
    return { success: false, error: 'INTERNAL SERVER ERROR' }
  }
}