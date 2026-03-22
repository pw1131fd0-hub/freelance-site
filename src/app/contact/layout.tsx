import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '聯絡我 | OpenClaw',
  description:
    '歡迎聯繫討論機器學習專案、資料科學分析、NLP 應用或 MLOps 架構。位於台北，接受遠端合作。',
  openGraph: {
    title: '聯絡我 | OpenClaw',
    description:
      '歡迎聯繫討論機器學習專案、資料科學分析或 NLP 應用。',
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
