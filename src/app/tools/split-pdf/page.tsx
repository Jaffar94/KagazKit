'use client';

import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { PDFDocument } from 'pdf-lib';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { FileUp, FileText, CheckCircle, Download, X, SplitSquareHorizontal, ExternalLink } from 'lucide-react';

export default function SplitPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageRange, setPageRange] = useState<string>('');
  const [isSplitting, setIsSplitting] = useState(false);
  const [splitPdfUrl, setSplitPdfUrl] = useState<string | null>(null);
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [isPreviewGenerating, setIsPreviewGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalPdfRef = useRef<PDFDocument | null>(null);

  useEffect(() => {
    return () => {
      if (splitPdfUrl) URL.revokeObjectURL(splitPdfUrl);
      if (previewPdfUrl) URL.revokeObjectURL(previewPdfUrl);
    };
  }, [splitPdfUrl, previewPdfUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setSplitPdfUrl(null);
      setErrorMsg(null);
      setPageRange('');
      
      // Determine total pages
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        originalPdfRef.current = pdfDoc;
        setTotalPages(pdfDoc.getPageCount());
      } catch (err) {
        console.error("Failed to read PDF:", err);
        setErrorMsg("Failed to read the PDF. It might be corrupted or encrypted.");
        setFile(null);
        originalPdfRef.current = null;
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setTotalPages(0);
    setPageRange('');
    setSplitPdfUrl(null);
    setPreviewPdfUrl(null);
    setErrorMsg(null);
    originalPdfRef.current = null;
  };

  const parsePageRange = (rangeStr: string, maxPages: number): number[] => {
    const pages = new Set<number>();
    const parts = rangeStr.split(',').map(p => p.trim());
    
    for (const part of parts) {
      if (!part) continue;
      
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr);
        const end = parseInt(endStr);
        
        if (isNaN(start) || isNaN(end) || start < 1 || end < start || start > maxPages) {
          throw new Error(`Invalid range: ${part}`);
        }
        
        const actualEnd = Math.min(end, maxPages);
        for (let i = start; i <= actualEnd; i++) {
          pages.add(i);
        }
      } else {
        const page = parseInt(part);
        if (isNaN(page) || page < 1 || page > maxPages) {
          throw new Error(`Invalid page number: ${part}`);
        }
        pages.add(page);
      }
    }
    
    return Array.from(pages).sort((a, b) => a - b);
  };

  // Debounced live preview generation
  useEffect(() => {
    const timer = setTimeout(() => {
      generatePreview();
    }, 500);
    return () => clearTimeout(timer);
  }, [pageRange, file]);

  const generatePreview = async () => {
    if (!file || !pageRange || !originalPdfRef.current) {
      setPreviewPdfUrl(null);
      return;
    }
    
    setIsPreviewGenerating(true);
    try {
      const pageNumbers = parsePageRange(pageRange, totalPages);
      if (pageNumbers.length === 0) {
        setPreviewPdfUrl(null);
        return;
      }

      const newPdf = await PDFDocument.create();
      const zeroIndexedPages = pageNumbers.map(p => p - 1);
      
      const copiedPages = await newPdf.copyPages(originalPdfRef.current, zeroIndexedPages);
      copiedPages.forEach(page => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPreviewPdfUrl(url);
    } catch (error) {
      // Silently fail during live preview (user might be mid-typing)
      setPreviewPdfUrl(null);
    } finally {
      setIsPreviewGenerating(false);
    }
  };

  const splitPdf = async () => {
    if (!file || !pageRange || !originalPdfRef.current) return;
    
    setErrorMsg(null);
    setIsSplitting(true);
    
    try {
      const pageNumbers = parsePageRange(pageRange, totalPages);
      if (pageNumbers.length === 0) {
        throw new Error("Please enter a valid page range.");
      }

      const newPdf = await PDFDocument.create();
      const zeroIndexedPages = pageNumbers.map(p => p - 1);
      
      const copiedPages = await newPdf.copyPages(originalPdfRef.current, zeroIndexedPages);
      copiedPages.forEach(page => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setSplitPdfUrl(url);
    } catch (error: any) {
      console.error('Error splitting PDF:', error);
      const msg = error.message || 'Failed to split PDF.';
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setIsSplitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Split PDF Online Free</h1>
        <p className="text-slate-500">Extract specific pages from your PDF quickly. 100% secure and runs locally in your browser.</p>
      </div>

      <AdSlot format="horizontal" slotId="split-top-ad" className="mb-8" />

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 mb-12 shadow-xs">
        
        {/* Upload Area */}
        {!file && (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-indigo-400 transition-all group mb-8"
          >
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileUp className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-1">Select PDF File</h3>
            <p className="text-slate-500 text-sm">Click to browse or drag and drop here</p>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 text-center">
            {errorMsg}
          </div>
        )}

        {/* Selected File Area */}
        {file && (
          <div className="mb-8">
            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl mb-6">
              <div className="flex items-center gap-3 overflow-hidden">
                <FileText className="w-8 h-8 text-rose-500 shrink-0" />
                <div className="truncate">
                  <p className="text-base font-medium text-slate-800 truncate">{file.name}</p>
                  <p className="text-sm text-slate-500">{totalPages} pages • {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button 
                onClick={removeFile}
                className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors ml-4 shrink-0"
                title="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split Options */}
            {!splitPdfUrl && (
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700">
                  Pages to Extract
                </label>
                <input
                  type="text"
                  placeholder="e.g., 1-5, 8, 11-13"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden transition-all text-slate-700 font-medium"
                />
                <p className="text-xs text-slate-500">
                  Enter page numbers and/or page ranges separated by commas. The document has {totalPages} pages.
                </p>

                {/* Live Preview UI */}
                {pageRange && (
                  <div className="mt-6 border border-slate-200 rounded-xl overflow-hidden bg-slate-50 relative">
                    {isPreviewGenerating && (
                      <div className="absolute inset-0 bg-slate-50/80 flex flex-col items-center justify-center z-10">
                        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-2"></div>
                        <p className="text-sm font-medium text-slate-600">Updating preview...</p>
                      </div>
                    )}
                    {previewPdfUrl ? (
                      <>
                        {/* Desktop Iframe */}
                        <iframe 
                          src={previewPdfUrl} 
                          className="hidden md:block w-full h-[500px] border-0"
                          title="PDF Preview"
                        />
                        {/* Mobile Button Fallback */}
                        <div className="md:hidden w-full h-[200px] flex flex-col items-center justify-center p-6 text-center">
                          <p className="text-sm text-slate-500 mb-4">Preview is ready. (Embedded PDFs are limited on mobile browsers)</p>
                          <a 
                            href={previewPdfUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-indigo-100 text-indigo-700 font-bold rounded-xl hover:bg-indigo-200 transition-colors flex items-center justify-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Tap to Preview
                          </a>
                        </div>
                      </>
                    ) : !isPreviewGenerating && (
                      <div className="w-full h-[200px] flex items-center justify-center text-slate-400 text-sm">
                        Waiting for valid page range...
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Action Button & Results */}
        {file && (
          <div className="flex flex-col items-center border-t border-slate-100 pt-8 mt-4">
            {!splitPdfUrl ? (
              <button
                onClick={splitPdf}
                disabled={!pageRange || isSplitting}
                className="w-full md:w-auto px-12 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <SplitSquareHorizontal className="w-5 h-5" />
                {isSplitting ? 'Processing...' : 'Extract Pages'}
              </button>
            ) : (
              <div className="w-full text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Successfully Split!</h3>
                <p className="text-slate-500 mb-6">Your extracted pages are ready to download.</p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={splitPdfUrl}
                    download={`Extracted_${file.name}`}
                    className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </a>
                  <button
                    onClick={() => {
                      setSplitPdfUrl(null);
                      setPageRange('');
                    }}
                    className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Extract Different Pages
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      <AdSlot format="horizontal" slotId="split-bottom-ad" className="mb-12" />

      <FAQ 
        items={[
          {
            question: "Is it safe to upload my PDFs here?",
            answer: "Yes, it is 100% safe. KagazKit processes the split operation entirely in your web browser using JavaScript. Your files are NEVER uploaded to any server."
          },
          {
            question: "How do I extract a specific range of pages?",
            answer: "Simply type the page range into the input box. For example, typing '1-5' will extract the first five pages into a new PDF."
          },
          {
            question: "Can I extract non-consecutive pages?",
            answer: "Yes! Use commas to separate different pages or ranges. For example, '1, 3, 5-8' will extract page 1, page 3, and pages 5 through 8."
          }
        ]}
      />
    </div>
  );
}
