import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { MotionConfig } from "motion/react";
import PageLoader from "./components/PageLoader";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://ns-vtc.rw";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NS-VTC | Newton Safety & Vocational Training Center",
    template: "%s | NS-VTC",
  },
  description:
    "Newton Safety and Vocational Training Center (NS-VTC) offers practical TVET, HSE and corporate training programs in Rilima Sector, Bugesera District, Rwanda.",
  keywords: [
    "vocational training Rwanda",
    "TVET Rwanda",
    "HSE training Rwanda",
    "Bugesera training center",
    "NS-VTC",
    "Newton Safety Vocational Training",
    "scaffolding training Rwanda",
    "welding training Rwanda",
  ],
  authors: [{ name: "NS-VTC" }],
  openGraph: {
    type: "website",
    locale: "en_RW",
    url: siteUrl,
    siteName: "NS-VTC",
    title: "NS-VTC | Newton Safety & Vocational Training Center",
    description:
      "Practical TVET, HSE and corporate training programs in Bugesera District, Rwanda.",
    images: [{ url: "/assets/hero.png", width: 1200, height: 630, alt: "NS-VTC Training Center" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NS-VTC | Newton Safety & Vocational Training Center",
    description: "Practical TVET, HSE and corporate training programs in Bugesera District, Rwanda.",
    images: ["/assets/hero.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/assets/logo.png", type: "image/png" },
    ],
    apple: "/assets/logo.png",
    shortcut: "/assets/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <MotionConfig reducedMotion="user">
          <PageLoader />
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
