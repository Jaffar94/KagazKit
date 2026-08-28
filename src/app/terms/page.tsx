import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | KagazKit',
  description: 'Terms of Service for KagazKit web utilities.',
  alternates: {
    canonical: '/terms',
  },
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

      <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">3. Third-Party AI Services</h2>
      <p>
        Certain tools on this website (such as the AI Receipt Scanner) utilize third-party Artificial Intelligence APIs (like Google Gemini) to process images and extract text. By using these specific tools, you acknowledge that your uploaded images are transmitted securely to these third-party processors for the sole purpose of fulfilling your request. AI-generated extraction results are experimental and may contain errors; always verify the extracted financial data before use.
      </p>

      <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">4. Prohibited Uses</h2>
      <p>
        You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of KagazKit. You must not use our tools to process illegal, harmful, or illicit content.
      </p>

      <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">5. Intellectual Property</h2>
      <p>
        Unless otherwise stated, KagazKit and/or its licensors own the intellectual property rights for all material on KagazKit (excluding any files or images uploaded by users for processing). All intellectual property rights are reserved. You may access this from KagazKit for your own personal use subjected to restrictions set in these terms and conditions.
      </p>

      <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">6. Limitation of Liability</h2>
      <p>
        In no event shall KagazKit, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. KagazKit, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website or the tools provided herein.
      </p>
      <p className="mt-4">
        We do not guarantee that the tools will meet your specific requirements, or that they will be uninterrupted, timely, secure, or error-free. The responsibility for verifying the final output of any tool before submission to official or government portals lies entirely with the user.
      </p>

      <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">7. Governing Law</h2>
      <p>
        These Terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.
      </p>

      <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">8. Changes to Terms</h2>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Website after those revisions become effective, you agree to be bound by the revised terms.
      </p>
    </div>
  );
}
