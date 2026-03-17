import { describe, it, expect, vi, beforeEach } from 'vitest'
import { login, logout } from './auth'
import prisma from '@/lib/prisma'
import { cookies } from 'next/headers'
import * as crypto from 'crypto'

vi.mock('@/lib/prisma', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
    },
  },
}))

const mockCookies = {
  set: vi.fn(),
  delete: vi.fn(),
  get: vi.fn(),
}

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => mockCookies),
}))

describe('Auth Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('should return success true for valid credentials', async () => {
      const mockUser = {
        id: 'user-1',
        email: 'test@example.com',
        passwordHash: crypto.createHash('sha256').update('password123').digest('hex'),
      }
      ;(prisma.user.findUnique as any).mockResolvedValue(mockUser)

      const result = await login({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result.success).toBe(true)
      expect(mockCookies.set).toHaveBeenCalled()
    })

    it('should return error for invalid credentials', async () => {
      const mockUser = {
        id: 'user-1',
        email: 'test@example.com',
        passwordHash: crypto.createHash('sha256').update('wrongpassword').digest('hex'),
      }
      ;(prisma.user.findUnique as any).mockResolvedValue(mockUser)

      const result = await login({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Invalid email or password')
      expect(cookies().set).not.toHaveBeenCalled()
    })

    it('should return error for non-existent user', async () => {
      ;(prisma.user.findUnique as any).mockResolvedValue(null)

      const result = await login({
        email: 'nonexistent@example.com',
        password: 'password123',
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Invalid email or password')
    })
  })

  describe('logout', () => {
    it('should delete session cookie', async () => {
      await logout()
      expect(mockCookies.delete).toHaveBeenCalledWith('session')
    })
  })
})
