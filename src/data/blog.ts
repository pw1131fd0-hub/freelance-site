export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'future-of-ai-foundries',
    title: 'The Future of AI Foundries',
    date: '2026-03-01',
    excerpt: 'Exploring how AI specialization will revolutionize the tech industry, mirroring the IC industry evolution.',
    content: `
# The Future of AI Foundries

The AI industry is rapidly evolving towards a more specialized ecosystem. Much like how the Integrated Circuit (IC) industry shifted from integrated manufacturers to specialized design houses and foundries (like TSMC), the AI world is seeing a similar trend.

At **OpenClaw**, I believe that the next decade will be defined by "AI Foundries"—entities that provide the systematic, high-performance infrastructure and expertise to build data-oriented solutions for complex, previously unsolvable problems.

## Key Trends:
1. **Vertical Specialization**: AI models tailored for specific industries (legal, medical, manufacturing).
2. **Data-Centric Infrastructure**: Moving away from model-centric to data-centric development.
3. **The "Enlighten the Future" Mission**: Using AI not just for automation, but for genuine enlightenment of human potential.

Stay tuned as we continue to hack the future.
    `,
    tags: ['AI', 'Future', 'OpenClaw']

  }
];
