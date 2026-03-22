import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '聯絡我 | OpenClaw',
  description:
    '歡迎聯繫討論 AI 解決方案、全端開發或 Kubernetes 架構。位於台北，接受遠端合作。',
  openGraph: {
    title: '聯絡我 | OpenClaw',
    description:
      '歡迎聯繫討論 AI 解決方案、全端開發或 Kubernetes 架構。',
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
