import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/tools/salary-calculator',
  },
  title: 'In-Hand Salary Calculator India with Income Tax & TDS | Take Home Pay',
  description: 'Calculate your exact monthly in-hand salary based on your CTC. Includes New vs Old tax regime deductions, PF, and Professional Tax. 100% free, client-side calculator for Indian employees.',
  keywords: ['salary calculator india', 'in hand salary calculator', 'take home pay', 'CTC to in hand', 'PF deduction calculator', 'income tax calculator', 'TDS salary calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
