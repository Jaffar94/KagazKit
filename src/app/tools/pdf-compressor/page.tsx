'use client';

import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { FileUp, FileText, Download, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

export default function CompressPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [compressionPercent, setCompressionPercent] = useState<number>(50);
  const [grayscale, setGrayscale] = useState<boolean>(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [compressedPdfUrl, setCompressedPdfUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (compressedPdfUrl) {
        URL.revokeObjectURL(compressedPdfUrl);
      }
    };
  }, [compressedPdfUrl]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getTargetDpi = () => {
    return Math.round(300 - (compressionPercent / 100) * (300 - 100));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.size > 50 * 1024 * 1024) {
        setErrorMsg('File is too large. Maximum allowed size is 50MB.');
        return;
      }
      setFile(selected);
      setErrorMsg(null);
      setCompressedPdfUrl(null);
      setCompressedSize(null);
    }
  };

  const compressPdf = async () => {
    if (!file) return;
    
    setIsCompressing(true);
    setErrorMsg(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('dpi', getTargetDpi().toString());
      formData.append('grayscale', grayscale.toString());

      const apiUrl = process.env.NEXT_PUBLIC_PDF_API_URL || 'http://localhost:8080/compress';
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Server error occurred during compression.');
      }

      const blob = await response.blob();
      setCompressedSize(blob.size);
      
      const url = URL.createObjectURL(blob);
      setCompressedPdfUrl(url);

    } catch (error: any) {
      console.error('Error compressing PDF:', error);
      const msg = error.message || 'Failed to compress PDF. Please try again.';
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setIsCompressing(false);
    }
  };

  const calculateSavings = () => {
    if (!file || !compressedSize) return 0;
    const diff = file.size - compressedSize;
    if (diff <= 0) return 0;
    return Math.round((diff / file.size) * 100);
  };

  return (
    <div className="w-full max-w-5xl">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Compress PDF Online Free</h1>
        <p className="text-slate-500">Reduce PDF file size quickly for email and web uploads. Max file size: 50MB.</p>
      </div>

      <AdSlot format="horizontal" slotId="compress-top-ad" className="mb-8" />

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 mb-12 shadow-sm">
        
        {!file ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-indigo-400 transition-all group"
          >
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileUp className="w-10 h-10 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">Select PDF File</h3>
            <p className="text-slate-500 text-center max-w-sm">Click to browse or drag and drop your PDF here to compress it.</p>
            <p className="text-xs text-slate-400 mt-4">Limit: 50MB</p>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            
            {errorMsg && (
              <div className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">{errorMsg}</p>
              </div>
            )}

            {!compressedPdfUrl ? (
              <div className="w-full max-w-md bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col items-center text-center">
                <FileText className="w-16 h-16 text-rose-500 mb-4" />
                <h3 className="font-bold text-slate-800 text-lg mb-1 truncate w-full px-4">{file.name}</h3>
                <div className="flex flex-col gap-1 mb-6 text-sm">
                  <p className="text-slate-500">Original Size: <span className="font-medium text-slate-700">{formatSize(file.size)}</span></p>
                  <p className="text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full inline-block mt-1">Target Resolution: {getTargetDpi()} DPI</p>
                </div>

                <div className="w-full mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-700">Compression Level</label>
                    <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{compressionPercent}%</span>
                  </div>
                  
                  <div className="relative w-full px-1 py-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={compressionPercent}
                      onChange={(e) => setCompressionPercent(parseInt(e.target.value))}
                      disabled={isCompressing}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:opacity-50"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                      <span>Less (High Quality)</span>
                      <span>Extreme (Smallest Size)</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-500 mt-1 text-center bg-slate-100 p-2 rounded-lg">
                    {compressionPercent < 30 && 'Will preserve high-resolution images, larger file size.'}
                    {compressionPercent >= 30 && compressionPercent <= 70 && 'Recommended for web and email sharing.'}
                    {compressionPercent > 70 && 'Maximum compression, images may lose noticeable detail.'}
                  </p>
                </div>

                <div className="w-full mb-8 text-left">
                  <label className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={grayscale}
                      onChange={(e) => setGrayscale(e.target.checked)}
                      disabled={isCompressing}
                      className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-600 focus:ring-offset-0 disabled:opacity-50"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800">Convert to Black & White</span>
                      <span className="text-xs text-slate-500">Massively reduces file size by completely removing all color data.</span>
                    </div>
                  </label>
                </div>
                
                <div className="w-full flex gap-3">
                  <button
                    onClick={() => {
                      setFile(null);
                      setErrorMsg(null);
                    }}
                    disabled={isCompressing}
                    className="flex-1 py-3 px-4 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={compressPdf}
                    disabled={isCompressing}
                    className="flex-1 py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isCompressing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Compressing...
                      </>
                    ) : (
                      'Compress PDF'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Compression Complete!</h3>
                
                <div className="flex justify-center items-center gap-8 my-8">
                  <div className="text-center">
                    <p className="text-slate-500 text-sm mb-1">Original Size</p>
                    <p className="font-bold text-slate-700 text-lg">{formatSize(file.size)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-emerald-600 text-sm mb-1 font-semibold">Saved {calculateSavings()}%</p>
                    <ArrowRight className="w-6 h-6 text-slate-300 mx-auto" />
                  </div>
                  <div className="text-center">
                    <p className="text-slate-500 text-sm mb-1">New Size</p>
                    <p className="font-bold text-emerald-600 text-xl">{formatSize(compressedSize || 0)}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={compressedPdfUrl}
                    download={`Compressed_${file.name}`}
                    className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </a>
                  <button
                    onClick={() => {
                      setFile(null);
                      setCompressedPdfUrl(null);
                      setCompressedSize(null);
                    }}
                    className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Compress Another
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      <AdSlot format="horizontal" slotId="compress-bottom-ad" className="mb-12" />

      <FAQ 
        items={[
          {
            question: "How does the PDF compression work?",
            answer: "Our tool uploads your file via a secure encrypted connection to our dedicated compression server, where it uses advanced tools like Ghostscript to reduce image resolution, compress fonts, and drastically shrink the PDF file size based on the level you select."
          },
          {
            question: "Is my document stored on your servers?",
            answer: "No. Your privacy is paramount. Your uploaded PDF and the compressed version are processed entirely in memory or temporary isolated storage, and are permanently deleted immediately after the compression is complete."
          },
          {
            question: "Why did my file size not reduce much?",
            answer: "If your PDF is already highly optimized (like those exported from modern design tools) or contains primarily text without many images, there is very little left to compress."
          }
        ]}
      />
    </div>
  );
}

// Quick inline component for the arrow
const ArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);
