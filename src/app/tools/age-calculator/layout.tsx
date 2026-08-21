import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exact Age Calculator in Years, Months, and Days | KagazKit',
  description: 'Calculate your exact chronological age or the time between two dates in years, months, days, and weeks. 100% private, client-side age calculator.',
  keywords: 'age calculator, chronological age calculator, age difference, exact age in days',
  alternates: {
    canonical: '/tools/age-calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
