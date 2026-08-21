import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Receipt & Invoice Scanner | Extract Data to Excel | KagazKit',
  description: 'Upload any receipt or invoice. Our client-side Vision AI instantly extracts the merchant name, total amount, taxes, and line items. Export to CSV/Excel.',
  keywords: 'ai receipt scanner, invoice extractor, extract text from receipt, ocr receipt online, export receipt to excel',
  alternates: {
    canonical: '/tools/ai-receipt-scanner',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
