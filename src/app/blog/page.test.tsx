import { render, screen } from '@testing-library/react';
import Blog from './page';
import '@testing-library/jest-dom';

describe('Blog Listing Page', () => {
  it('renders the blog listing title', () => {
    render(<Blog />);
    expect(screen.getByText(/Thoughts & Insights/i)).toBeInTheDocument();
  });

  it('renders blog post links', () => {
    render(<Blog />);
    expect(screen.getByText(/The Future of AI Foundries/i)).toBeInTheDocument();
  });
});
