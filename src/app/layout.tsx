import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kagazkit.site'),
  title: "KagazKit | Free Web Tools & Calculators",
  description: "Free online web tools and calculators. 100% Client-Side tools including photo resizer, PDF compressor, tax calculator, and SIP calculator.",
  keywords: ["photo resizer", "pdf compressor", "tax calculator", "sip calculator", "free web tools", "online calculators"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col pt-8 pb-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
