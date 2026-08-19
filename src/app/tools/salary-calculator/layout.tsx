import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/tools/salary-calculator',
  },
  title: 'In-Hand Salary Calculator India | Take Home Pay',
  description: 'Calculate your exact monthly in-hand salary based on your CTC. 100% free, client-side calculator for Indian employees.',
  keywords: ['salary calculator india', 'in hand salary calculator', 'take home pay', 'CTC to in hand', 'PF deduction calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
