import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Resizer for Govt Exams | Crop to exact Pixels/KB | KagazKit',
  description: 'Resize, crop, and compress your passport photo or signature to exact pixel dimensions (e.g. 3.5x4.5cm) and KB limits required for govt applications.',
  keywords: 'photo resizer, resize image for exam form, reduce photo size in kb, passport photo maker, signature resizer',
  alternates: {
    canonical: '/tools/photo-resizer',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
