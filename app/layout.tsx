import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const baseUrl = productionHost ? `https://${productionHost}` : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Swapnil Tungare | Finance & Analytics Portfolio",
    template: "%s | Swapnil Tungare",
  },
  description: "Finance, markets, valuation, analytics, research, and strategy portfolio of Swapnil Tungare.",
  keywords: [
    "Swapnil Tungare",
    "Financial Analyst",
    "Finance",
    "Business Analytics",
    "Capital Markets",
    "Financial Modeling",
    "Valuation",
    "Risk",
    "Bloomberg",
    "Excel",
  ],
  authors: [{ name: "Swapnil Tungare" }],
  creator: "Swapnil Tungare",
  openGraph: {
    title: "Swapnil Tungare | Finance & Analytics Portfolio",
    description: "Finance, markets and analytics — connected through rigorous execution.",
    type: "website",
    images: [{ url: "/profile/headshot.png", width: 900, height: 900, alt: "Swapnil Tungare" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
