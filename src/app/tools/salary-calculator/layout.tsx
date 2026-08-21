import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'In-Hand Salary Calculator | India Take-Home Pay | KagazKit',
  description: 'Calculate your exact in-hand, take-home salary in India. Instantly break down your CTC into Basic, HRA, PF deductions, and income tax.',
  keywords: 'salary calculator india, in hand salary calculator, take home pay, CTC breakdown, PF deduction calculator',
  alternates: {
    canonical: '/tools/salary-calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
