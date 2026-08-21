import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EMI Calculator | Home, Car & Personal Loan Monthly EMI | KagazKit',
  description: 'Calculate your exact monthly EMI, total interest, and total payment for home loans, car loans, or personal loans. View detailed amortization schedules.',
  keywords: 'EMI calculator, home loan EMI, car loan EMI, personal loan EMI, amortization schedule',
  alternates: {
    canonical: '/tools/emi-calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
