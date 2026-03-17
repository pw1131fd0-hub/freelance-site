import * as crypto from 'crypto'
import { cookies } from 'next/headers'

const SESSION_SECRET = process.env.SESSION_SECRET || 'solopreneur-one-secret-2026'

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, storedHash: string) {
  try {
    const [salt, hash] = storedHash.split(':')
    if (!salt || !hash) return false
    const verifyHash = crypto.scryptSync(password, salt, 64).toString('hex')
    return hash === verifyHash
  } catch {
    return false
  }
}

export async function verifySession(token: string) {
  try {
    const [payloadBase64, signature] = token.split('.')
    if (!payloadBase64 || !signature) return null
    
    const payload = Buffer.from(payloadBase64, 'base64').toString()
    
    const hmac = crypto.createHmac('sha256', SESSION_SECRET)
    hmac.update(payload)
    if (signature !== hmac.digest('hex')) return null
    
    const { userId, exp } = JSON.parse(payload)
    if (Date.now() > exp) return null
    
    return userId
  } catch {
    return null
  }
}

export async function checkAuth() {
  const sessionToken = cookies().get('session')?.value
  if (!sessionToken) return null
  return await verifySession(sessionToken)
}
