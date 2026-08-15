import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | KagazKit',
  description: 'Terms of Service for KagazKit web utilities.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 w-full prose prose-slate">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Terms of Service</h1>
      
      <p>Welcome to KagazKit!</p>
      <p>These terms and conditions outline the rules and regulations for the use of KagazKit&apos;s Website.</p>

      <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
      <p>
        By accessing this website we assume you accept these terms and conditions. Do not continue to use KagazKit if you do not agree to take all of the terms and conditions stated on this page.
      </p>

      <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">2. Tool Usage</h2>
      <p>
        All calculations and resizing results provided by KagazKit are for informational and convenience purposes. While we strive for accuracy, the results should be verified before being used for official government or financial submissions. We do not guarantee absolute accuracy.
      </p>

      <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">3. Prohibited Uses</h2>
      <p>
        You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of KagazKit.
      </p>
    </div>
  );
}
