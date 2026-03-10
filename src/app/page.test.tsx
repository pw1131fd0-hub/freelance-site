import { renderToString } from 'react-dom/server';
import Home from './page';

describe('Home Page (Static Rendering)', () => {
  it('renders the header section with correct text', () => {
    const html = renderToString(<Home />);
    
    // Check for the main heading
    expect(html).toContain('iiNumbers, Inc - 木刻思股份有限公司');
    
    // Check for the subheadings
    expect(html).toContain('The Leading AI Foundry');
    
    // Check for the paragraph
    expect(html).toContain('helps enterprises build their AI-oriented');
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
    expect(html).toContain('mailto:contact@iinumbers.com');
  });
});
