import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/Providers";
import { Navigation } from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenClaw | 全端暨 AI 架構師",
  description:
    "打造以 AI 為核心的解決方案，解決以往無法突破的高價值問題。全端工程師、Kubernetes 專家，以及 LLM 整合專家，目前承接自由接案專案。",
  keywords: [
    "全端工程師",
    "AI 架構師",
    "Kubernetes",
    "Next.js",
    "TypeScript",
    "自由接案工程師",
    "LLM 整合",
    "full-stack developer",
    "AI architect",
  ],
  openGraph: {
    title: "OpenClaw | 全端暨 AI 架構師",
    description:
      "打造以 AI 為核心的解決方案，解決以往無法突破的高價值問題。",
    type: "website",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw | 全端暨 AI 架構師",
    description:
      "打造以 AI 為核心的解決方案，解決以往無法突破的高價值問題。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navigation />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
