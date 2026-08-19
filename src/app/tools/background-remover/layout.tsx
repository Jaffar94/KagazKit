import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/tools/background-remover',
  },
  title: 'AI Background Remover',
  description: 'Remove image backgrounds instantly using client-side AI. 100% private.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
