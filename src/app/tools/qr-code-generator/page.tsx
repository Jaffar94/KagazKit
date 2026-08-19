'use client';

import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { Download, QrCode } from 'lucide-react';

export default function QrCodeGeneratorPage() {
  const [text, setText] = useState('https://kagazkit.com');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#0f172a'); // slate-900
  const [bgColor, setBgColor] = useState('#ffffff');

  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'KagazKit_QRCode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="w-full max-w-5xl">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">QR Code Generator</h1>
        <p className="text-slate-500">Instantly create high-quality QR codes for URLs, text, and contact information.</p>
      </div>

      

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 mb-12 shadow-xs">
        <div className="flex flex-col gap-8">
          
          {/* Controls */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">URL or Text Content</label>
              <textarea
                className="w-full border border-slate-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden transition-all resize-none h-32 text-slate-700"
                placeholder="Enter URL (e.g., https://example.com) or text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">QR Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-10 h-10 rounded-sm cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <span className="text-sm text-slate-500 uppercase">{fgColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Background</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded-sm cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <span className="text-sm text-slate-500 uppercase">{bgColor}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Size: {size}px</label>
              <input
                type="range"
                min="128"
                max="512"
                step="32"
                value={size}
                onChange={(e) => setSize(Number(e.target.value) || 0)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          {/* Preview & Download */}
          <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="mb-6 bg-white p-4 rounded-xl shadow-xs" ref={qrRef}>
              <QRCodeCanvas
                value={text || 'https://kagazkit.com'}
                size={size}
                bgColor={bgColor}
                fgColor={fgColor}
                level="H"
                includeMargin={true}
              />
            </div>
            
            <button
              onClick={downloadQR}
              disabled={!text}
              className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xs"
            >
              <Download className="w-5 h-5" />
              Download PNG
            </button>
            <p className="text-xs text-slate-400 mt-3 text-center">
              100% Client-side. No data is sent to servers.
            </p>
          </div>

        </div>
      </div>

      
      {/* SEO Content Block */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Customizing Your QR Codes</h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          QR codes are the ultimate bridge between the physical and digital worlds. Our QR Code Generator allows you to instantly encode URLs, contact information, or raw text into a scannable graphic. With customization options for sizing and error-correction levels, you can generate high-quality, print-ready QR codes in milliseconds. All generation happens locally within your browser, ensuring maximum privacy and zero latency.
        </p>
      </div>
  
      <AdSlot format="horizontal" slotId="qr-bottom-ad" className="mb-12" />

      <FAQ 
        items={[
          {
            question: "Is this QR code generator completely free?",
            answer: "Yes, it is 100% free with no limits. We do not track how many codes you generate, and there are no watermarks."
          },
          {
            question: "Do the QR codes expire?",
            answer: "No, they never expire! They are static QR codes containing the direct text or URL. Since the data is encoded directly into the image, it will work forever."
          },
          {
            question: "Is my data sent to a server to generate the code?",
            answer: "No. For your privacy, the QR code is generated entirely inside your web browser. Nothing you type is ever uploaded or saved to our servers."
          }
        ]}
      />
    </div>
  );
}
