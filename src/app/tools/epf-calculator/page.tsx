'use client';

import { useState, useMemo } from 'react';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { IndianRupee, User, Wallet, TrendingUp } from 'lucide-react';

export default function EPFCalculatorPage() {
  const [basicPay, setBasicPay] = useState(25000);
  const [currentAge, setCurrentAge] = useState(25);
  const [retirementAge, setRetirementAge] = useState(58);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [salaryIncrement, setSalaryIncrement] = useState(10);

  const epfInterestRate = 8.25;

  const results = useMemo(() => {
    let totalEmployeeContribution = 0;
    let totalEmployerContribution = 0;
    let corpus = currentBalance;
    let currentBasic = basicPay;

    const yearsToRetire = Math.max(0, retirementAge - currentAge);

    for (let year = 1; year <= yearsToRetire; year++) {
      let yearlyEmployee = 0;
      let yearlyEmployer = 0;

      for (let month = 1; month <= 12; month++) {
        const employeeContribution = currentBasic * 0.12;
        const employerContribution = currentBasic * 0.0367; // 3.67% goes to EPF, 8.33% to EPS (capped)
        
        yearlyEmployee += employeeContribution;
        yearlyEmployer += employerContribution;
        
        // EPF interest is calculated monthly but credited yearly.
        // For simplicity in estimation, we add the monthly contributions and apply interest at year end.
        corpus += employeeContribution + employerContribution;
      }

      totalEmployeeContribution += yearlyEmployee;
      totalEmployerContribution += yearlyEmployer;
      
      // Apply yearly compound interest
      const interestEarned = (corpus * epfInterestRate) / 100;
      corpus += interestEarned;

      // Annual increment
      currentBasic = currentBasic + (currentBasic * salaryIncrement) / 100;
    }

    const totalInvested = totalEmployeeContribution + totalEmployerContribution + currentBalance;
    const totalInterest = Math.max(0, corpus - totalInvested);

    return {
      invested: Math.round(totalInvested),
      interest: Math.round(totalInterest),
      total: Math.round(corpus),
    };
  }, [basicPay, currentAge, retirementAge, currentBalance, salaryIncrement]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const faqs = [
    {
      question: "How is EPF calculated?",
      answer: "Every month, 12% of your Basic + DA goes into your EPF account as your contribution. Your employer also contributes 12%, out of which 3.67% goes to EPF and 8.33% goes to EPS (Pension Scheme)."
    },
    {
      question: "What is the current EPF interest rate?",
      answer: "The current EPF interest rate is usually declared by the EPFO annually. It has recently hovered around 8.15% to 8.25%. This calculator uses 8.25%."
    },
    {
      question: "Is this calculator exact?",
      answer: "This is an estimator. Actual EPF calculations involve monthly closing balances and complex decimal roundings by EPFO. This tool provides a very close approximation for retirement planning."
    }
  ];

  return (
    <div className="w-full max-w-5xl">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">EPF Calculator India & PF Balance Estimator</h1>
        <p className="text-slate-500">Calculate your Provident Fund maturity value, PF interest, and check employer vs employee contributions.</p>
      </div>

      

      <div className="flex flex-col gap-8">
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
          <div>
            <label className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
              <span className="flex items-center gap-2"><IndianRupee className="w-4 h-4 text-indigo-600"/> Basic + DA (Monthly)</span>
            </label>
            <input type="number" min="0" 
              value={basicPay === 0 ? '' : basicPay} 
              onChange={(e) => setBasicPay(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-hidden focus:ring-2 focus:ring-indigo-600/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                <span className="flex items-center gap-2"><User className="w-4 h-4 text-indigo-600"/> Current Age</span>
              </label>
              <input type="number" min="0" 
                value={currentAge === 0 ? '' : currentAge} 
                onChange={(e) => setCurrentAge(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-hidden focus:ring-2 focus:ring-indigo-600/20"
              />
            </div>
            <div>
              <label className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                <span className="flex items-center gap-2"><User className="w-4 h-4 text-indigo-600"/> Retire Age</span>
              </label>
              <input type="number" min="0" 
                value={retirementAge === 0 ? '' : retirementAge} 
                onChange={(e) => setRetirementAge(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-hidden focus:ring-2 focus:ring-indigo-600/20"
              />
            </div>
          </div>

          <div>
            <label className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
              <span className="flex items-center gap-2"><Wallet className="w-4 h-4 text-indigo-600"/> Current EPF Balance</span>
            </label>
            <input type="number" min="0" 
              value={currentBalance === 0 ? '' : currentBalance} 
              onChange={(e) => setCurrentBalance(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-hidden focus:ring-2 focus:ring-indigo-600/20"
            />
          </div>

          <div>
            <label className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
              <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-indigo-600"/> Annual Increment (%)</span>
              <span>{salaryIncrement}%</span>
            </label>
            <input 
              type="range" min="0" max="20" step="1" 
              value={salaryIncrement} onChange={(e) => setSalaryIncrement(Number(e.target.value) || 0)}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center gap-4">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
            <p className="text-sm font-medium text-slate-500 mb-1">Total Invested (Self + Employer + Current)</p>
            <p className="text-2xl font-bold text-slate-800">{formatCurrency(results.invested)}</p>
          </div>
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
            <p className="text-sm font-medium text-emerald-600 mb-1">Total Compound Interest</p>
            <p className="text-2xl font-bold text-emerald-700">+{formatCurrency(results.interest)}</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
            <p className="text-sm font-medium text-purple-600 mb-1">Final EPF Corpus</p>
            <p className="text-4xl font-extrabold text-purple-700">{formatCurrency(results.total)}</p>
          </div>
        </div>
      </div>

      
      {/* SEO Content Block */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Calculating Your EPF Corpus</h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          The Employees' Provident Fund (EPF) is one of the most powerful retirement saving vehicles in India. Our EPF Calculator accurately projects your final retirement corpus by factoring in both employee and employer contributions, alongside the prevailing government-mandated interest rate. It elegantly models the power of long-term compounding and salary growth, giving you a realistic and highly private estimation of your financial security upon retirement.
        </p>
      </div>
  
      <AdSlot format="horizontal" slotId="epf-bottom-ad" className="mt-12" />

      <FAQ items={faqs} />
    </div>
  );
}
