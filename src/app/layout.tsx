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
  title: "OpenClaw | 資料科學家 & ML 工程師",
  description:
    "以機器學習與深度學習解決真實業務問題——客戶流失預測、NLP 情感分析、GAN 圖像生成、MLOps Pipeline。資料驅動，結果可解釋，目前承接自由接案專案。",
  keywords: [
    "資料科學家",
    "機器學習工程師",
    "深度學習",
    "NLP",
    "PyTorch",
    "scikit-learn",
    "MLOps",
    "data scientist",
    "machine learning engineer",
    "自由接案",
  ],
  openGraph: {
    title: "OpenClaw | 資料科學家 & ML 工程師",
    description:
      "以機器學習與深度學習解決真實業務問題。資料驅動，結果可解釋。",
    type: "website",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw | 資料科學家 & ML 工程師",
    description:
      "以機器學習與深度學習解決真實業務問題。資料驅動，結果可解釋。",
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
