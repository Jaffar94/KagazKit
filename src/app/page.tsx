import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import AdSlot from '@/components/AdSlot';
import { TOOLS_CATEGORIES } from '@/lib/toolsData';

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

      <AdSlot format="horizontal" slotId="home-top-ad" />

      <div className="mt-8 space-y-12">
        {TOOLS_CATEGORIES.map((category) => (
          <div key={category.categoryName}>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-200">
              {category.categoryName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.tools.map((tool) => (
                <Link 
                  key={tool.id} 
                  href={tool.href}
                  className="group block bg-white border border-slate-200/80 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-100 transition-all duration-300 relative overflow-hidden"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tool.color}`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    {tool.description}
                  </p>
                  <div className="flex items-center text-indigo-600 text-sm font-semibold">
                    <span>Open Tool</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
