'use client';

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { FileUp, FileText, X, CheckCircle, Download, Layers } from 'lucide-react';

interface PdfFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

export default function MergePdfPage() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substring(7),
        file,
        name: file.name,
        size: file.size
      }));
      setFiles(prev => [...prev, ...newFiles]);
      setMergedPdfUrl(null); // Reset when new files added
    }
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
    setMergedPdfUrl(null);
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newFiles = [...files];
      [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
      setFiles(newFiles);
    } else if (direction === 'down' && index < files.length - 1) {
      const newFiles = [...files];
      [newFiles[index + 1], newFiles[index]] = [newFiles[index], newFiles[index + 1]];
      setFiles(newFiles);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;
    
    setIsMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const pdfObj of files) {
        const arrayBuffer = await pdfObj.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('Failed to merge PDFs. Please ensure all files are valid PDF documents.');
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Merge PDF Online Free</h1>
        <p className="text-slate-500">Combine multiple PDF files into one instantly. 100% secure and runs locally in your browser.</p>
      </div>

      <AdSlot format="horizontal" slotId="merge-top-ad" className="mb-8" />

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 mb-12 shadow-sm">
        
        {/* Upload Area */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-indigo-400 transition-all group mb-8"
        >
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileUp className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-1">Select PDF Files</h3>
          <p className="text-slate-500 text-sm">Click to browse or drag and drop here</p>
          <input
            type="file"
            accept="application/pdf"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>

        {/* Selected Files List */}
        {files.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Files to Merge ({files.length})
            </h3>
            <div className="space-y-3">
              {files.map((file, index) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileText className="w-6 h-6 text-rose-500 shrink-0" />
                    <div className="truncate">
                      <p className="text-sm font-medium text-slate-800 truncate">{file.name}</p>
                      <p className="text-xs text-slate-500">{formatSize(file.size)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <div className="flex flex-col gap-1 mr-2">
                      <button 
                        onClick={() => moveFile(index, 'up')}
                        disabled={index === 0}
                        className="text-slate-400 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-400"
                        title="Move Up"
                      >
                        ▲
                      </button>
                      <button 
                        onClick={() => moveFile(index, 'down')}
                        disabled={index === files.length - 1}
                        className="text-slate-400 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-400"
                        title="Move Down"
                      >
                        ▼
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFile(file.id)}
                      className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
                      title="Remove file"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button & Results */}
        <div className="flex flex-col items-center border-t border-slate-100 pt-8 mt-4">
          {!mergedPdfUrl ? (
            <button
              onClick={mergePdfs}
              disabled={files.length < 2 || isMerging}
              className="w-full md:w-auto px-12 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isMerging ? 'Merging PDFs...' : 'Merge PDFs Now'}
            </button>
          ) : (
            <div className="w-full text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Successfully Merged!</h3>
              <p className="text-slate-500 mb-6">Your combined PDF is ready to download.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={mergedPdfUrl}
                  download="KagazKit_Merged.pdf"
                  className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-5 h-5" />
                  Download Merged PDF
                </a>
                <button
                  onClick={() => {
                    setFiles([]);
                    setMergedPdfUrl(null);
                  }}
                  className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Merge More Files
                </button>
              </div>
            </div>
          )}
          
          {files.length === 1 && (
            <p className="text-sm text-amber-600 mt-4 font-medium">Please add at least one more PDF to merge.</p>
          )}
        </div>

      </div>

      <AdSlot format="horizontal" slotId="merge-bottom-ad" className="mb-12" />

      <FAQ 
        items={[
          {
            question: "Is it safe to upload my PDFs here?",
            answer: "Yes, it is 100% safe. KagazKit processes the merge operation entirely in your web browser using JavaScript. Your files are NEVER uploaded to any server. They remain strictly on your device."
          },
          {
            question: "Can I rearrange the order of the PDFs?",
            answer: "Absolutely! After selecting your files, you can use the up (▲) and down (▼) arrows next to each file to change their order before merging."
          },
          {
            question: "Is there a limit on file size or number of files?",
            answer: "Because the merging happens in your browser, the limit depends on your device's memory (RAM). Generally, merging dozens of standard PDFs will work seamlessly on any modern smartphone or laptop."
          }
        ]}
      />
    </div>
  );
}
