import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FD & RD Deposit Calculator | Fixed Returns & Interest | KagazKit',
  description: 'Calculate maturity amounts and interest earned for Fixed Deposits (FD) and Recurring Deposits (RD) in India. Accurate quarterly compounding.',
  keywords: 'FD calculator, fixed deposit calculator, RD calculator, recurring deposit returns, compound interest',
  alternates: {
    canonical: '/tools/deposit-calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
