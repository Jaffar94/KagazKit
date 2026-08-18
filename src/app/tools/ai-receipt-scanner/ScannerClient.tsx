'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, Download, Loader2, AlertCircle, ScanText, Table } from 'lucide-react';
import toast from 'react-hot-toast';

type ReceiptItem = {
  name: string;
  quantity?: number;
  price: number;
};

type ReceiptData = {
  merchant?: string;
  date?: string;
  items: ReceiptItem[];
  subtotal?: number;
  tax?: number;
  total: number;
};

export default function ScannerClient() {
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [data, setData] = useState<ReceiptData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64String = e.target?.result as string;
      setImage(base64String);
      
      // Extract the mime type and raw base64 data
      const mimeType = file.type;
      const rawBase64 = base64String.split(',')[1];
      
      await scanReceipt(rawBase64, mimeType);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const scanReceipt = async (imageBase64: string, mimeType: string) => {
    setIsScanning(true);
    setData(null);
    toast.loading('Analyzing receipt...', { id: 'scan' });

    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/compress').replace('/compress', '');
      const apiUrl = `${baseUrl}/extract-receipt`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, mimeType }),
      });

      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Server Error (${response.status}): Please ensure your backend is running and try a smaller image.`);
      }

      if (!response.ok) {
        throw new Error(result.error || 'Failed to scan receipt');
      }

      setData(result.data);
      toast.success('Extraction complete!', { id: 'scan' });
    } catch (error: any) {
      toast.error(error.message, { id: 'scan' });
    } finally {
      setIsScanning(false);
    }
  };

  const downloadCSV = () => {
    if (!data) return;

    const headers = ['Item', 'Quantity', 'Price'];
    const rows = data.items.map(item => [
      `"${item.name.replace(/"/g, '""')}"`,
      item.quantity || 1,
      item.price
    ]);

    // Add totals at the bottom
    rows.push(['', '', '']);
    rows.push(['"Subtotal"', '', data.subtotal || '']);
    rows.push(['"Tax"', '', data.tax || '']);
    rows.push(['"Total"', '', data.total]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(',') + '\n' 
      + rows.map(e => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `receipt-${data.merchant || 'scan'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-8">
      
      {/* Upload Zone */}
      {!data && (
        <div 
          className="w-full bg-white rounded-3xl border-2 border-dashed border-slate-200 p-12 transition-all hover:border-primary/50 hover:bg-primary/5 flex flex-col items-center justify-center text-center cursor-pointer group relative overflow-hidden"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          {isScanning && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center z-10">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <h3 className="text-xl font-bold text-slate-800">Reading Receipt...</h3>
              <p className="text-slate-500 mt-2">Our AI is extracting line items and totals</p>
            </div>
          )}

          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <ScanText className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Upload a Receipt</h3>
          <p className="text-slate-500 max-w-sm mx-auto mb-6">
            Drag and drop an image of a receipt, or click to browse. Supported formats: JPG, PNG, WEBP.
          </p>
          <button className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-colors shadow-xs">
            Select Image
          </button>
        </div>
      )}

      {/* Results Section */}
      {data && (
        <div className="w-full space-y-6 @container">
          
          <div className="flex flex-col @md:flex-row gap-6 items-start">
            {/* Image Preview */}
            <div className="w-full @md:w-1/3 shrink-0 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="aspect-[3/4] relative rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                {image ? (
                  <img src={image} alt="Receipt Preview" className="w-full h-full object-contain" />
                ) : (
                  <FileText className="w-12 h-12 text-slate-300" />
                )}
              </div>
              <button 
                onClick={() => { setData(null); setImage(null); }}
                className="w-full mt-4 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors text-sm"
              >
                Scan Another
              </button>
            </div>

            {/* Extracted Data Table */}
            <div className="w-full @md:w-2/3 bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col @sm:flex-row justify-between items-start @sm:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Table className="w-5 h-5 text-primary" />
                    Extracted Items
                  </h3>
                  {data.merchant && (
                    <p className="text-slate-500 text-sm mt-1">Merchant: <span className="font-semibold text-slate-700">{data.merchant}</span></p>
                  )}
                </div>
                <button 
                  onClick={downloadCSV}
                  className="px-5 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 font-semibold rounded-xl transition-colors text-sm flex items-center gap-2 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200/80">
                    <tr>
                      <th className="px-6 py-4">Item</th>
                      <th className="px-6 py-4 text-center">Qty</th>
                      <th className="px-6 py-4 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {data.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium">{item.name}</td>
                        <td className="px-6 py-4 text-center text-slate-500">{item.quantity || '-'}</td>
                        <td className="px-6 py-4 text-right">{item.price != null ? item.price.toFixed(2) : '-'}</td>
                      </tr>
                    ))}
                    {data.items.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-slate-500 flex flex-col items-center gap-2">
                          <AlertCircle className="w-6 h-6 text-orange-400" />
                          No items could be clearly identified.
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot className="bg-slate-50/80 text-slate-800 border-t border-slate-200">
                    {data.subtotal != null && (
                      <tr>
                        <td colSpan={2} className="px-6 py-3 text-right text-slate-500">Subtotal</td>
                        <td className="px-6 py-3 text-right font-medium">{data.subtotal.toFixed(2)}</td>
                      </tr>
                    )}
                    {data.tax != null && (
                      <tr>
                        <td colSpan={2} className="px-6 py-3 text-right text-slate-500">Tax</td>
                        <td className="px-6 py-3 text-right font-medium">{data.tax.toFixed(2)}</td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan={2} className="px-6 py-4 text-right font-bold text-slate-900 text-base">Total</td>
                      <td className="px-6 py-4 text-right font-bold text-primary text-lg">{data.total?.toFixed(2) || '0.00'}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
