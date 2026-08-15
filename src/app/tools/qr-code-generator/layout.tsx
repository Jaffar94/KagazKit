import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free QR Code Generator Online | High Quality',
  description: 'Instantly generate free, high-quality QR codes for URLs, text, and Wi-Fi. 100% private, client-side generation. No signups required.',
  keywords: ['qr code generator', 'create qr code', 'free qr code', 'url to qr code', 'text to qr code'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
