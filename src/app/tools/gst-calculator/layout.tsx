import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GST Calculator | Add or Remove GST from Price | KagazKit',
  description: 'Instantly add or reverse calculate Goods and Services Tax (GST). Find the base price, CGST, SGST, and IGST components for any amount.',
  keywords: 'GST calculator, reverse GST, add GST to price, CGST SGST calculator, India tax calculator',
  alternates: {
    canonical: '/tools/gst-calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
