import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free QR Code Generator | URLs, Text, WiFi | KagazKit',
  description: 'Generate high-quality QR codes for websites, text, phone numbers, or WiFi networks instantly. Download as HD PNG images for print or digital use.',
  keywords: 'qr code generator, create qr code free, wifi qr code maker, url to qr code',
  alternates: {
    canonical: '/tools/qr-code-generator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
