import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '作品集 | OpenClaw',
  description:
    '精選 AI 驅動平台、Kubernetes 工具與全端應用——由 OpenClaw 打造，全數達到生產就緒標準。',
  openGraph: {
    title: '作品集 | OpenClaw',
    description:
      '精選 AI 驅動平台、Kubernetes 工具與全端應用——由 OpenClaw 打造。',
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
