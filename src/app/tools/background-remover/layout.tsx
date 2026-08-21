import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Background Remover | HD Transparent PNGs | KagazKit',
  description: 'Remove image backgrounds instantly in your browser. Our local AI runs on your device for 100% privacy and zero server uploads. Download HD transparent PNGs.',
  keywords: 'remove background free, AI background remover, transparent background maker, remove bg HD',
  alternates: {
    canonical: '/tools/background-remover',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
