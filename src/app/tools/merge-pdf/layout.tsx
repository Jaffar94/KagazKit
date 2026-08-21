import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Merge PDF Files Online | Secure & Private | KagazKit',
  description: 'Combine multiple PDF files into a single document instantly in your browser. Reorder pages with drag-and-drop. 100% secure client-side merging.',
  keywords: 'merge pdf, combine pdf files, join pdfs online, secure pdf merger',
  alternates: {
    canonical: '/tools/merge-pdf',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
