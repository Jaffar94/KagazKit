import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Income Tax Calculator India | Old vs New Regime | KagazKit',
  description: 'Compare the Old and New income tax regimes for the current financial year. Calculate exactly how much tax you owe and find out which regime saves you money.',
  keywords: 'income tax calculator india, old vs new tax regime, calculate income tax, tax saving calculator',
  alternates: {
    canonical: '/tools/tax-calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
