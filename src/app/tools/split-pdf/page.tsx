'use client';

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { FileUp, FileText, CheckCircle, Download, X, SplitSquareHorizontal } from 'lucide-react';

export default function SplitPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageRange, setPageRange] = useState<string>('');
  const [isSplitting, setIsSplitting] = useState(false);
  const [splitPdfUrl, setSplitPdfUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        setTotalPages(pdfDoc.getPageCount());
      } catch (err) {
        console.error("Failed to read PDF:", err);
        setErrorMsg("Failed to read the PDF. It might be corrupted or encrypted.");
        setFile(null);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setTotalPages(0);
    setPageRange('');
    setSplitPdfUrl(null);
    setErrorMsg(null);
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

  const splitPdf = async () => {
    if (!file || !pageRange) return;
    
    setErrorMsg(null);
    setIsSplitting(true);
    
    try {
      const pageNumbers = parsePageRange(pageRange, totalPages);
      if (pageNumbers.length === 0) {
        throw new Error("Please enter a valid page range.");
      }

      const arrayBuffer = await file.arrayBuffer();
      const originalPdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      // pdf-lib uses 0-indexed pages, our UI uses 1-indexed
      const zeroIndexedPages = pageNumbers.map(p => p - 1);
      
      const copiedPages = await newPdf.copyPages(originalPdf, zeroIndexedPages);
      copiedPages.forEach(page => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setSplitPdfUrl(url);
    } catch (error: any) {
      console.error('Error splitting PDF:', error);
      setErrorMsg(error.message || 'Failed to split PDF.');
    } finally {
      setIsSplitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Split PDF Online Free</h1>
        <p className="text-slate-500">Extract specific pages from your PDF quickly. 100% secure and runs locally in your browser.</p>
      </div>

      <AdSlot format="horizontal" slotId="split-top-ad" className="mb-8" />

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 mb-12 shadow-sm">
        
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
                  className="w-full border border-slate-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium"
                />
                <p className="text-xs text-slate-500">
                  Enter page numbers and/or page ranges separated by commas. The document has {totalPages} pages.
                </p>
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
                    className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
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

      <AdSlot format="display" slotId="split-bottom-ad" className="mb-12" />

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
