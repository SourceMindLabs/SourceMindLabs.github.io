import type { Metadata } from "next";
import "./globals.css";

import Navigation from "@/components/navigation";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "AxionLab - AI Research Laboratory",
  description: "Advancing AI through neural innovation with cutting-edge research and elegant solutions",
  keywords: ["AI", "Machine Learning", "Neuroscience", "Research", "Large Language Models"],
  authors: [{ name: "AxionLab" }],
  creator: "AxionLab",
  publisher: "AxionLab",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://axionlab.ai",
    title: "AxionLab - AI Research Laboratory",
    description: "We implement cutting-edge research papers into practical code and develop novel Large Language Models inspired by neuroscience principles.",
    siteName: "AxionLab",
  },
  twitter: {
    card: "summary_large_image",
    title: "AxionLab - AI Research Laboratory",
    description: "We implement cutting-edge research papers into practical code and develop novel Large Language Models inspired by neuroscience principles.",
    creator: "@axionlab",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-body antialiased bg-[#faf8f5]">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
