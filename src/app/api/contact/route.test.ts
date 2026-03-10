import { POST, rateLimitMap } from './route';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Mock the Next.js NextResponse
jest.mock('next/server', () => {
  return {
    NextResponse: {
      json: jest.fn((body, init) => ({
        status: init?.status || 200,
        json: async () => body,
      })),
    },
  };
});

// Mock Resend
jest.mock('resend', () => {
  const mSend = jest.fn();
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: mSend,
      },
    })),
  };
});

// Helper to get the mock send function
const getMockSend = () => {
  const resendInstance = new Resend();
  return resendInstance.emails.send as jest.Mock;
};

describe('Contact API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    rateLimitMap.clear();
    getMockSend().mockResolvedValue({ data: { id: 'test-id' }, error: null });
    process.env.RESEND_API_KEY = 're_test_key';
    process.env.CONTACT_EMAIL = 'test@example.com';
  });

  afterEach(() => {
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_EMAIL;
  });

  it('should return 400 if validation fails', async () => {
    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: '',
        email: 'invalid-email',
        message: '',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toBe('Validation failed');
  });

  it('should successfully send an email', async () => {
    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Hello, this is a test message.',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.message).toBe('Message sent successfully.');
    expect(getMockSend()).toHaveBeenCalledWith(expect.objectContaining({
      from: expect.any(String),
      to: 'test@example.com',
      subject: 'Test Subject',
      text: expect.stringContaining('John Doe'),
    }));
  });

  it('should trigger rate limit if called too many times', async () => {
    const makeRequest = () => new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'x-forwarded-for': '1.2.3.4' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello',
      }),
    });

    // We have a limit of 3.
    await POST(makeRequest());
    await POST(makeRequest());
    await POST(makeRequest());
    
    const res = await POST(makeRequest());
    expect(res.status).toBe(429);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toBe('Rate limit exceeded');
  });

  it('should reset rate limit after the window passes', async () => {
    const makeRequest = () => new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'x-forwarded-for': '1.2.3.4' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello',
      }),
    });

    // Call once
    await POST(makeRequest());
    
    // Fast-forward time (window is 60s)
    const originalNow = Date.now;
    Date.now = jest.fn(() => originalNow() + 61000);
    
    const res = await POST(makeRequest());
    expect(res.status).toBe(200);
    
    Date.now = originalNow;
  });

  it('should cleanup map if it gets too large', async () => {
    // Manually populate the map to near limit
    for (let i = 0; i < 1001; i++) {
      rateLimitMap.set(`1.1.1.${i}`, { count: 1, timestamp: Date.now() });
    }
    
    expect(rateLimitMap.size).toBe(1001);

    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello',
      }),
    });

    await POST(req);
    
    // Map should have been cleared and the new entry added
    expect(rateLimitMap.size).toBe(1);
  });

  it('should handle Resend errors', async () => {
    getMockSend().mockResolvedValueOnce({ data: null, error: { message: 'Resend API Error' } });

    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toBe('Internal server error details');
  });

  it('should handle unexpected errors', async () => {
    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: 'invalid-json',
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toBe('Internal server error details');
  });

  it('should simulate success when RESEND_API_KEY is not set', async () => {
    const mockSend = getMockSend();
    mockSend.mockClear();
    delete process.env.RESEND_API_KEY;
    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(mockSend).not.toHaveBeenCalled();
  });
});
