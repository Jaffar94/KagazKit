'use client';

import { useState, useEffect } from 'react';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import { Home, Percent, CalendarDays } from 'lucide-react';

export default function EmiCalculatorPage() {
  const [principal, setPrincipal] = useState<number>(5000000);
  const [rate, setRate] = useState<number>(8.5);
  const [years, setYears] = useState<number>(20);

  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    calculateEMI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [principal, rate, years]);

  const calculateEMI = () => {
    const p = principal;
    const r = rate / 12 / 100; // monthly interest rate
    const n = years * 12; // number of months

    if (p <= 0 || r <= 0 || n <= 0) {
      setEmi(0);
      setTotalInterest(0);
      setTotalAmount(0);
      return;
    }

    // EMI formula: P x R x (1+R)^N / [(1+R)^N-1]
    const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emiValue * n;
    const totalInt = totalPayment - p;

    setEmi(Math.round(emiValue));
    setTotalAmount(Math.round(totalPayment));
    setTotalInterest(Math.round(totalInt));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate percentages for the bar
  const principalPercent = totalAmount > 0 ? (principal / totalAmount) * 100 : 50;
  const interestPercent = totalAmount > 0 ? (totalInterest / totalAmount) * 100 : 50;

  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Home Loan EMI Calculator</h1>
        <p className="text-slate-500">Calculate your monthly EMI and see the breakdown of principal vs interest.</p>
      </div>

      <AdSlot format="horizontal" slotId="emi-top-ad" className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Home className="w-4 h-4 text-indigo-500" />
                Loan Amount (Principal)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">₹</span>
                <input
                  type="number"
                  value={principal || ''}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-none font-semibold text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Percent className="w-4 h-4 text-indigo-500" />
                Interest Rate (p.a.)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={rate || ''}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full pl-4 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-none font-semibold text-slate-900"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-indigo-500" />
                Loan Tenure (Years)
              </label>
              <div className="flex gap-4">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <div className="w-16 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-center font-semibold text-slate-900">
                  {years}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg">
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <h3 className="text-indigo-200 text-sm font-semibold uppercase tracking-wider mb-2">Monthly Payment (EMI)</h3>
              <div className="text-4xl md:text-5xl font-bold text-white mb-8">
                {formatCurrency(emi)}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 rounded-xl p-4 border border-white/5">
                  <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Total Principal</p>
                  <p className="text-xl font-bold text-emerald-400">{formatCurrency(principal)}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/5">
                  <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Total Interest</p>
                  <p className="text-xl font-bold text-amber-400">{formatCurrency(totalInterest)}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-emerald-400">Principal ({principalPercent.toFixed(1)}%)</span>
                <span className="text-amber-400">Interest ({interestPercent.toFixed(1)}%)</span>
              </div>
              {/* Visual Breakdown Bar */}
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-emerald-400 transition-all duration-500" 
                  style={{ width: `${principalPercent}%` }}
                ></div>
                <div 
                  className="h-full bg-amber-400 transition-all duration-500" 
                  style={{ width: `${interestPercent}%` }}
                ></div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                <p className="text-slate-400 text-sm">Total Amount Payable</p>
                <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdSlot format="display" slotId="emi-bottom-ad" className="mb-12" />

      <FAQ 
        items={[
          {
            question: "How is EMI calculated?",
            answer: "EMI is calculated using the formula: P x R x (1+R)^N / [(1+R)^N-1], where P is Principal amount, R is monthly interest rate, and N is the number of months."
          },
          {
            question: "Why is the total interest sometimes higher than the loan amount?",
            answer: "For long-term home loans (e.g., 20 or 30 years), the power of compound interest works against you. Because you are paying the loan over decades, the accumulated interest often surpasses the original borrowed amount. Our visual bar chart clearly shows exactly how much of your money is going to the bank as pure interest."
          }
        ]}
      />
    </div>
  );
}
