'use client';

import { useState, useMemo } from 'react';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { IndianRupee, TrendingDown, Calendar, ArrowRight } from 'lucide-react';

export default function LoanPrepaymentPage() {
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [extraEmi, setExtraEmi] = useState(5000);

  const results = useMemo(() => {
    const p = principal;
    const r = rate / 12 / 100;
    const n = years * 12;

    if (p <= 0 || n <= 0 || r < 0) return null;

    // Normal EMI
    let emi = 0;
    let normalTotalInterest = 0;
    if (r === 0) {
      emi = p / n;
      normalTotalInterest = 0;
    } else {
      emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      normalTotalInterest = (emi * n) - p;
    }

    // Prepayment Amortization Simulation
    let remainingPrincipal = p;
    let prepayTotalInterest = 0;
    let monthsTaken = 0;

    while (remainingPrincipal > 0 && monthsTaken < n) {
      const interestForMonth = remainingPrincipal * r;
      prepayTotalInterest += interestForMonth;
      
      const principalPaid = emi - interestForMonth + extraEmi;
      
      if (remainingPrincipal < principalPaid) {
        remainingPrincipal = 0;
      } else {
        remainingPrincipal -= principalPaid;
      }
      monthsTaken++;
    }

    const interestSaved = normalTotalInterest - prepayTotalInterest;
    const monthsSaved = n - monthsTaken;

    return {
      emi: Math.round(emi),
      normalInterest: Math.round(normalTotalInterest),
      prepayInterest: Math.round(prepayTotalInterest),
      interestSaved: Math.round(interestSaved),
      newTenureYears: Math.floor(monthsTaken / 12),
      newTenureMonths: monthsTaken % 12,
      timeSavedYears: Math.floor(monthsSaved / 12),
      timeSavedMonths: monthsSaved % 12,
    };
  }, [principal, rate, years, extraEmi]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const faqs = [
    {
      question: "What is loan prepayment?",
      answer: "Loan prepayment means paying an extra amount towards your loan principal on top of your regular monthly EMI. This directly reduces your outstanding principal, which in turn slashes the interest charged in subsequent months."
    },
    {
      question: "Are there any charges for prepaying a loan?",
      answer: "In India, the RBI has mandated that banks cannot charge prepayment or foreclosure penalties on floating rate home loans for individual borrowers. However, for personal loans or fixed-rate loans, banks may charge a prepayment penalty of 2% to 5%."
    },
    {
      question: "Why does a small extra payment make such a big difference?",
      answer: "Because of compound interest. When you pay extra, 100% of that extra payment goes toward reducing your principal. Over a 20-year loan, reducing your principal early prevents years of compounding interest from accumulating on that amount."
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Loan Prepayment Calculator</h1>
        <p className="text-slate-500">Discover how much interest and time you can save by paying just a little bit extra each month.</p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="space-y-6">
            <div>
              <label htmlFor="lp-principal" className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                <span className="flex items-center gap-2"><IndianRupee className="w-4 h-4 text-indigo-600"/> Outstanding Principal</span>
                <span>{formatCurrency(principal)}</span>
              </label>
              <input 
                id="lp-principal"
                type="range" min="100000" max="50000000" step="100000" 
                value={principal} onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                className="w-full accent-indigo-600"
              />
            </div>
            
            <div>
              <label htmlFor="lp-rate" className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                <span className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-indigo-600"/> Interest Rate (%)</span>
                <span>{rate}%</span>
              </label>
              <input 
                id="lp-rate"
                type="range" min="0" max="20" step="0.1" 
                value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <label htmlFor="lp-years" className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-indigo-600"/> Remaining Tenure (Years)</span>
                <span>{years} Yrs</span>
              </label>
              <input 
                id="lp-years"
                type="range" min="1" max="30" step="1" 
                value={years} onChange={(e) => setYears(Number(e.target.value) || 0)}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label htmlFor="lp-extra" className="flex justify-between text-sm font-bold text-emerald-700 mb-2">
                <span>Extra Monthly Payment</span>
                <span>{formatCurrency(extraEmi)}</span>
              </label>
              <input 
                id="lp-extra"
                type="range" min="0" max="50000" step="1000" 
                value={extraEmi} onChange={(e) => setExtraEmi(Number(e.target.value) || 0)}
                className="w-full accent-emerald-500"
              />
              <p className="text-xs text-slate-500 mt-2">Amount you will pay every month *in addition* to your base EMI.</p>
            </div>
          </div>
        </div>

        {results && (
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
                <p className="text-sm font-medium text-slate-500 mb-1">Base Monthly EMI</p>
                <p className="text-2xl font-bold text-slate-800">{formatCurrency(results.emi)}</p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                <p className="text-sm font-medium text-indigo-600 mb-1">New Total Monthly Payment</p>
                <p className="text-2xl font-bold text-indigo-700">{formatCurrency(results.emi + extraEmi)}</p>
              </div>
            </div>

            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-200 text-center relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-emerald-800 mb-2">Massive Savings Unlocked!</h3>
                <p className="text-sm text-emerald-600 font-medium mb-6">By paying just {formatCurrency(extraEmi)} extra per month, you will save:</p>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <div>
                    <p className="text-5xl font-black text-emerald-600 mb-1">{formatCurrency(results.interestSaved)}</p>
                    <p className="text-sm font-bold text-emerald-800/60 uppercase tracking-wide">In Interest</p>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-emerald-200"></div>
                  <div>
                    <p className="text-4xl font-black text-emerald-600 mb-1">
                      {results.timeSavedYears > 0 ? `${results.timeSavedYears} Yrs ` : ''}
                      {results.timeSavedMonths > 0 ? `${results.timeSavedMonths} Mos` : ''}
                      {results.timeSavedYears === 0 && results.timeSavedMonths === 0 ? '0 Mos' : ''}
                    </p>
                    <p className="text-sm font-bold text-emerald-800/60 uppercase tracking-wide">In Time</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 text-sm">
              <h4 className="font-bold text-slate-800 mb-4">Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Original Total Interest</span>
                  <span className="font-semibold text-slate-700">{formatCurrency(results.normalInterest)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-500">New Total Interest</span>
                  <span className="font-semibold text-emerald-600">{formatCurrency(results.prepayInterest)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Original Tenure</span>
                  <span className="font-semibold text-slate-700">{years} Years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">New Tenure</span>
                  <span className="font-semibold text-emerald-600">{results.newTenureYears} Yrs, {results.newTenureMonths} Mos</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* SEO Content Block */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Optimize Your Debt with Strategic Prepayments</h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          One of the most effective strategies for achieving financial freedom is aggressively paying down high-interest debt, such as a 20-year home mortgage or a long-term vehicle loan. Our sophisticated Loan Prepayment Calculator is designed to show you exactly how making periodic part-payments, or permanently increasing your monthly EMI, can dramatically reduce your overall interest burden and shave years off your loan tenure. By inputting your outstanding principal, current interest rate, and remaining months, you can model various prepayment scenarios to see the exact financial impact. The tool generates a clear, side-by-side comparison of your original loan trajectory versus your accelerated repayment plan, displaying the massive thousands of rupees you will save in pure interest. Because your specific financial debt figures are highly private, this calculator executes all complex amortization algorithms entirely on your local device. Your data is never uploaded, recorded, or analyzed by our servers, granting you a completely secure environment to strategize your path to becoming debt-free.
        </p>
      </div>

      <AdSlot format="horizontal" slotId="loan-prepayment-bottom-ad" className="mb-12" />

      <FAQ items={faqs} />
    </div>
  );
}
