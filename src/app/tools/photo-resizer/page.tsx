'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { UploadCloud, Image as ImageIcon, Download, Loader2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

type Preset = {
  id: string;
  name: string;
  width: number;
  height: number;
  minKb: number;
  maxKb: number;
};

const PRESETS: Preset[] = [
  { id: 'upsc-photo', name: 'UPSC / State PSC Photo', width: 350, height: 350, minKb: 20, maxKb: 50 },
  { id: 'ssc-photo', name: 'SSC CGL / CHSL Photo', width: 200, height: 230, minKb: 20, maxKb: 50 },
  { id: 'ibps-sig', name: 'IBPS / Bank PO Signature', width: 140, height: 60, minKb: 10, maxKb: 20 },
  { id: 'custom', name: 'Custom Size', width: 300, height: 300, minKb: 20, maxKb: 50 },
];

export default function PhotoResizerPage() {
  const [selectedPresetId, setSelectedPresetId] = useState(PRESETS[0].id);
  const [customWidth, setCustomWidth] = useState(300);
  const [customHeight, setCustomHeight] = useState(300);
  const [customMaxKb, setCustomMaxKb] = useState(50);
  
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultDataUrl, setResultDataUrl] = useState<string | null>(null);
  const [resultSizeKb, setResultSizeKb] = useState<number>(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const activePreset = PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0];
  const isCustom = activePreset.id === 'custom';

  const targetW = isCustom ? customWidth : activePreset.width;
  const targetH = isCustom ? customHeight : activePreset.height;
  const targetMaxKb = isCustom ? customMaxKb : activePreset.maxKb;
  const targetMinKb = isCustom ? (customMaxKb * 0.4) : activePreset.minKb; // Rough estimate for custom min

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      if (!selected.type.startsWith('image/')) {
        toast.error('Invalid file format. Please upload an image (JPG, PNG, WEBP).');
        return;
      }
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setResultDataUrl(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selected = e.dataTransfer.files[0];
      if (selected.type.startsWith('image/')) {
        setFile(selected);
        setPreviewUrl(URL.createObjectURL(selected));
        setResultDataUrl(null);
      } else {
        toast.error('Invalid file format. Please upload an image (JPG, PNG, WEBP).');
      }
    }
  };

  const compressImage = async () => {
    if (!previewUrl) return;
    setIsProcessing(true);

    try {
      const img = new window.Image();
      img.src = previewUrl;
      await new Promise((resolve, reject) => { 
        img.onload = resolve; 
        img.onerror = () => reject(new Error("Failed to load image into canvas"));
      });

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Canvas not supported");

      // Fill white background in case of transparent PNGs
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetW, targetH);
      ctx.drawImage(img, 0, 0, targetW, targetH);

      // Binary search for JPEG quality
      let minQ = 0.0;
      let maxQ = 1.0;
      let bestDataUrl = null;
      let bestSizeKb = 0;
      let attempt = 0;

      while (attempt < 15 && (maxQ - minQ) > 0.01) {
        attempt++;
        let midQ = (minQ + maxQ) / 2;
        let dataUrl = canvas.toDataURL('image/jpeg', midQ);
        // Estimate size in KB (Base64 is ~33% larger than binary)
        let sizeKb = (dataUrl.length * (3/4)) / 1024;

        if (sizeKb > targetMaxKb) {
          maxQ = midQ;
        } else if (sizeKb < targetMinKb) {
          minQ = midQ;
          bestDataUrl = dataUrl;
          bestSizeKb = sizeKb;
        } else {
          // Hits the sweet spot
          bestDataUrl = dataUrl;
          bestSizeKb = sizeKb;
          break;
        }
      }

      // Fallback if we couldn't hit the target but got something below max
      if (!bestDataUrl) {
        bestDataUrl = canvas.toDataURL('image/jpeg', minQ);
        bestSizeKb = (bestDataUrl.length * (3/4)) / 1024;
      }

      setResultDataUrl(bestDataUrl);
      setResultSizeKb(Number(bestSizeKb.toFixed(1)));
      toast.success('Image resized successfully!');

    } catch (err) {
      console.error(err);
      toast.error('Error processing image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!resultDataUrl) return;
    const link = document.createElement('a');
    link.href = resultDataUrl;
    link.download = `kagazkit_${targetW}x${targetH}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const faqs = [
    {
      question: "Will my photo be saved on your servers?",
      answer: "No. This tool runs 100% locally in your web browser. Your photo never leaves your device, ensuring complete privacy."
    },
    {
      question: "Why does the image quality change?",
      answer: "To fit strict government limits (like 20-50KB), the tool compresses the image by lowering its quality and resizing its dimensions. We use a binary search algorithm to find the best possible quality that still fits under the maximum KB limit."
    },
    {
      question: "What formats are supported?",
      answer: "You can upload JPG, PNG, or WebP. The final downloaded file will always be a standard JPG, as required by almost all government portals."
    }
  ];

  return (
    <div className="w-full max-w-5xl">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Free Online Photo & Signature Resizer</h1>
        <p className="text-slate-500">Resize image to 20KB-50KB for UPSC, SSC, IBPS with strict size limits. 100% private, client-side resizing.</p>
      </div>

      <AdSlot format="horizontal" slotId="photo-top-ad" className="mb-8" />

      <div className="flex flex-col gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Select Preset Format</label>
            <div className="space-y-2">
              {PRESETS.map((p) => (
                <label key={p.id} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${selectedPresetId === p.id ? 'bg-indigo-50 border-indigo-200' : 'hover:bg-slate-50'}`}>
                  <input 
                    type="radio" 
                    name="preset" 
                    value={p.id}
                    checked={selectedPresetId === p.id}
                    onChange={() => setSelectedPresetId(p.id)}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-600 border-gray-300"
                  />
                  <span className="ml-3 text-sm font-medium text-slate-900">{p.name}</span>
                </label>
              ))}
            </div>
          </div>

          {isCustom && (
            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Width (px)</label>
                <input type="number" min="0" value={customWidth === 0 ? '' : customWidth} onChange={(e) => setCustomWidth(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))} className="w-full p-2 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-indigo-600 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Height (px)</label>
                <input type="number" min="0" value={customHeight === 0 ? '' : customHeight} onChange={(e) => setCustomHeight(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))} className="w-full p-2 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-indigo-600 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Max KB</label>
                <input type="number" min="0" value={customMaxKb === 0 ? '' : customMaxKb} onChange={(e) => setCustomMaxKb(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))} className="w-full p-2 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-indigo-600 text-sm" />
              </div>
            </div>
          )}

          {!isCustom && (
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <ul className="text-sm text-slate-600 space-y-1">
                <li><span className="font-semibold">Dimensions:</span> {activePreset.width}x{activePreset.height} px</li>
                <li><span className="font-semibold">Target Size:</span> {activePreset.minKb} - {activePreset.maxKb} KB</li>
              </ul>
            </div>
          )}
        </div>

        {/* Upload and Preview */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {!file ? (
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-indigo-400 transition-colors bg-white flex-1 min-h-[300px]"
            >
              <UploadCloud className="w-12 h-12 text-slate-400 mb-4" />
              <p className="text-slate-700 font-semibold mb-2">Click to upload or drag & drop</p>
              <p className="text-slate-500 text-sm">JPG, PNG, WEBP (No size limit, works offline)</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={onFileSelect}
              />
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center relative min-h-[300px]">
              <button 
                onClick={() => { setFile(null); setPreviewUrl(null); setResultDataUrl(null); }}
                className="absolute top-4 right-4 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Start Over
              </button>

              {!resultDataUrl ? (
                <>
                  <div className="relative mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewUrl!} alt="Original" loading="lazy" className="max-w-[200px] max-h-[200px] object-contain rounded border border-slate-200" />
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-wider">Original</span>
                  </div>
                  <button 
                    onClick={compressImage}
                    disabled={isProcessing}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : 'Resize & Compress'}
                  </button>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center text-center mb-6">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-2" />
                    <h3 className="font-bold text-slate-900 text-lg">Success!</h3>
                    <p className="text-sm text-slate-500">File is ready for upload.</p>
                  </div>
                  
                  <div className="flex gap-8 items-end mb-8">
                    <div className="flex flex-col items-center">
                      <div className="w-[150px] h-[150px] flex items-center justify-center border border-dashed border-slate-300 bg-slate-50 rounded mb-2 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={resultDataUrl} alt="Result" loading="lazy" className="max-w-full max-h-full" />
                      </div>
                      <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                        {resultSizeKb} KB
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={downloadImage}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" /> Download Image
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <AdSlot format="horizontal" slotId="photo-bottom-ad" className="mt-12" />

      <FAQ items={faqs} />
    </div>
  );
}
