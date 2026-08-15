import { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';
import { ShieldCheck, Zap, Globe, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | KagazKit',
  description: 'Learn about KagazKit, the fast, private, and 100% client-side web tools portal.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
          Empowering Your Everyday Tasks
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          KagazKit is a premium suite of ultra-clean, minimalist web utilities designed to solve common digital problems instantly. We built this platform because we were tired of slow, ad-heavy websites that forced you to upload private files to mystery servers.
        </p>
      </div>
      
      <AdSlot format="horizontal" slotId="about-ad-1" className="mb-12" />

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">100% Private</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Your files never leave your device. All PDF processing and photo resizing happens locally in your web browser. We collect zero data.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Lightning Fast</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            By eliminating server uploads, our tools execute instantly. Get your results in milliseconds, not minutes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Global & Local</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            While designed for global utility, we also offer specialized tools tailored to local needs, like Indian tax and EPF calculators.
          </p>
        </div>
      </div>

      {/* Creator Section */}
      <div className="bg-indigo-50/50 rounded-3xl border border-indigo-100 p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center justify-center md:justify-start gap-2">
            Built with <Heart className="w-6 h-6 text-rose-500 fill-rose-500" /> by Mirza Jaffar Abbas
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            KagazKit started as a passion project to build high-quality, free tools that respect user privacy. The vision is to provide an exceptionally smooth, premium experience that feels like a native app, right in your browser.
          </p>
          <p className="text-slate-600 leading-relaxed">
            If you find these tools helpful, the best way to support the project is by sharing kagazkit.site with your friends and colleagues!
          </p>
        </div>
      </div>
    </div>
  );
}
