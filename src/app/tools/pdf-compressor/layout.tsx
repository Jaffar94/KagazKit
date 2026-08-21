import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compress PDF Files Online | Reduce File Size | KagazKit',
  description: 'Dramatically reduce the file size of your PDF documents while maintaining pristine readable quality. Processed on secure ephemeral servers.',
  keywords: 'compress pdf, reduce pdf size, optimize pdf, shrink pdf online',
  alternates: {
    canonical: '/tools/pdf-compressor',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
