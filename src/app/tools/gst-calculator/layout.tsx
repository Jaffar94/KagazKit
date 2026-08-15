import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free GST Calculator India | Add/Remove GST (5%, 12%, 18%, 28%)',
  description: 'Instantly calculate GST for your business invoices. Add or remove GST from any amount using the official Indian tax slabs.',
  keywords: ['gst calculator india', 'add gst', 'remove gst', 'reverse gst calculation', 'cgst sgst calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
