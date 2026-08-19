'use client';

import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { Image as ImageIcon, Download, Loader2, Wand2, Sparkles } from 'lucide-react';
import { removeBackground } from '@imgly/background-removal';

export default function BackgroundRemoverPage() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [removedUrl, setRemovedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (removedUrl) URL.revokeObjectURL(removedUrl);
    };
  }, [originalUrl, removedUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
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
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = async (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please upload a valid image file.');
      return;
    }

    setFile(selectedFile);
    setOriginalUrl(URL.createObjectURL(selectedFile));
    setRemovedUrl(null);
    setIsProcessing(true);
    setProgress(0);
    setLoadingMessage('Initializing AI Model...');

    try {
      const config = {
        progress: (key: string, current: number, total: number) => {
          if (key === 'compute:inference') {
            setLoadingMessage('Processing Image...');
          } else {
            setLoadingMessage('Downloading AI Model (First time only)...');
          }
          const percent = Math.round((current / total) * 100);
          setProgress(percent);
        }
      };

      const resultBlob = await removeBackground(selectedFile, config);
      const url = URL.createObjectURL(resultBlob);
      setRemovedUrl(url);
      toast.success('Background removed successfully!');
    } catch (error) {
      console.error('Error removing background:', error);
      toast.error('Failed to process image. Please try a different one.');
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setLoadingMessage('');
    }
  };

  const resetTool = () => {
    setFile(null);
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (removedUrl) URL.revokeObjectURL(removedUrl);
    setOriginalUrl(null);
    setRemovedUrl(null);
  };

  const faqs = [
    {
      question: "Are my photos uploaded to a server?",
      answer: "No! This tool represents a breakthrough in web technology. We use an advanced AI model that runs completely inside your web browser. Your photos never leave your device, ensuring absolute privacy."
    },
    {
      question: "Why does it take a few seconds to load?",
      answer: "Because the AI runs locally on your device, your browser needs to download the AI model the very first time you use the tool (approx 40MB). Once downloaded, subsequent images will process much faster."
    },
    {
      question: "What format does it save in?",
      answer: "The final image is saved as a high-quality PNG with a transparent background, perfect for dropping into presentations, websites, or design tools."
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">AI Background Remover</h1>
        <p className="text-slate-500">Instantly strip the background from any photo using local, privacy-first AI.</p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 mb-8 shadow-xs">
        
        {!file ? (
          <div 
            className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:bg-slate-50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Wand2 className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Upload an Image</h3>
            <p className="text-sm text-slate-500 mb-4">Drag and drop or click to browse</p>
            <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
              Select Photo
            </button>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
              {/* Original Image */}
              <div className="flex flex-col items-center">
                <p className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wide">Original</p>
                <div className="w-full aspect-square relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                  {originalUrl && (
                    <img src={originalUrl} alt="Original" className="w-full h-full object-contain" />
                  )}
                </div>
              </div>

              {/* Result Image */}
              <div className="flex flex-col items-center">
                <p className="text-sm font-bold text-indigo-600 mb-3 uppercase tracking-wide flex items-center gap-1">
                  <Sparkles className="w-4 h-4" /> Result
                </p>
                <div className="w-full aspect-square relative rounded-2xl overflow-hidden border border-slate-200 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZiIgLz4KPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIiAvPgo8cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2YwZjBmMCIgLz4KPC9zdmc+')] bg-repeat flex items-center justify-center">
                  
                  {isProcessing && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-6 text-center">
                      <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                      <p className="text-sm font-bold text-slate-700 mb-2">{loadingMessage}</p>
                      <div className="w-full max-w-[200px] h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600 transition-all duration-300" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {removedUrl && (
                    <img src={removedUrl} alt="Background Removed" className="w-full h-full object-contain drop-shadow-2xl" />
                  )}
                </div>
              </div>
            </div>

            {removedUrl && (
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={resetTool}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Upload New Image
                </button>
                <a 
                  href={removedUrl} 
                  download="background-removed.png"
                  className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-md flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Transparent PNG
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SEO Content Block */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Professional Background Removal, Zero Server Risk</h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          Remove backgrounds from portraits, products, and graphics instantly with our state-of-the-art AI tool. Unlike traditional services that upload your sensitive images to remote servers and charge exorbitant subscription fees, our background remover runs entirely client-side using cutting-edge WebAssembly technology. By executing the complex neural networks directly on your device's CPU/GPU, we guarantee absolute data privacy and instantaneous downloads. Perfect for e-commerce sellers, social media managers, and designers seeking high-quality transparent PNGs at zero cost.
        </p>
      </div>

      <AdSlot format="horizontal" slotId="bg-remover-bottom-ad" className="mb-12" />

      <FAQ items={faqs} />
    </div>
  );
}
