import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Percentage Calculator Online | Free Math Tool',
  description: 'Easily calculate percentages. Find what X% of Y is, calculate percentage increase/decrease, or find what percent X is of Y.',
  keywords: ['percentage calculator', 'calculate percentage', 'percent increase calculator', 'percent decrease calculator', 'marks percentage'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
