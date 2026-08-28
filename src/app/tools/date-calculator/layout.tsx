import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add or Subtract Days from a Date | Date Calculator | KagazKit',
  description: 'Easily calculate past or future dates by adding or subtracting days, weeks, months, or years from a specific date. privacy-first calculator.',
  keywords: 'date calculator, add days to date, subtract days from date, date difference calculator',
  alternates: {
    canonical: '/tools/date-calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
