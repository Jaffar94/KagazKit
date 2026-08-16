import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import AdSlot from '@/components/AdSlot';
import ToolsList from '@/components/ToolsList';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      <div className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Simple, Instant <span className="text-indigo-600">Web Tools & Calculators</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          No signups. No server uploads. 100% private, client-side tools designed for everyday tasks and personal finance.
        </p>
      </div>

      <AdSlot format="horizontal" slotId="home-top-ad" className="mb-12" />

      <ToolsList />
    </div>
  );
}
