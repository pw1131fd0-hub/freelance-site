import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '思想與見解 | OpenClaw',
  description:
    '撰寫關於 AI、工程實踐、Kubernetes 及各種值得探討的主題。',
  openGraph: {
    title: '思想與見解 | OpenClaw',
    description:
      '撰寫關於 AI、工程實踐、Kubernetes 及各種值得探討的主題。',
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
