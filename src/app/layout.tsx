import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import SidebarAd from "@/components/SidebarAd";
import MobileAnchorAd from "@/components/MobileAnchorAd";
import { Toaster } from "react-hot-toast";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kagazkit.site'),
  title: "KagazKit | Free Web Tools & Calculators",
  description: "Free online web tools and calculators. 100% Client-Side tools including photo resizer, PDF compressor, tax calculator, and SIP calculator.",
  keywords: ["photo resizer", "pdf compressor", "tax calculator", "sip calculator", "free web tools", "online calculators"],
  other: {
    "google-adsense-account": "ca-pub-5764631499636026"
  }
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
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5764631499636026"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col pb-20 lg:pb-0 relative overflow-x-hidden">
        <Header />
        
        <div className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:gap-8 xl:gap-12 pt-8 pb-12 px-4 sm:px-6 lg:px-8 justify-center">
          {/* Left Ad Sidebar (Visible on 1024px+ screens) */}
          <aside className="hidden lg:block lg:w-[160px] xl:w-[300px] shrink-0 h-full">
            <SidebarAd />
          </aside>

          <main className="flex-1 w-full max-w-4xl flex flex-col">
            {children}
          </main>
          
          {/* Right Ad Sidebar (Visible on 1024px+ screens) */}
          <aside className="hidden lg:block lg:w-[160px] xl:w-[300px] shrink-0 h-full">
            <SidebarAd />
          </aside>
        </div>

        <Footer />
        <MobileAnchorAd />
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
