import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/tools/loan-prepayment',
  },
  title: 'Loan Prepayment Calculator',
  description: 'Calculate how much interest you save by prepaying your loan early.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
