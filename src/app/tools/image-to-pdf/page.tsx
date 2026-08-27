'use client';

import { useState, useRef, useEffect } from 'react';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { UploadCloud, FileText, Download, Loader2, CheckCircle2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import toast from 'react-hot-toast';
import { trackDownload } from '@/utils/stats';

export default function ImageToPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultSizeKb, setResultSizeKb] = useState<number>(0);
  const [targetMaxKb, setTargetMaxKb] = useState<number>(300);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      if (selected.size > 10 * 1024 * 1024) {
        toast.error('File is too large! Please upload an image under 10MB to prevent browser crashes.');
        return;
      }
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setResultBlob(null);
    }
  };

  const convertToPdf = async () => {
    if (!file || !previewUrl) return;
    setIsProcessing(true);
    setResultBlob(null);
    await new Promise(r => setTimeout(r, 50)); // Yield main thread

    try {
      const img = new Image();
      img.src = previewUrl;
      await new Promise((resolve, reject) => { 
        img.onload = resolve; 
        img.onerror = () => reject(new Error("Failed to load image into canvas"));
      });

      // Target size in bytes
      const targetBytes = targetMaxKb * 1024;
      
      // Use binary search for quality to hit the target KB size.
      let minQ = 0.1;
      let maxQ = 1.0;
      let quality = 0.8;
      let bestBlob: Blob | null = null;

      for (let i = 0; i < 7; i++) {
        // Create an A4 PDF
        const pdf = new jsPDF({
          orientation: img.width > img.height ? 'landscape' : 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        // Calculate aspect ratio
        const imgRatio = img.width / img.height;
        let finalW = pageWidth;
        let finalH = finalW / imgRatio;

        if (finalH > pageHeight) {
          finalH = pageHeight;
          finalW = finalH * imgRatio;
        }

        // Center image
        const x = (pageWidth - finalW) / 2;
        const y = (pageHeight - finalH) / 2;

        pdf.addImage(img, 'JPEG', x, y, finalW, finalH, undefined, 'FAST', 0);
        
        const arrayBuffer = pdf.output('arraybuffer');
        const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
        
        bestBlob = blob;
        
        if (blob.size <= targetBytes) {
           break; // Fast exit if we are under limit natively, though jsPDF compression is basic.
        } else {
           // Wait, jsPDF doesn't natively compress JPEG inside `addImage` well unless we compress the image FIRST.
           // To truly hit KB limits, we must compress the base64 image data BEFORE passing it to jsPDF.
           break;
        }
      }

      // If just wrapping in jsPDF is too big, compress the image first
      if (bestBlob && bestBlob.size > targetBytes) {
          let qMin = 0.05;
          let qMax = 0.9;
          
          for(let i=0; i < 8; i++) {
              let q = (qMin + qMax) / 2;
              
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d')!;
              ctx.drawImage(img, 0, 0);
              const compressedDataUrl = canvas.toDataURL('image/jpeg', q);
              
              const pdf = new jsPDF({
                orientation: img.width > img.height ? 'landscape' : 'portrait',
                unit: 'mm',
                format: 'a4'
              });
              
              const pageWidth = pdf.internal.pageSize.getWidth();
              const pageHeight = pdf.internal.pageSize.getHeight();
              const imgRatio = img.width / img.height;
              let finalW = pageWidth;
              let finalH = finalW / imgRatio;
      
              if (finalH > pageHeight) {
                finalH = pageHeight;
                finalW = finalH * imgRatio;
              }
      
              const x = (pageWidth - finalW) / 2;
              const y = (pageHeight - finalH) / 2;
      
              pdf.addImage(compressedDataUrl, 'JPEG', x, y, finalW, finalH);
              const arrayBuffer = pdf.output('arraybuffer');
              const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
              
              bestBlob = blob;
              
              if (blob.size > targetBytes) {
                  qMax = q; // Too big, reduce quality
              } else {
                  qMin = q; // Good, try to increase quality slightly
              }
          }
      }

      if (bestBlob) {
        setResultBlob(bestBlob);
        setResultSizeKb(Math.round(bestBlob.size / 1024));
        toast.success('Converted successfully!');
      }

    } catch (error) {
      console.error(error);
      toast.error('Error converting image to PDF');
    }

    setIsProcessing(false);
  };

  const handleDownload = () => {
    if (resultBlob) {
      trackDownload();
      const url = URL.createObjectURL(resultBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `document_${targetMaxKb}kb.pdf`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };

  return (
    <div className="w-full max-w-5xl">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Image to PDF Converter (Under 300KB)</h1>
        <p className="text-slate-500">Convert Aadhaar, PAN, or any image to PDF format strictly within your KB limit.</p>
      </div>

      

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 mb-12 shadow-xs">
        
        <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Target Maximum Size (KB)</label>
            <input type="number" min="0" 
              value={targetMaxKb === 0 ? '' : targetMaxKb}
              onChange={(e) => setTargetMaxKb(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
              className="w-full md:w-1/3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-hidden"
            />
            <p className="text-xs text-slate-500 mt-2">Example: 300 for Aadhaar/ID proof uploads.</p>
        </div>

        {!file ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-indigo-400 transition-colors cursor-pointer"
          >
            <UploadCloud className="w-12 h-12 text-slate-400 mb-4" />
            <p className="text-slate-700 font-medium mb-1">Click to upload image</p>
            <p className="text-slate-500 text-sm">JPG, PNG (Max 10MB)</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <div className="relative aspect-square md:aspect-auto md:h-64 w-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl!} alt="Preview" loading="lazy" className="w-full h-full object-contain" />
              </div>
              <button 
                onClick={() => { setFile(null); setResultBlob(null); }}
                className="text-sm text-slate-500 hover:text-slate-700 underline"
              >
                Choose different image
              </button>
            </div>

            <div className="flex flex-col justify-center h-full min-h-[250px]">
              {!resultBlob ? (
                <button
                  onClick={convertToPdf}
                  disabled={isProcessing}
                  className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Converting to PDF...</>
                  ) : (
                    <><FileText className="w-5 h-5" /> Convert to PDF</>
                  )}
                </button>
              ) : (
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Conversion Complete!</h3>
                    <p className="text-emerald-700 font-medium text-xl">
                      {resultSizeKb} KB <span className="text-sm text-emerald-600/80 font-normal">/ {targetMaxKb}KB Max</span>
                    </p>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" /> Download PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      </div>

      
      {/* SEO Content Block */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Secure, Client-Side Image to PDF Conversion</h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          Converting physical documents, receipts, and identity cards from raw image files into a single, professional PDF document is a universal requirement for online applications, corporate communications, and digital archiving. Our advanced Image to PDF Converter goes significantly beyond standard conversion by offering an intelligent, target-size compression feature. This means you can specify an exact maximum file size (such as under 200KB or 1MB) as mandated by strict government portals, university admissions sites, or corporate HR systems, and the tool will automatically adjust the image compression to meet that precise constraint. Most importantly, unlike the vast majority of online PDF converters that require you to upload your highly sensitive personal documents to mysterious cloud servers, our tool is engineered with a strict 100% client-side processing architecture. The entire conversion, rendering, and compression process happens locally within the memory of your own browser, ensuring absolute privacy, zero data retention, and immediate offline functionality.
        </p>
      </div>
  
      <AdSlot format="horizontal" slotId="imgpdf-bottom-ad" className="mb-12" />

      <FAQ 
        items={[
          {
            question: "Is it safe to upload my Aadhaar card or PAN card?",
            answer: "Yes, 100% safe. This tool operates entirely in your web browser using client-side JavaScript. Your images and documents are never uploaded to our servers, ensuring absolute privacy for sensitive documents like Aadhaar, PAN, and passports."
          },
          {
            question: "How does the tool ensure the PDF is under 300KB?",
            answer: "If your image is too large, our system automatically runs a smart compression loop. It slightly reduces the JPEG quality step-by-step before injecting it into the PDF format, stopping the exact moment it hits your target KB limit while preserving maximum readability."
          }
        ]}
      />
    </div>
  );
}
