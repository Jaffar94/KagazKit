"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Heart, X, Copy, CheckCircle2 } from "lucide-react";

export default function SupportDeveloper() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  const upiId = "jaffarabs4@oksbi";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const modalContent = isOpen ? (
    <div
      className="fixed inset-0 z-[100] px-4 py-12 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200 flex items-center justify-center"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-[360px] mx-auto relative animate-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Background */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-24 absolute top-0 left-0 w-full"></div>

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors z-50"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 pt-16 flex flex-col items-center text-center relative z-10">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg border-4 border-white">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 mb-2">Buy Me a Coffee ☕</h3>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Hi! I&apos;m Mirza Jaffar Abbas. If KagazKit saved you time today, consider supporting the project to keep it fast, ad-light, and 100% free!
          </p>

          {/* QR Code Container */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 mb-4 w-full flex justify-center items-center shadow-inner">
            <div className="bg-white rounded-xl shadow-sm p-2 flex justify-center items-center relative group">
              <Image
                src="/upi-qr.jpg"
                alt="UPI QR Code"
                width={180}
                height={180}
                className="rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider mb-4">
            Scan with any UPI App
          </div>

          {/* Copy UPI ID Section (Crucial for mobile users) */}
          <div className="w-full bg-slate-50 rounded-xl border border-slate-200 p-1 flex items-center">
            <div className="flex-1 text-sm font-medium text-slate-600 truncate px-3">
              {upiId}
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all ${copied
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                }`}
            >
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-600 rounded-full font-bold text-sm hover:from-rose-100 hover:to-pink-100 transition-all duration-300 border border-rose-100 shadow-sm hover:shadow"
      >
        <Heart className="w-4 h-4 group-hover:scale-110 group-hover:fill-rose-600 transition-all duration-300" />
        <span>Support Developer</span>
      </button>

      {mounted && typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null}
    </>
  );
}
