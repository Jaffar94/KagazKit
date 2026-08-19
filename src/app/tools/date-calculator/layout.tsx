import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/tools/date-calculator',
  },
  title: 'Days Between Two Dates Calculator | Exact Date Duration',
  description: 'Calculate the exact number of days, months, and years between two dates. Free online date difference calculator for planning and applications.',
  keywords: ['date calculator', 'days between dates', 'date difference calculator', 'how many days between two dates', 'duration calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
