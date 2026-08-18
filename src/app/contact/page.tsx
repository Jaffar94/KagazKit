import { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';
import { MessageSquare } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | KagazKit',
  description: 'Get in touch with the KagazKit team for support, feedback, or inquiries.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Have a question, feedback, or a feature request? We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you as soon as possible.
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Contact Information */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center md:text-left">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Feedback & Support</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              We are constantly improving KagazKit. Let us know if you find any bugs or have suggestions for new tools.
            </p>
          </div>

          <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 text-center md:text-left">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Response Time</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We typically reply within 24-48 hours during regular business days. Your privacy is important to us, and your email will never be shared.
            </p>
          </div>
        </div>

        <ContactForm />
      </div>

      <AdSlot format="horizontal" slotId="contact-ad-1" className="mb-12" />
    </div>
  );
}
