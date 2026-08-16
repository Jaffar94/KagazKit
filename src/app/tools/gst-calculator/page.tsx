'use client';

import { useState, useEffect } from 'react';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { IndianRupee, Percent, Calculator, ArrowRightLeft } from 'lucide-react';

type GstMode = 'add' | 'remove';

export default function GstCalculatorPage() {
  const [amount, setAmount] = useState<number | ''>('');
  const [gstRate, setGstRate] = useState<number>(18);
  const [mode, setMode] = useState<GstMode>('add');
  const [result, setResult] = useState<{
    baseAmount: number;
    gstAmount: number;
    totalAmount: number;
    cgst: number;
    sgst: number;
  } | null>(null);

  useEffect(() => {
    if (!amount) {
      setResult(null);
      return;
    }

    const val = Number(amount);
    let baseAmount = 0;
    let gstAmount = 0;
    let totalAmount = 0;

    if (mode === 'add') {
      baseAmount = val;
      gstAmount = val * (gstRate / 100);
      totalAmount = baseAmount + gstAmount;
    } else {
      totalAmount = val;
      baseAmount = val / (1 + gstRate / 100);
      gstAmount = totalAmount - baseAmount;
    }

    setResult({
      baseAmount: Number(baseAmount.toFixed(2)),
      gstAmount: Number(gstAmount.toFixed(2)),
      totalAmount: Number(totalAmount.toFixed(2)),
      cgst: Number((gstAmount / 2).toFixed(2)),
      sgst: Number((gstAmount / 2).toFixed(2)),
    });
  }, [amount, gstRate, mode]);

  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Online GST Calculator India</h1>
        <p className="text-slate-500">Instantly calculate GST for your business invoices. Add or remove GST (5%, 12%, 18%, 28%).</p>
      </div>

      <AdSlot format="horizontal" slotId="gst-top-ad" className="mb-8" />

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 mb-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            
            {/* Mode Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setMode('add')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  mode === 'add' 
                    ? 'bg-white text-indigo-700 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Add GST (Exclusive)
              </button>
              <button
                onClick={() => setMode('remove')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  mode === 'remove' 
                    ? 'bg-white text-indigo-700 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Remove GST (Inclusive)
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-indigo-500" />
                {mode === 'add' ? 'Initial Amount' : 'Total Invoice Amount'}
              </label>
              <input type="number" min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 10000"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-none text-lg font-medium"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Percent className="w-4 h-4 text-indigo-500" />
                GST Slab Rate
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 12, 18, 28].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setGstRate(rate)}
                    className={`py-3 rounded-xl border transition-all font-medium ${
                      gstRate === rate
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 ring-1 ring-indigo-600/20'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[350px]">
            {result ? (
              <div className="w-full">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6 text-center">Calculation Result</h3>
                
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 text-center">
                  <div className="text-emerald-600 font-medium mb-1">
                    {mode === 'add' ? 'Final Invoice Amount' : 'Original Base Amount'}
                  </div>
                  <div className="text-3xl font-extrabold text-emerald-700">
                    ₹{mode === 'add' ? result.totalAmount.toLocaleString('en-IN') : result.baseAmount.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between p-2 rounded hover:bg-white transition-colors">
                    <span className="text-slate-600">Base Amount</span>
                    <span className="font-medium text-slate-900">₹{result.baseAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded hover:bg-white transition-colors">
                    <span className="text-slate-600">Total GST ({gstRate}%)</span>
                    <span className="font-medium text-indigo-600">+ ₹{result.gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-t border-slate-200 my-2"></div>
                  <div className="flex justify-between p-2 rounded hover:bg-white transition-colors text-slate-500 text-xs">
                    <span>CGST ({gstRate / 2}%)</span>
                    <span>₹{result.cgst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded hover:bg-white transition-colors text-slate-500 text-xs">
                    <span>SGST ({gstRate / 2}%)</span>
                    <span>₹{result.sgst.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400">
                <Calculator className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Enter an amount to see the calculation.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AdSlot format="horizontal" slotId="gst-bottom-ad" className="mb-12" />

      <FAQ 
        items={[
          {
            question: "What is the difference between Adding and Removing GST?",
            answer: "Adding GST means calculating the tax on top of a base price (Exclusive of tax). Removing GST means calculating backwards from a final total price to find what the original base price was before the tax was applied (Inclusive of tax)."
          },
          {
            question: "How is CGST and SGST calculated?",
            answer: "For intra-state sales (within the same state), the total GST amount is divided equally into two halves: Central GST (CGST) and State GST (SGST). For example, an 18% GST becomes 9% CGST and 9% SGST."
          },
          {
            question: "What are the standard GST slabs in India?",
            answer: "The primary GST slabs currently active in India are 5% (essential goods), 12% (standard goods), 18% (standard services and goods), and 28% (luxury items)."
          }
        ]}
      />
    </div>
  );
}
