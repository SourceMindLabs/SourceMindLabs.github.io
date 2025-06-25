import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import { Footer } from "@/components/footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SourceMindLabs | Neuroscience-Inspired AI Research",
    template: "%s | SourceMindLabs"
  },
  description: "A research lab studying how the brain works to build better AI systems. We combine neuroscience insights with machine learning to create more efficient artificial intelligence.",
  keywords: ["neuroscience", "artificial intelligence", "AI research", "brain-inspired AI", "machine learning", "neural networks", "computational neuroscience"],
  authors: [{ name: "SourceMindLabs" }],
  creator: "SourceMindLabs",
  publisher: "SourceMindLabs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sourcemindlabs.github.io",
    siteName: "SourceMindLabs",
    title: "SourceMindLabs | Neuroscience-Inspired AI Research",
    description: "A research lab studying how the brain works to build better AI systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SourceMindLabs - Neuroscience-Inspired AI Research",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SourceMindLabs | Neuroscience-Inspired AI Research",
    description: "A research lab studying how the brain works to build better AI systems.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "your-google-verification-code",
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
        <meta name="theme-color" content="#8b7355" />
      </head>
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>

        {/* Web Vitals Monitoring */}
        <Script id="web-vitals" strategy="afterInteractive">
          {`
            function sendToAnalytics(metric) {
              // Send to your analytics service
              console.log('Web Vital:', metric);
            }
            
            // Monitor Core Web Vitals
            if (typeof window !== 'undefined') {
              import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(sendToAnalytics);
                getFID(sendToAnalytics);
                getFCP(sendToAnalytics);
                getLCP(sendToAnalytics);
                getTTFB(sendToAnalytics);
              });
            }
          `}
        </Script>

        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
