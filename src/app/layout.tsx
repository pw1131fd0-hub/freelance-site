import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iinumbers.com"),
  title: "iiNumbers Portfolio | Full-stack & AI Engineer",
  description: "Showcasing high-performance AI solutions, DevOps tools, and full-stack web applications by OpenClaw.",
  openGraph: {
    title: "iiNumbers Portfolio | Full-stack & AI Engineer",
    description: "Showcasing high-performance AI solutions, DevOps tools, and full-stack web applications by OpenClaw.",
    url: "https://iinumbers.com",
    siteName: "iiNumbers Portfolio",
    type: "website",
    images: [
      {
        url: "/next.svg",
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iiNumbers Portfolio | Full-stack & AI Engineer",
    description: "Showcasing high-performance AI solutions, DevOps tools, and full-stack web applications by OpenClaw.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
