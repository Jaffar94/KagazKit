'use client';

import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { Image as ImageIcon, Download, Loader2, ArrowRight, ArrowDown } from 'lucide-react';
// Dynamically import heic2any to avoid Next.js SSR window errors

export default function HeicToJpgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    };
  }, [convertedUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      const fileName = selectedFile.name.toLowerCase();
      if (!fileName.endsWith('.heic') && !fileName.endsWith('.heif')) {
        toast.error('Please select a valid HEIC or HEIF file.');
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File is too large! Please upload a file under 10MB to prevent browser crashes.');
        return;
      }
      
      setFile(selectedFile);
      setConvertedUrl(null);
      
      await convertHeic(selectedFile);
    }
  };

  const convertHeic = async (sourceFile: File) => {
    setIsConverting(true);
    const loadingToast = toast.loading('Converting HEIC to JPG...');
    
    try {
      const heic2anyModule = await import('heic2any');
      const heic2any = heic2anyModule.default || heic2anyModule;
      
      const convertedBlob = await heic2any({
        blob: sourceFile,
        toType: 'image/jpeg',
        quality: 0.9
      });

      // Handle array of blobs if it was an image sequence, though usually it's one blob
      const finalBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      
      const url = URL.createObjectURL(finalBlob);
      setConvertedUrl(url);
      toast.success('Conversion complete!', { id: loadingToast });
    } catch (error) {
      console.error('Error converting HEIC:', error);
      toast.error('Failed to convert image. Please try another file.', { id: loadingToast });
      setFile(null);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      const fileName = selectedFile.name.toLowerCase();
      
      if (!fileName.endsWith('.heic') && !fileName.endsWith('.heif')) {
        toast.error('Please drop a valid HEIC or HEIF file.');
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File is too large! Please drop a file under 10MB to prevent browser crashes.');
        return;
      }
      
      setFile(selectedFile);
      setConvertedUrl(null);
      convertHeic(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setConvertedUrl(null);
  };

  const faqs = [
    {
      question: "Why do iPhones use HEIC?",
      answer: "HEIC (High-Efficiency Image Container) is Apple's default photo format. It compresses images to a much smaller size than JPG without losing quality. However, many websites and Windows PCs do not support HEIC files natively."
    },
    {
      question: "Are my photos uploaded to a server?",
      answer: "No, absolutely not! This conversion happens 100% locally inside your web browser using WebAssembly. Your personal photos never leave your device, guaranteeing absolute privacy."
    },
    {
      question: "Will I lose image quality?",
      answer: "Our converter maintains a very high 90% quality retention when converting from HEIC to standard JPG. You will not notice any visible difference in standard viewing."
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">HEIC to JPG Converter</h1>
        <p className="text-slate-500">Instantly convert Apple iPhone HEIC photos to standard JPG format. 100% private and offline.</p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 mb-8 shadow-xs">
        
        {!file ? (
          <div 
            className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:bg-slate-50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Upload HEIC Photo</h3>
            <p className="text-sm text-slate-500 mb-4">Drag and drop or click to browse</p>
            <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
              Select File
            </button>
            <input 
              type="file" 
              accept=".heic,.heif" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
              {/* Original File Indicator */}
              <div className="flex flex-col items-center p-4 bg-slate-50 border border-slate-200 rounded-xl w-full md:w-1/3">
                <ImageIcon className="w-8 h-8 text-slate-500 mb-2" />
                <p className="text-sm font-medium text-slate-700 truncate w-full text-center px-4">{file.name}</p>
                <span className="text-xs font-bold text-slate-400 mt-1 uppercase">HEIC Format</span>
              </div>

              <ArrowRight className="hidden md:block w-8 h-8 text-slate-300" />
              <ArrowDown className="block md:hidden w-8 h-8 text-slate-300" />

              {/* Conversion Output */}
              <div className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-xl w-full md:w-1/3 min-h-[120px] bg-indigo-50">
                {isConverting ? (
                  <>
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-2" />
                    <p className="text-sm font-medium text-indigo-600">Converting...</p>
                  </>
                ) : convertedUrl ? (
                  <>
                    <ImageIcon className="w-8 h-8 text-emerald-600 mb-2" />
                    <p className="text-sm font-medium text-slate-700 truncate w-full text-center px-4">{file.name.replace(/\.heic|\.heif/i, '.jpg')}</p>
                    <span className="text-xs font-bold text-emerald-600 mt-1">Ready</span>
                  </>
                ) : null}
              </div>
            </div>

            {convertedUrl && (
              <div className="flex gap-4">
                <button 
                  onClick={removeFile}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Convert Another
                </button>
                <a 
                  href={convertedUrl} 
                  download={file.name.replace(/\.heic|\.heif/i, '.jpg')}
                  className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download JPG
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SEO Content Block */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Easily Convert Apple Photos to Universal JPG</h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          If you own an iPhone, your high-quality photos are automatically saved in the HEIC format. While this saves storage space, most government portals, job application sites, and Windows computers cannot open HEIC files. Our HEIC to JPG converter solves this problem instantly. Using advanced WebAssembly technology, your photos are converted from HEIC to standard JPG entirely within your web browser. This means your private, sensitive photographs are never uploaded to our servers. Enjoy lightning-fast, high-quality image conversion with absolute data privacy.
        </p>
      </div>

      <AdSlot format="horizontal" slotId="heic-converter-bottom-ad" className="mb-12" />

      <FAQ items={faqs} />
    </div>
  );
}
