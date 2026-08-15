import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackToHome() {
  return (
    <div className="mb-6 flex justify-start">
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors bg-slate-50 hover:bg-indigo-50 px-4 py-2 rounded-lg border border-slate-200"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tools
      </Link>
    </div>
  );
}
