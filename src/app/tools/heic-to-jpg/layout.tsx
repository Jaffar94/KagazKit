import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/tools/heic-to-jpg',
  },
  title: 'HEIC to JPG Converter',
  description: 'Convert Apple HEIC images to standard JPG format entirely in your browser.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
