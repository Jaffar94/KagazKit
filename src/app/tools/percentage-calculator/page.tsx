'use client';

import { useState } from 'react';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { Percent, ArrowRight } from 'lucide-react';

export default function PercentageCalculatorPage() {
  // Calculator 1: What is X% of Y?
  const [calc1X, setCalc1X] = useState<number | ''>('');
  const [calc1Y, setCalc1Y] = useState<number | ''>('');
  
  // Calculator 2: X is what % of Y?
  const [calc2X, setCalc2X] = useState<number | ''>('');
  const [calc2Y, setCalc2Y] = useState<number | ''>('');
  
  // Calculator 3: Percentage Increase/Decrease from X to Y
  const [calc3X, setCalc3X] = useState<number | ''>('');
  const [calc3Y, setCalc3Y] = useState<number | ''>('');

  const res1 = (calc1X && calc1Y) ? (Number(calc1X) / 100) * Number(calc1Y) : null;
  const res2 = (calc2X && calc2Y && Number(calc2Y) !== 0) ? (Number(calc2X) / Number(calc2Y)) * 100 : null;
  
  let res3 = null;
  let res3Type = '';
  if (calc3X !== '' && calc3Y !== '' && Number(calc3X) !== 0) {
    const diff = Number(calc3Y) - Number(calc3X);
    res3 = (Math.abs(diff) / Number(calc3X)) * 100;
    res3Type = diff >= 0 ? 'Increase' : 'Decrease';
  }

  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Free Percentage Calculator Online</h1>
        <p className="text-slate-500">Quickly calculate percentages, mark ratios, and percentage increases or decreases.</p>
      </div>

      <AdSlot format="horizontal" slotId="percent-top-ad" className="mb-8" />

      <div className="space-y-6 mb-12">
        {/* Calculator 1 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Percent className="w-5 h-5 text-indigo-500" />
            1. What is X% of Y?
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2 w-full">
              <span className="font-medium text-slate-600">What is</span>
              <input
                type="number"
                value={calc1X}
                onChange={(e) => setCalc1X(e.target.value ? Number(e.target.value) : '')}
                className="w-24 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none"
                placeholder="X"
              />
              <span className="font-medium text-slate-600">% of</span>
              <input
                type="number"
                value={calc1Y}
                onChange={(e) => setCalc1Y(e.target.value ? Number(e.target.value) : '')}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none"
                placeholder="Y"
              />
            </div>
            <ArrowRight className="w-6 h-6 text-slate-400 hidden md:block shrink-0" />
            <div className="w-full md:w-48 h-12 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center font-bold text-indigo-700 text-lg shrink-0">
              {res1 !== null ? Number(res1.toFixed(4)) : '?'}
            </div>
          </div>
        </div>

        {/* Calculator 2 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Percent className="w-5 h-5 text-emerald-500" />
            2. X is what % of Y?
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2 w-full">
              <input
                type="number"
                value={calc2X}
                onChange={(e) => setCalc2X(e.target.value ? Number(e.target.value) : '')}
                className="w-24 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none"
                placeholder="X"
              />
              <span className="font-medium text-slate-600">is what % of</span>
              <input
                type="number"
                value={calc2Y}
                onChange={(e) => setCalc2Y(e.target.value ? Number(e.target.value) : '')}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none"
                placeholder="Y"
              />
            </div>
            <ArrowRight className="w-6 h-6 text-slate-400 hidden md:block shrink-0" />
            <div className="w-full md:w-48 h-12 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-center font-bold text-emerald-700 text-lg shrink-0">
              {res2 !== null ? `${Number(res2.toFixed(4))}%` : '?'}
            </div>
          </div>
        </div>

        {/* Calculator 3 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Percent className="w-5 h-5 text-amber-500" />
            3. Percentage Increase / Decrease
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2 w-full">
              <span className="font-medium text-slate-600">From</span>
              <input
                type="number"
                value={calc3X}
                onChange={(e) => setCalc3X(e.target.value ? Number(e.target.value) : '')}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 outline-none"
                placeholder="X"
              />
              <span className="font-medium text-slate-600">To</span>
              <input
                type="number"
                value={calc3Y}
                onChange={(e) => setCalc3Y(e.target.value ? Number(e.target.value) : '')}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 outline-none"
                placeholder="Y"
              />
            </div>
            <ArrowRight className="w-6 h-6 text-slate-400 hidden md:block shrink-0" />
            <div className="w-full md:w-48 h-12 bg-amber-50 border border-amber-100 rounded-lg flex items-center justify-center font-bold text-amber-700 text-lg shrink-0">
              {res3 !== null ? `${Number(res3.toFixed(4))}% ${res3Type}` : '?'}
            </div>
          </div>
        </div>
      </div>

      <AdSlot format="display" slotId="percent-bottom-ad" className="mb-12" />

      <FAQ 
        items={[
          {
            question: "How do I calculate percentage marks?",
            answer: "Use the second calculator 'X is what % of Y'. Enter your obtained marks in the first box (X) and the total possible marks in the second box (Y)."
          },
          {
            question: "How is percentage increase calculated?",
            answer: "Percentage increase is calculated by taking the difference between the two numbers, dividing it by the original number, and multiplying by 100."
          }
        ]}
      />
    </div>
  );
}
