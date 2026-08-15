'use client';

import { useState, useMemo } from 'react';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import { IndianRupee, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';

export default function SIPCalculatorPage() {
  const [monthlySIP, setMonthlySIP] = useState(5000);
  const [returnRate, setReturnRate] = useState(12);
  const [duration, setDuration] = useState(10);
  const [stepUp, setStepUp] = useState(10);

  const results = useMemo(() => {
    let totalInvested = 0;
    let maturityAmount = 0;
    let currentSIP = monthlySIP;
    const monthlyRate = returnRate / 12 / 100;

    for (let year = 1; year <= duration; year++) {
      for (let month = 1; month <= 12; month++) {
        totalInvested += currentSIP;
        maturityAmount = (maturityAmount + currentSIP) * (1 + monthlyRate);
      }
      currentSIP = currentSIP + (currentSIP * stepUp) / 100;
    }

    return {
      invested: Math.round(totalInvested),
      returns: Math.round(maturityAmount - totalInvested),
      total: Math.round(maturityAmount),
    };
  }, [monthlySIP, returnRate, duration, stepUp]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const faqs = [
    {
      question: "What is Step-Up SIP?",
      answer: "A Step-Up SIP automatically increases your monthly investment amount by a specific percentage every year. It aligns your investments with your growing income, significantly boosting your final corpus through the power of compounding."
    },
    {
      question: "Are the returns guaranteed?",
      answer: "No, SIP returns in mutual funds are subject to market risks. The expected return rate is just an estimation based on historical data. Equity mutual funds typically yield around 10-12% over the long term."
    },
    {
      question: "Is this calculator safe to use?",
      answer: "Yes, 100%. This calculator runs entirely in your browser. No financial data is ever sent to our servers."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">SIP Return & Mutual Fund Step-Up Calculator</h1>
        <p className="text-slate-500">Plan your mutual fund investments and discover the power of step-up compounding.</p>
      </div>

      <AdSlot format="horizontal" slotId="sip-top-ad" className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                <span className="flex items-center gap-2"><IndianRupee className="w-4 h-4 text-indigo-600"/> Monthly SIP</span>
                <span>{formatCurrency(monthlySIP)}</span>
              </label>
              <input 
                type="range" min="500" max="100000" step="500" 
                value={monthlySIP} onChange={(e) => setMonthlySIP(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            
            <div>
              <label className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-indigo-600"/> Expected Return (%)</span>
                <span>{returnRate}%</span>
              </label>
              <input 
                type="range" min="1" max="30" step="0.5" 
                value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-indigo-600"/> Duration (Years)</span>
                <span>{duration} Yrs</span>
              </label>
              <input 
                type="range" min="1" max="40" step="1" 
                value={duration} onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                <span className="flex items-center gap-2"><ArrowUpRight className="w-4 h-4 text-indigo-600"/> Annual Step-Up (%)</span>
                <span>{stepUp}%</span>
              </label>
              <input 
                type="range" min="0" max="50" step="1" 
                value={stepUp} onChange={(e) => setStepUp(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center gap-4">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
            <p className="text-sm font-medium text-slate-500 mb-1">Total Invested Amount</p>
            <p className="text-2xl font-bold text-slate-800">{formatCurrency(results.invested)}</p>
          </div>
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
            <p className="text-sm font-medium text-emerald-600 mb-1">Estimated Returns</p>
            <p className="text-2xl font-bold text-emerald-700">+{formatCurrency(results.returns)}</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
            <p className="text-sm font-medium text-indigo-600 mb-1">Total Maturity Value</p>
            <p className="text-4xl font-extrabold text-indigo-700">{formatCurrency(results.total)}</p>
          </div>
        </div>
      </div>

      <AdSlot format="horizontal" slotId="sip-bottom-ad" className="mt-12" />

      <FAQ items={faqs} />
    </div>
  );
}
