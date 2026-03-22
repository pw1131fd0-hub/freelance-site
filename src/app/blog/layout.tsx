import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '思想與見解 | OpenClaw',
  description:
    '撰寫關於機器學習、深度學習、資料科學與 MLOps 工程實踐——CycleGAN、SHAP 解釋性、pandas 效能優化等主題。',
  openGraph: {
    title: '思想與見解 | OpenClaw',
    description:
      '撰寫關於機器學習、深度學習、資料科學與 MLOps 工程實踐。',
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
