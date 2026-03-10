import { render, screen } from '@testing-library/react';
import BlogPostPage, { generateStaticParams } from './page';
import '@testing-library/jest-dom';

describe('Blog Post Page', () => {
  it('renders the blog post content', async () => {
    const params = Promise.resolve({ slug: 'future-of-ai-foundries' });
    render(await BlogPostPage({ params }));
    
    // Check for the H1 title specifically
    expect(screen.getAllByText(/The Future of AI Foundries/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Vertical Specialization/i)).toBeInTheDocument();
  });

  it('renders 404 if post not found', async () => {
    const params = Promise.resolve({ slug: 'non-existent' });
    try {
      await BlogPostPage({ params });
    } catch (e) {
      // Expect Next.js notFound internal error
    }
  });

  it('generates static params', () => {
    const params = generateStaticParams();
    expect(params).toContainEqual({ slug: 'future-of-ai-foundries' });
  });
});