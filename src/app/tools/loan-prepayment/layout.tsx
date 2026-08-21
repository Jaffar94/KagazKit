import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loan Prepayment Calculator | Save Interest & Tenure | KagazKit',
  description: 'Calculate how much interest and tenure you can save by making part-payments or increasing your monthly EMI on your home or car loan.',
  keywords: 'loan prepayment calculator, part payment calculator, save home loan interest, reduce loan tenure',
  alternates: {
    canonical: '/tools/loan-prepayment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
