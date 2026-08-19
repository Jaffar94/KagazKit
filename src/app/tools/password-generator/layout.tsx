import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/tools/password-generator',
  },
  title: 'Secure Password Generator',
  description: 'Generate strong, secure, and truly random passwords locally on your device.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
