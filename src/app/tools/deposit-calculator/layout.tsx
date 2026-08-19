import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/tools/deposit-calculator',
  },
  title: 'FD & RD Calculator India | Fixed Deposit Returns Calculator',
  description: 'Calculate maturity amounts and interest earned for Indian Fixed Deposits (FD) and Recurring Deposits (RD) with our 100% free client-side calculator.',
  keywords: ['fd calculator', 'rd calculator', 'fixed deposit calculator india', 'recurring deposit calculator', 'interest calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
