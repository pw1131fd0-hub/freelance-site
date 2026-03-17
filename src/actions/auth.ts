'use server'

import prisma from '@/lib/prisma'
import { LoginSchema, type LoginInput } from '@/lib/schemas'
import { cookies } from 'next/headers'
import * as crypto from 'crypto'
import { verifyPassword } from '@/lib/auth-utils'

const SESSION_SECRET = process.env.SESSION_SECRET || 'solopreneur-one-secret-2026'

export async function login(data: LoginInput) {
  try {
    const validatedData = LoginSchema.parse(data)
    
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (!user || !verifyPassword(validatedData.password, user.passwordHash)) {
      return { success: false, error: 'Invalid email or password' }
    }
    
    // Simple signed session token
    const payload = JSON.stringify({ userId: user.id, exp: Date.now() + 24 * 60 * 60 * 1000 })
    const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex')
    const token = `${Buffer.from(payload).toString('base64')}.${signature}`
    
    cookies().set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'lax',
      path: '/'
    })
    
    return { success: true }
  } catch (error) {
    console.error('Login failed:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function logout() {
  cookies().delete('session')
}
