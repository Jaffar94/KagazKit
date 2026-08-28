import Link from 'next/link';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import ToolsList from '@/components/ToolsList';
import StatsDisplay from '@/components/StatsDisplay';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};
export default function Home() {
  return (
    <div className="w-full">
      <div className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Simple, Instant <span className="text-indigo-600">Web Tools & Calculators</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          No signups. Privacy-first, mostly client-side tools designed for everyday tasks and personal finance.
        </p>
        <StatsDisplay />
      </div>

      <ToolsList />

      {/* SEO Content Section for Homepage */}
      <section className="mt-20 pt-16 border-t border-slate-200">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Choose KagazKit?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              In a world where digital privacy is increasingly compromised, we built KagazKit with a completely different philosophy. Most online utility websites require you to upload your sensitive personal documents, financial data, and private photographs to their remote servers for processing. This exposes you to data breaches, unauthorized tracking, and privacy violations.
              <br /><br />
              KagazKit fundamentally changes this model by leveraging advanced WebAssembly and modern browser capabilities. The vast majority of tools you use on this platform — whether it's resizing a passport photo for a government application or calculating your home loan EMI — run 100% locally on your device. For the few advanced tools that require server-side processing (like our AI Receipt Scanner or extreme PDF compression), your files are processed securely in-memory and are instantly deleted from our servers the moment the task is complete. We ensure absolute privacy, minimal wait times, and maximum security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">How Our Tools Work</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                We utilize cutting-edge client-side technologies to deliver desktop-class performance directly in your browser without any server-side dependencies.
              </p>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Client-Side Processing:</strong> Tools like our Photo Resizer and PDF tools use WebAssembly and HTML5 Canvas to manipulate files directly in your device's memory.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Local AI Models:</strong> Our AI Background Remover downloads a lightweight neural network directly to your browser, allowing you to run AI inferences locally without cloud APIs.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Offline Capability:</strong> Because our tools don't rely on server round-trips, many of them will continue to function perfectly even if you lose your internet connection after the page loads.
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Trusted by Thousands</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Every month, thousands of Indian citizens, professionals, and students rely on KagazKit to simplify their digital workflows. From UPSC aspirants resizing their signatures to the exact kilobyte requirement, to accountants quickly verifying GST calculations — our tools are designed to solve real-world frustrations quickly and privately.
              </p>
              <Link href="/blog" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700">
                Read our detailed guides and tutorials <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
