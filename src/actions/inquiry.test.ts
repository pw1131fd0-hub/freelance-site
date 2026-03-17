import { describe, it, expect, vi, beforeEach } from 'vitest'
import { submitInquiry } from './inquiry'
import prisma from '@/lib/prisma'

vi.mock('@/lib/prisma', () => ({
  default: {
    inquiry: {
      create: vi.fn(),
    },
  },
}))

describe('Inquiry Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('submitInquiry', () => {
    it('should calculate score and create inquiry for high budget and immediate timeline', async () => {
      const mockInquiry = { id: 'inq-1' }
      ;(prisma.inquiry.create as any).mockResolvedValue(mockInquiry)

      const input = {
        name: 'John Doe',
        email: 'john@example.com',
        budget: '15000',
        timeline: 'immediate',
        message: 'I need a new website very quickly and I have a large budget.',
        projectType: 'Web Dev',
      }

      const result = await submitInquiry(input)

      expect(result.success).toBe(true)
      expect(result.id).toBe('inq-1')
      
      const createCall = (prisma.inquiry.create as any).mock.calls[0][0].data
      // Score calculation: budget > 10000 (50) + immediate (30) + message length > 50 (10) = 90
      expect(createCall.score).toBe(90)
    })

    it('should calculate score and create inquiry for medium budget and moderate timeline', async () => {
      const mockInquiry = { id: 'inq-2' }
      ;(prisma.inquiry.create as any).mockResolvedValue(mockInquiry)

      const input = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        budget: '4000',
        timeline: '1-3 months',
        message: 'Short message.',
        projectType: 'Branding',
      }

      const result = await submitInquiry(input)

      expect(result.success).toBe(true)
      
      const createCall = (prisma.inquiry.create as any).mock.calls[0][0].data
      // Score calculation: budget > 2000 (15) + 1-3 months (15) + message length < 50 (0) = 30
      expect(createCall.score).toBe(30)
    })

    it('should return error for invalid data', async () => {
      const input = {
        name: '', // Invalid name
        email: 'invalid-email',
        message: '',
        projectType: '',
      }

      const result = await submitInquiry(input as any)

      expect(result.success).toBe(false)
      expect(prisma.inquiry.create).not.toHaveBeenCalled()
    })
  })
})
