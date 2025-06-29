import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const lora = Lora({ subsets: ["latin"], weight: ['400', '500', '600', '700'], variable: '--font-lora' });

export const metadata: Metadata = {
  title: {
    default: "SourceMindLabs | Revolutionary Neural Architecture",
    template: "%s | SourceMindLabs"
  },
  description: "Revolutionary research in neural architecture where biological intelligence meets computational engineering.",
  keywords: [
    "neural architecture", 
    "biological intelligence", 
    "computational engineering", 
    "living systems", 
    "architectural AI", 
    "spatial algorithms", 
    "structural intelligence",
    "revolutionary research"
  ],
  authors: [{ name: "SourceMindLabs" }],
  creator: "SourceMindLabs",
  publisher: "SourceMindLabs",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sourcemindlabs.github.io",
    siteName: "SourceMindLabs",
    title: "SourceMindLabs | Revolutionary Neural Architecture Research",
    description: "Revolutionary research in neural architecture where biological intelligence meets computational engineering through living systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SourceMindLabs - Revolutionary Neural Architecture Research",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SourceMindLabs | Revolutionary Neural Architecture Research",
    description: "Revolutionary research in neural architecture where biological intelligence meets computational engineering through living systems.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://sourcemindlabs.github.io"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${inter.variable} ${lora.variable} font-sans bg-white text-slate-900 antialiased`}>
        <SmoothScroll>
          <Navigation />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
