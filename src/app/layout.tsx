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
  title: "KagazKit | Free Indian Web Tools & Calculators",
  description: "Free online calculators for India. 100% Client-Side tools including UPSC photo resizer, Income Tax Calculator, EPF Calculator, and SIP Calculator.",
  keywords: ["UPSC photo resizer", "Income tax calculator India", "EPF calculator India", "SIP calculator India", "Free Indian web tools"],
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
