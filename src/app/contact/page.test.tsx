import { renderToString } from 'react-dom/server';
import Contact from './page';

describe('Contact Page (Static Rendering)', () => {
  it('renders the contact form correctly', () => {
    const html = renderToString(<Contact />);
    
    // Check for headings
    expect(html).toContain('Connect with iiNumbers');
    expect(html).toContain('Interested in building AI-oriented solutions');

    // Check for form fields
    expect(html).toContain('Name');
    expect(html).toContain('Email');
    expect(html).toContain('Message');

    // Check for submit button
    expect(html).toContain('Send Message');
  });

  it('renders direct contact info', () => {
    const html = renderToString(<Contact />);
    expect(html).toContain('mailto:contact@iinumbers.com');
  });
});
