import { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'About | KagazKit',
  description: 'Learn about KagazKit, the fast, private, and 100% client-side Indian web tools portal.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 w-full prose prose-slate">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">About KagazKit</h1>
      <p>
        KagazKit is a suite of ultra-clean, minimalist web utilities built specifically for the needs of Indian users. 
        Whether you are preparing a photo for a UPSC application, comparing the new and old income tax regimes, or calculating your EPF retirement corpus, we aim to provide instant answers with zero friction.
      </p>
      
      <AdSlot format="horizontal" slotId="about-ad-1" className="not-prose my-8" />

      <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">100% Client-Side Privacy</h2>
      <p>
        We believe that your personal data and financial information should stay on your device. That&apos;s why every tool on KagazKit operates 100% client-side in your browser.
      </p>
      <ul className="list-disc pl-6 space-y-2 mt-4">
        <li><strong>No File Uploads:</strong> When you use the Photo Resizer, the image never leaves your computer.</li>
        <li><strong>No Databases:</strong> Your tax calculation inputs and SIP amounts are never saved or sent to any server.</li>
        <li><strong>Instant Results:</strong> Because everything happens locally, tools operate at lightning speed.</li>
      </ul>
    </div>
  );
}
