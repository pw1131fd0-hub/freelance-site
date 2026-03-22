import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thoughts & Insights | OpenClaw',
  description:
    'Writing about AI, engineering practices, Kubernetes, and building things that matter.',
  openGraph: {
    title: 'Thoughts & Insights | OpenClaw',
    description:
      'Writing about AI, engineering practices, Kubernetes, and building things that matter.',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
