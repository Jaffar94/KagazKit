import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Split PDF Online Free | Extract Pages from PDF',
  description: 'Easily extract specific pages from your PDF or split a large PDF into smaller ones. 100% private, client-side processing.',
  keywords: ['split pdf', 'extract pdf pages', 'separate pdf pages', 'cut pdf', 'pdf splitter online free'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
