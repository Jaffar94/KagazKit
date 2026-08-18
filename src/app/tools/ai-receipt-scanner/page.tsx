import { Metadata } from 'next';
import ScannerClient from './ScannerClient';
import FAQ from '@/components/FAQ';
import AdSlot from '@/components/AdSlot';
import { ReceiptText, CheckCircle, Zap, TableProperties } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Receipt Scanner & Invoice Extractor | KagazKit',
  description: 'Instantly extract items, prices, tax, and totals from any receipt or invoice using our free AI Receipt Scanner. Export structured data to CSV or Excel instantly.',
  keywords: ['ai receipt scanner', 'invoice extractor', 'extract text from receipt', 'ocr receipt online', 'free receipt scanner to excel'],
};

const faqItems = [
  {
    question: "How does the AI Receipt Scanner work?",
    answer: "Our tool uses advanced Vision AI (Multimodal Large Language Models) to \"read\" the image of your receipt. Unlike traditional OCR which just extracts dumb text, our AI actually understands the layout and logic of an invoice. It intelligently groups items with their corresponding prices, identifies the merchant, and calculates the tax and total."
  },
  {
    question: "Is my receipt data stored or saved?",
    answer: "No, absolutely not. KagazKit values your privacy. Your receipt is temporarily sent to the AI processing API in memory, the data is returned to your screen, and the image is immediately discarded. We do not store, save, or use your financial documents for training."
  },
  {
    question: "What image formats are supported?",
    answer: "You can upload standard image formats including JPG, PNG, and WEBP. For the best results, ensure the image is well-lit, in focus, and the text is legible."
  },
  {
    question: "Can I export the extracted data to Excel?",
    answer: "Yes! Once the AI successfully extracts the line items and totals, a 'Download CSV' button will appear. Clicking it will instantly download a spreadsheet file that you can open in Microsoft Excel, Google Sheets, or Apple Numbers."
  }
];

export default function AIReceiptScannerPage() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
          <ReceiptText className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          AI Receipt & Invoice Scanner
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Instantly extract structured data from any receipt. Upload an image, and our Vision AI will identify line items, taxes, and totals for you to export.
        </p>
      </div>

      <AdSlot format="horizontal" slotId="auto-ai-scanner-top" />

      {/* Main Client Tool */}
      <div className="w-full">
        <ScannerClient />
      </div>

      <AdSlot format="horizontal" slotId="auto-ai-scanner-mid" />

      {/* Features Content for SEO */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 md:p-12 shadow-xs space-y-8 mt-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Why use our AI Receipt Scanner?</h2>
          <p className="text-slate-500">Traditional OCR tools just give you a messy block of text. Our GenAI tool actually understands financial documents.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Instant Extraction</h3>
            <p className="text-slate-500 leading-relaxed">Powered by Google Gemini Vision AI, the extraction takes seconds and correctly identifies merchant names and exact line items.</p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
              <TableProperties className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Structured Data</h3>
            <p className="text-slate-500 leading-relaxed">Stop manually typing expenses. We automatically parse the messy receipt into a clean, structured table.</p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Excel Ready</h3>
            <p className="text-slate-500 leading-relaxed">With one click, export your data into a CSV format perfectly ready for import into Excel, Quickbooks, or your accounting software.</p>
          </div>
        </div>
      </div>

      <AdSlot format="horizontal" slotId="auto-ai-scanner-bottom" />

      {/* FAQ Section */}
      <FAQ items={faqItems} />
    </div>
  );
}
