'use client';

import { useState, useMemo } from 'react';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { IndianRupee, FileText } from 'lucide-react';

export default function TaxCalculatorPage() {
  const [salary, setSalary] = useState(1200000);
  const [sec80c, setSec80c] = useState(150000);
  const [sec80d, setSec80d] = useState(25000);
  const [hra, setHra] = useState(0);
  const [homeLoan, setHomeLoan] = useState(0);

  const calculateOldRegime = (gross: number, c80: number, d80: number, hraExempt: number, loanInt: number) => {
    const stdDed = 50000;
    const deductions = stdDed + Math.min(150000, c80) + d80 + hraExempt + Math.min(200000, loanInt);
    let taxable = Math.max(0, gross - deductions);
    
    let tax = 0;
    if (taxable > 1000000) {
      tax += (taxable - 1000000) * 0.30;
      taxable = 1000000;
    }
    if (taxable > 500000) {
      tax += (taxable - 500000) * 0.20;
      taxable = 500000;
    }
    if (taxable > 250000) {
      tax += (taxable - 250000) * 0.05;
    }
    
    // Rebate 87A under old regime (up to 5L)
    if (gross - deductions <= 500000) {
      tax = Math.max(0, tax - 12500);
    }
    
    const cess = tax * 0.04;
    return tax + cess;
  };

  const calculateNewRegime = (gross: number) => {
    const stdDed = 75000;
    let taxable = Math.max(0, gross - stdDed);
    const originalTaxable = taxable;
    
    let tax = 0;
    if (taxable > 2400000) { tax += (taxable - 2400000) * 0.30; taxable = 2400000; }
    if (taxable > 2000000) { tax += (taxable - 2000000) * 0.25; taxable = 2000000; }
    if (taxable > 1600000) { tax += (taxable - 1600000) * 0.20; taxable = 1600000; }
    if (taxable > 1200000) { tax += (taxable - 1200000) * 0.15; taxable = 1200000; }
    if (taxable > 800000) { tax += (taxable - 800000) * 0.10; taxable = 800000; }
    if (taxable > 400000) { tax += (taxable - 400000) * 0.05; }
    
    // Rebate up to 12L taxable income
    if (originalTaxable <= 1200000) {
      tax = Math.max(0, tax - 60000);
    }
    
    const cess = tax * 0.04;
    return tax + cess;
  };

  const { oldTax, newTax, winner, savings } = useMemo(() => {
    const ot = calculateOldRegime(salary, sec80c, sec80d, hra, homeLoan);
    const nt = calculateNewRegime(salary);
    
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
    <div className="max-w-4xl mx-auto px-4 w-full">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Income Tax Calculator India: Old vs New Regime</h1>
        <p className="text-slate-500">Calculate exactly which tax regime saves you more money based on standard deductions and rebates.</p>
      </div>

      <AdSlot format="horizontal" slotId="tax-top-ad" className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Income & Deductions</h2>
          
          <div>
            <label className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
              <span className="flex items-center gap-2"><IndianRupee className="w-4 h-4 text-emerald-600"/> Gross Annual Salary</span>
            </label>
            <input 
              type="number" 
              min="0"
              value={salary === 0 ? '' : salary} 
              onChange={(e) => setSalary(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Sec 80C (Max 1.5L)</label>
              <input 
                type="number" 
                min="0"
                value={sec80c === 0 ? '' : sec80c} 
                onChange={(e) => setSec80c(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Sec 80D (Health)</label>
              <input 
                type="number" 
                min="0"
                value={sec80d === 0 ? '' : sec80d} 
                onChange={(e) => setSec80d(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">HRA Exemption</label>
              <input 
                type="number" 
                min="0"
                value={hra === 0 ? '' : hra} 
                onChange={(e) => setHra(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Home Loan Int.</label>
              <input 
                type="number" 
                min="0"
                value={homeLoan === 0 ? '' : homeLoan} 
                onChange={(e) => setHomeLoan(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1"><FileText className="w-3 h-3"/> Standard deduction of ₹50k (Old) / ₹75k (New) is automatically applied.</p>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-6">
          {winner !== 'EQUAL' && savings > 0 && (
            <div className="bg-emerald-100 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center justify-between shadow-sm">
              <span className="font-semibold text-sm uppercase tracking-wider">Recommendation</span>
              <span className="font-bold">{winner} Regime saves you {formatCurrency(savings)}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className={`p-6 rounded-2xl border flex flex-col justify-center transition-all ${winner === 'NEW' ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20' : 'bg-slate-50 border-slate-200'}`}>
              <p className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">New Regime</p>
              <p className="text-3xl font-extrabold text-slate-900">{formatCurrency(newTax)}</p>
              <p className="text-xs text-slate-400 mt-2">Includes ₹75k Std. Ded.</p>
            </div>
            
            <div className={`p-6 rounded-2xl border flex flex-col justify-center transition-all ${winner === 'OLD' ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20' : 'bg-slate-50 border-slate-200'}`}>
              <p className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Old Regime</p>
              <p className="text-3xl font-extrabold text-slate-900">{formatCurrency(oldTax)}</p>
              <p className="text-xs text-slate-400 mt-2">Includes exemptions</p>
            </div>
          </div>
        </div>
      </div>

      <AdSlot format="horizontal" slotId="tax-bottom-ad" className="mt-12" />

      <FAQ items={faqs} />
    </div>
  );
}
