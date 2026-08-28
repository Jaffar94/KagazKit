import { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';
import { ShieldCheck, Zap, Globe, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | KagazKit',
  description: 'Learn about KagazKit, the fast, private, and 100% client-side web tools portal.',
  alternates: {
    canonical: '/about',
  },
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
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Privacy-First</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Most tools process files entirely on your device. For those that require a server, files are instantly deleted. We collect zero data.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Lightning Fast</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            By minimizing server uploads, our tools execute instantly. Get your results in milliseconds, not minutes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Global & Local</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            While designed for global utility, we also offer specialized tools tailored to local needs, like Indian tax and EPF calculators.
          </p>
        </div>
      </div>

      {/* Detailed Mission Section */}
      <div className="prose prose-slate max-w-none mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          At KagazKit, our mission is simple: provide powerful, everyday web utilities that respect your privacy and don't waste your time. We believe that basic digital tasks — like compressing a PDF for a government portal, resizing a passport photo to exact specifications, or calculating an EMI — shouldn't require you to download bulky software or surrender your personal data to remote servers.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          Many popular utility websites operate on a flawed model: they ask you to upload your sensitive documents (like PAN cards, Aadhaar cards, or bank statements) to their cloud servers, process them remotely, and then let you download the result. This approach introduces significant privacy risks, unnecessary delays, and potential data breaches. We fundamentally reject this model.
        </p>
        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">The KagazKit Technology Difference</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          We leverage the full power of modern web browsers to bring desktop-class performance directly to your device. By utilizing advanced technologies like WebAssembly (Wasm), HTML5 Canvas, and client-side JavaScript, KagazKit executes complex operations entirely within your browser's local memory.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          When you use our Photo Resizer, the image manipulation happens right on your computer. When you use our Background Remover, a highly optimized, lightweight Neural Network (AI model) is downloaded to your browser to perform inference locally. For the select few tools that require backend processing (such as the AI Receipt Scanner or advanced Ghostscript PDF compression), files are securely transmitted, processed purely in-memory, and instantly deleted from the server the second the operation finishes. This hybrid architecture ensures absolute data privacy, instantaneous processing speeds, and maximum security for your sensitive documents.
        </p>
      </div>

      {/* Creator Section */}
      <div className="bg-indigo-50/50 rounded-3xl border border-indigo-100 p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center justify-center md:justify-start gap-2">
            Built with <Heart className="w-6 h-6 text-rose-500 fill-rose-500" /> by Mirza Jaffar Abbas
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            KagazKit started as a passion project to build high-quality, free tools that respect user privacy. As a developer, I was frustrated by the lack of clean, fast, and secure utilities available for common tasks, particularly those required by Indian government portals (like specific photo KB limits).
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            The vision is to provide an exceptionally smooth, premium experience that feels like a native application, right inside your web browser. We continuously update our tools to ensure they meet the latest technical standards and compliance requirements.
          </p>
          <p className="text-slate-600 leading-relaxed">
            KagazKit is completely free to use. If you find these tools helpful, the best way to support the project is by sharing <strong>kagazkit.site</strong> with your friends, colleagues, and family members!
          </p>
        </div>
      </div>
    </div>
  );
}
