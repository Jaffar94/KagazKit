import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image to PDF Converter | Compress to Target KB/MB | KagazKit',
  description: 'Convert JPG, PNG, or WebP images to a single PDF document. Compress the final PDF to an exact target file size (e.g. under 1MB) entirely in your browser.',
  keywords: 'image to pdf, convert jpg to pdf, compress pdf to target size, client side pdf converter',
  alternates: {
    canonical: '/tools/image-to-pdf',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
