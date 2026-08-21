'use client';

import { useState, useMemo } from 'react';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { IndianRupee, FileText } from 'lucide-react';
import { calculateOldRegimeTax, calculateNewRegimeTax } from '@/utils/tax';

export default function TaxCalculatorPage() {
  const [salary, setSalary] = useState(1200000);
  const [sec80c, setSec80c] = useState(150000);
  const [sec80d, setSec80d] = useState(25000);
  const [hra, setHra] = useState(0);
  const [homeLoan, setHomeLoan] = useState(0);

  // Tax calculation functions moved to @/utils/tax

  const { oldTax, newTax, winner, savings } = useMemo(() => {
    const deductionsTotal = Math.min(150000, sec80c) + sec80d + hra + Math.min(200000, homeLoan);
    const ot = calculateOldRegimeTax(salary, deductionsTotal);
    const nt = calculateNewRegimeTax(salary);
    
    let winner = 'EQUAL';
    let savings = 0;
    if (ot > nt) {
      winner = 'NEW';
      savings = ot - nt;
    } else if (nt > ot) {
      winner = 'OLD';
      savings = nt - ot;
    }
    
    return { oldTax: Math.round(ot), newTax: Math.round(nt), winner, savings: Math.round(savings) };
  }, [salary, sec80c, sec80d, hra, homeLoan]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const faqs = [
    {
      question: "What is the difference between Old and New Tax Regime?",
      answer: "The Old Regime allows you to claim deductions like 80C, 80D, HRA, etc., which reduces your taxable income but has higher tax rates. The New Regime offers lower tax rates and a higher standard deduction (₹75k) but does not allow most Chapter VI-A deductions."
    },
    {
      question: "Which regime is better?",
      answer: "It depends on your deductions. If you have significant investments (like EPF, ELSS, Insurance) and pay home loan interest or HRA, the Old Regime might save you more. For those with fewer deductions, the New Regime is generally better."
    },
    {
      question: "What is the 87A rebate?",
      answer: "Under Section 87A, if your taxable income is below a certain threshold, the government gives you a tax rebate. In the New Regime, it makes income up to ₹12.75L effectively tax-free. In the Old Regime, it applies up to ₹5L."
    }
  ];

  return (
    <div className="w-full max-w-5xl">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Income Tax Calculator India: Old vs New Regime</h1>
        <p className="text-slate-500">Calculate exactly which tax regime saves you more money based on standard deductions and rebates.</p>
      </div>

      

      <div className="flex flex-col gap-8">
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Income & Deductions</h2>
          
          <div>
            <label htmlFor="salary" className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
              <span className="flex items-center gap-2"><IndianRupee className="w-4 h-4 text-emerald-600"/> Gross Annual Salary</span>
            </label>
            <input 
              id="salary"
              type="number" 
              min="0"
              value={salary === 0 ? '' : salary} 
              onChange={(e) => setSalary(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-hidden focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="sec80c" className="block text-sm font-semibold text-slate-700 mb-2">Sec 80C (Max 1.5L)</label>
              <input 
                id="sec80c"
                type="number" 
                min="0"
                value={sec80c === 0 ? '' : sec80c} 
                onChange={(e) => setSec80c(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-hidden focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
            <div>
              <label htmlFor="sec80d" className="block text-sm font-semibold text-slate-700 mb-2">Sec 80D (Health)</label>
              <input 
                id="sec80d"
                type="number" 
                min="0"
                value={sec80d === 0 ? '' : sec80d} 
                onChange={(e) => setSec80d(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-hidden focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="hra" className="block text-sm font-semibold text-slate-700 mb-2">HRA Exemption</label>
              <input 
                id="hra"
                type="number" 
                min="0"
                value={hra === 0 ? '' : hra} 
                onChange={(e) => setHra(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-hidden focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
            <div>
              <label htmlFor="homeLoan" className="block text-sm font-semibold text-slate-700 mb-2">Home Loan Int.</label>
              <input 
                id="homeLoan"
                type="number" 
                min="0"
                value={homeLoan === 0 ? '' : homeLoan} 
                onChange={(e) => setHomeLoan(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-hidden focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1"><FileText className="w-3 h-3"/> Standard deduction of ₹50k (Old) / ₹75k (New) is automatically applied.</p>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-6">
          {winner !== 'EQUAL' && savings > 0 && (
            <div className="bg-emerald-100 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center justify-between shadow-xs">
              <span className="font-semibold text-sm uppercase tracking-wider">Recommendation</span>
              <span className="font-bold">{winner} Regime saves you {formatCurrency(savings)}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className={`p-6 rounded-2xl border flex flex-col justify-center transition-all ${winner === 'NEW' ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20' : 'bg-slate-50 border-slate-200'}`}>
              <p className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">New Regime</p>
              <p className="text-3xl font-extrabold text-slate-900">{formatCurrency(newTax)}</p>
              <p className="text-sm font-medium text-red-600 mt-1">-{formatCurrency(Math.round(newTax / 12))} / month</p>
              <p className="text-xs text-slate-400 mt-2">Includes ₹75k Std. Ded.</p>
            </div>
            
            <div className={`p-6 rounded-2xl border flex flex-col justify-center transition-all ${winner === 'OLD' ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20' : 'bg-slate-50 border-slate-200'}`}>
              <p className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Old Regime</p>
              <p className="text-3xl font-extrabold text-slate-900">{formatCurrency(oldTax)}</p>
              <p className="text-sm font-medium text-red-600 mt-1">-{formatCurrency(Math.round(oldTax / 12))} / month</p>
              <p className="text-xs text-slate-400 mt-2">Includes exemptions</p>
            </div>
          </div>
        </div>
      </div>

      
      {/* SEO Content Block */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Optimize Your Tax Liability: Old vs. New Regime</h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          Understanding your total income tax liability and strategically choosing between the Old Tax Regime and the New Tax Regime is one of the most critical financial decisions you make every financial year. Our highly advanced, dual-engine Income Tax Calculator is precisely calibrated to evaluate your gross annual income, standard deductions, and tax-saving investments (such as Section 80C and 80D) against the absolute latest progressive tax slabs mandated by the Government of India. It performs a rigorous, simultaneous calculation of your owed tax, including the mandatory health and education cess, under both regimes. The tool then instantly provides a crystal-clear, side-by-side comparative breakdown, mathematically proving exactly which regime will save you the most money. This empowers salaried employees, freelancers, and business professionals to optimize their tax planning, maximize their take-home pay, and file their returns with absolute confidence. All calculations are executed securely on your local device to ensure maximum financial privacy.
        </p>
      </div>
  
      <AdSlot format="horizontal" slotId="tax-bottom-ad" className="mt-12" />

      <FAQ items={faqs} />
    </div>
  );
}
