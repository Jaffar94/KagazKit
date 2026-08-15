"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function SupportDeveloper() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modalContent = isOpen ? (
    <div 
      className="fixed inset-0 z-[100] px-4 py-12 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200 block"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[340px] mx-auto relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors z-10"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="p-6 pt-10 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl">🙏</span>
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 mb-2">Support Mirza Jaffar</h3>
          <p className="text-slate-500 text-sm mb-6">
            Hi! I&apos;m Mirza Jaffar Abbas. If you found this tool useful, consider supporting me! Your contribution helps keep the servers running and the tools free.
          </p>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 w-full flex justify-center items-center">
            <div style={{ width: '192px', height: '192px', position: 'relative' }} className="bg-white rounded-lg border border-slate-200 shadow-sm p-2 flex justify-center items-center">
              <Image 
                src="/upi-qr.jpg" 
                alt="UPI QR Code" 
                width={192}
                height={192}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 py-2 px-4 rounded-full">
            <span>Scan with any UPI App</span>
            <span className="flex gap-1 items-center">
              <span className="w-3 h-3 rounded-full bg-[#EA4335] inline-block opacity-80"></span>
              <span className="w-3 h-3 rounded-full bg-[#00B9F1] inline-block opacity-80 -ml-1"></span>
              <span className="w-3 h-3 rounded-full bg-[#5E227F] inline-block opacity-80 -ml-1"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-full font-medium text-sm hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 border border-indigo-100/50 shadow-sm hover:shadow"
      >
        <span className="group-hover:scale-110 transition-transform duration-300">💖</span>
        <span>Support Developer</span>
      </button>

      {mounted && typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null}
    </>
  );
}
