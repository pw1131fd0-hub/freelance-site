import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  email: z.string().email('Invalid email address'),
  subject: z.string().max(100).optional(),
  message: z.string().min(1, 'Message is required').max(1000),
});

// Basic in-memory rate limiting (for MVP, resets on server restart)
export const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 3; // 3 requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_LIMIT_MAP_SIZE = 1000; // Limit map size to prevent memory leaks

export async function POST(request: Request) {
  try {
    // Basic Rate Limiting based on IP
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    
    // Cleanup if map gets too large
    if (rateLimitMap.size > MAX_LIMIT_MAP_SIZE) {
      rateLimitMap.clear();
    }

    const rateLimitData = rateLimitMap.get(ip);
    
    if (rateLimitData) {
      if (now - rateLimitData.timestamp < RATE_LIMIT_WINDOW) {
        if (rateLimitData.count >= RATE_LIMIT) {
          return NextResponse.json(
            { success: false, error: 'Rate limit exceeded' },
            { status: 429 }
          );
        }
        rateLimitData.count += 1;
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    const body = await request.json();
    const validatedData = contactSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validatedData.error.issues },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validatedData.data;

    // Send email using Resend
    if (process.env.RESEND_API_KEY) {
      const { error } = await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL || 'owner@example.com',
        subject: subject || `New Contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });

      if (error) {
        console.error('Failed to send email:', error);
        return NextResponse.json(
          { success: false, error: 'Internal server error details' },
          { status: 500 }
        );
      }
    } else {
      console.warn('RESEND_API_KEY not set. Simulating successful email send.', { name, email, message });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Contact API unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error details' },
      { status: 500 }
    );
  }
}
