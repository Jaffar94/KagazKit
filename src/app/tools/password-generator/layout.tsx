import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Random Password Generator | Cryptographically Strong | KagazKit',
  description: 'Generate ultra-secure, random passwords with custom length and character types. Processed completely in your browser for absolute security.',
  keywords: 'random password generator, strong password creator, secure password, offline password generator',
  alternates: {
    canonical: '/tools/password-generator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
