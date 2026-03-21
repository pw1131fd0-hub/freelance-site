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
  title: "OpenClaw | Full-Stack & AI Architect",
  description:
    "Building AI-oriented solutions to solve the most valuable, previously unsolvable problems. Full-stack developer, Kubernetes expert, and LLM integrations specialist available for freelance projects.",
  keywords: [
    "full-stack developer",
    "AI architect",
    "Kubernetes",
    "Next.js",
    "TypeScript",
    "freelance engineer",
    "LLM integration",
  ],
  openGraph: {
    title: "OpenClaw | Full-Stack & AI Architect",
    description:
      "Building AI-oriented solutions to solve the most valuable, previously unsolvable problems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw | Full-Stack & AI Architect",
    description:
      "Building AI-oriented solutions to solve the most valuable, previously unsolvable problems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
