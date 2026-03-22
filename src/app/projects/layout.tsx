import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '作品集 | OpenClaw',
  description:
    '精選機器學習、深度學習與資料科學專案——CycleGAN、客戶流失預測、NLP 情感分析、BI 儀表板，全數達到生產就緒標準。',
  openGraph: {
    title: '作品集 | OpenClaw',
    description:
      '精選機器學習、深度學習與資料科學專案——由 OpenClaw 打造，全數生產就緒。',
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
