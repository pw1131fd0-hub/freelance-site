import { describe, it, expect, vi } from 'vitest'
import { verifySession } from './auth-utils'
import * as crypto from 'crypto'

const SESSION_SECRET = 'solopreneur-one-secret-2026'

describe('Auth Utils', () => {
  it('should verify a valid session token', async () => {
    const payload = JSON.stringify({ userId: 'user-1', exp: Date.now() + 10000 })
    const payloadBase64 = Buffer.from(payload).toString('base64')
    const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex')
    const token = `${payloadBase64}.${signature}`

    const userId = await verifySession(token)
    expect(userId).toBe('user-1')
  })

  it('should return null for an invalid signature', async () => {
    const payload = JSON.stringify({ userId: 'user-1', exp: Date.now() + 10000 })
    const payloadBase64 = Buffer.from(payload).toString('base64')
    const token = `${payloadBase64}.invalid-signature`

    const userId = await verifySession(token)
    expect(userId).toBe(null)
  })

  it('should return null for an expired session', async () => {
    const payload = JSON.stringify({ userId: 'user-1', exp: Date.now() - 10000 })
    const payloadBase64 = Buffer.from(payload).toString('base64')
    const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex')
    const token = `${payloadBase64}.${signature}`

    const userId = await verifySession(token)
    expect(userId).toBe(null)
  })

  it('should return null for malformed token', async () => {
    const userId = await verifySession('invalid-token')
    expect(userId).toBe(null)
  })

  it('should return null for invalid JSON payload', async () => {
    const payload = 'not-json'
    const payloadBase64 = Buffer.from(payload).toString('base64')
    const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex')
    const token = `${payloadBase64}.${signature}`

    const userId = await verifySession(token)
    expect(userId).toBe(null)
  })
})
