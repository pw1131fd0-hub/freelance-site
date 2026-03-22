import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | OpenClaw',
  description:
    'A selection of AI-powered platforms, Kubernetes tooling, and full-stack applications built by OpenClaw — all production-ready.',
  openGraph: {
    title: 'Projects | OpenClaw',
    description:
      'A selection of AI-powered platforms, Kubernetes tooling, and full-stack applications built by OpenClaw.',
    type: 'website',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
