import * as crypto from 'crypto'

const SESSION_SECRET = process.env.SESSION_SECRET || 'solopreneur-one-secret-2026'

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
