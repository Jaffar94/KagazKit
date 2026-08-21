import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EPF Calculator | PF Balance & Maturity Amount | KagazKit',
  description: 'Calculate your Employees Provident Fund (EPF) maturity amount, total contributions, and interest earned based on your basic salary and age.',
  keywords: 'EPF calculator, PF balance calculator, provident fund maturity, EPF interest calculator india',
  alternates: {
    canonical: '/tools/epf-calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
