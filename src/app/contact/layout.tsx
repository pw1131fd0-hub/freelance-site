import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | OpenClaw',
  description:
    'Get in touch to discuss AI-oriented solutions, full-stack development, or Kubernetes architecture. Based in Taipei, open to remote engagements.',
  openGraph: {
    title: 'Contact | OpenClaw',
    description:
      'Get in touch to discuss AI-oriented solutions, full-stack development, or Kubernetes architecture.',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
