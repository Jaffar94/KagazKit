import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mutual Fund SIP Calculator | Investment Returns | KagazKit',
  description: 'Calculate the future value, wealth gained, and total investment of your Systematic Investment Plan (SIP) in mutual funds with compound interest.',
  keywords: 'SIP calculator, mutual fund returns, systematic investment plan, wealth calculator, compound interest',
  alternates: {
    canonical: '/tools/sip-calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
