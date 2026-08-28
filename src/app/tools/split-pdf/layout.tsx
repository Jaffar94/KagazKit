import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Split & Extract PDF Pages | Secure Online Tool | KagazKit',
  description: 'Extract specific pages or split a large PDF document into smaller files. Visual preview lets you select exactly what pages to keep. privacy-first.',
  keywords: 'split pdf, extract pdf pages, cut pdf, separate pdf pages online',
  alternates: {
    canonical: '/tools/split-pdf',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
