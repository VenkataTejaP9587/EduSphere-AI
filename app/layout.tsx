import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "EduSphere AI — Intelligent Learning Management Platform",
  description:
    "AI-powered LMS combining course management, adaptive learning, student analytics, and community collaboration into one unified platform.",
  keywords: ["LMS", "EdTech", "AI Learning", "Online Education", "Course Management"],
  openGraph: {
    title: "EduSphere AI",
    description: "The future of intelligent learning management",
    type: "website",
  },
};

import { AuthProvider } from "@/lib/auth-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
