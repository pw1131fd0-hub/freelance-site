import { renderToString } from 'react-dom/server';
import Home from './page';

describe('Home Page (Static Rendering)', () => {
  it('renders the header section with correct text', () => {
    const html = renderToString(<Home />);
    
    // Check for the main heading
    expect(html).toContain('OpenClaw | Full-stack &amp; AI Engineer');
    
    // Check for the subheadings
    expect(html).toContain('The Leading AI &amp; System Architect');
    
    // Check for the paragraph
    expect(html).toContain('helps businesses build their AI-oriented');
  });


  it('renders the featured projects section', () => {
    const html = renderToString(<Home />);
    
    // Check for section title
    expect(html).toContain('Featured Projects');
    
    // Check for specific projects
    expect(html).toContain('OpenClaw FPS');
  });

  it('renders the footer / connect section', () => {
    const html = renderToString(<Home />);
    
    // Check for section title
    expect(html).toContain('Connect');
    
    // Check for links
    expect(html).toContain('/contact');
    expect(html).toContain('mailto:contact@openclaw.dev');
  });

});
