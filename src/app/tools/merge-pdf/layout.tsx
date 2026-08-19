import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/tools/merge-pdf',
  },
  title: 'Merge PDF Online Free | Combine Multiple PDF Files',
  description: 'Combine multiple PDF files into one easily and securely. 100% private, client-side PDF merger. Your files never leave your browser.',
  keywords: ['merge pdf', 'combine pdf', 'join pdf', 'pdf merger online', 'merge pdf free'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
