import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from './page';
import '@testing-library/jest-dom';

// Mock fetch
global.fetch = jest.fn();

describe('Contact Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<Contact />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Verification: 1 \+ 1 = \?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('shows error if CAPTCHA is incorrect', async () => {
    render(<Contact />);
    
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello' } });
    fireEvent.change(screen.getByLabelText(/Verification: 1 \+ 1 = \?/i), { target: { value: '3' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(await screen.findByText(/Incorrect answer to the math question/i)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('submits the form successfully with correct CAPTCHA', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<Contact />);
    
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Inquiry' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello' } });
    fireEvent.change(screen.getByLabelText(/Verification: 1 \+ 1 = \?/i), { target: { value: '2' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(screen.getByText(/Message sent successfully/i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        name: 'John',
        email: 'john@example.com',
        subject: 'Inquiry',
        message: 'Hello',
      }),
    }));

    // Form should be cleared
    expect(screen.getByLabelText(/Name/i)).toHaveValue('');
  });

  it('handles submission errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Server error' }),
    });

    render(<Contact />);
    
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello' } });
    fireEvent.change(screen.getByLabelText(/Verification: 1 \+ 1 = \?/i), { target: { value: '2' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(screen.getByText(/Error: Server error/i)).toBeInTheDocument();
    });
  });

  it('handles network errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<Contact />);
    
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello' } });
    fireEvent.change(screen.getByLabelText(/Verification: 1 \+ 1 = \?/i), { target: { value: '2' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(screen.getByText(/Error sending message. Please try again later/i)).toBeInTheDocument();
    });
  });
});
