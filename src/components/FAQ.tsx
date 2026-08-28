'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItem[];
};

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Generate JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="mt-16 max-w-3xl mx-auto w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      
      <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden">
            <button
              className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-slate-50 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-slate-800 pr-4">{item.question}</span>
              <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
            </button>
            
            {/* Always render answer in DOM for SEO crawlability — use CSS to hide/show */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-4 pt-1 text-slate-600">
                <p className="leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
