'use client';

import { useState, useEffect } from 'react';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { IndianRupee, Percent, Calendar, Calculator, PiggyBank } from 'lucide-react';

type DepositType = 'FD' | 'RD';

export default function DepositCalculatorPage() {
  const [type, setType] = useState<DepositType>('FD');
  const [principal, setPrincipal] = useState<number | ''>('');
  const [rate, setRate] = useState<number | ''>('');
  const [years, setYears] = useState<number | ''>('');
  const [result, setResult] = useState<{
    invested: number;
    interest: number;
    maturity: number;
  } | null>(null);

  useEffect(() => {
    if (!principal || !rate || !years) {
      setResult(null);
      return;
    }

    const p = Number(principal);
    const r = Number(rate);
    const t = Number(years);

    let invested = 0;
    let maturity = 0;

    if (type === 'FD') {
      invested = p;
      // FD formula with quarterly compounding: M = P * (1 + R/400)^(4*t)
      maturity = p * Math.pow(1 + r / 400, 4 * t);
    } else {
      // RD formula (monthly deposits, quarterly compounding approximation is complex, 
      // standard formula used by most online calculators for monthly compounding):
      // M = P * [ (1+i)^n - 1 ] / i * (1+i) where i = R/1200, n = t*12
      const months = t * 12;
      invested = p * months;
      const i = r / 1200;
      maturity = p * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
    }

    setResult({
      invested: Math.round(invested),
      interest: Math.round(maturity - invested),
      maturity: Math.round(maturity),
    });
  }, [principal, rate, years, type]);

  return (
    <div className="w-full max-w-5xl">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">FD & RD Calculator (Fixed & Recurring Deposit)</h1>
        <p className="text-slate-500">Calculate maturity amounts and total interest earned on your Indian bank deposits.</p>
      </div>

      

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 mb-12 shadow-xs">
        <div className="flex flex-col gap-8">
          <div className="space-y-6">
            
            {/* Type Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setType('FD')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  type === 'FD' 
                    ? 'bg-white text-indigo-700 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Fixed Deposit (FD)
              </button>
              <button
                onClick={() => setType('RD')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  type === 'RD' 
                    ? 'bg-white text-indigo-700 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Recurring Deposit (RD)
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-indigo-500" />
                {type === 'FD' ? 'Total Investment Amount' : 'Monthly Deposit Amount'}
              </label>
              <input type="number" min="0"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value ? Number(e.target.value) : '')}
                placeholder={type === 'FD' ? 'e.g. 100000' : 'e.g. 5000'}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-hidden"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Percent className="w-4 h-4 text-indigo-500" />
                  Interest Rate
                </label>
                <input type="number" min="0"
                  value={rate}
                  onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')}
                  placeholder="e.g. 7.5"
                  step="0.1"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-hidden"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  Time Period (Years)
                </label>
                <input type="number" min="0"
                  value={years}
                  onChange={(e) => setYears(e.target.value ? Number(e.target.value) : '')}
                  placeholder="e.g. 5"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-hidden"
                />
              </div>
            </div>

          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[300px]">
            {result ? (
              <div className="w-full">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6 text-center">Maturity Details</h3>
                
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 text-center">
                  <div className="text-emerald-600 font-medium mb-1">Total Maturity Amount</div>
                  <div className="text-3xl font-extrabold text-emerald-700">₹{result.maturity.toLocaleString('en-IN')}</div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between p-2 rounded-sm hover:bg-white transition-colors">
                    <span className="text-slate-600">Total Investment</span>
                    <span className="font-medium text-slate-900">₹{result.invested.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-sm hover:bg-white transition-colors">
                    <span className="text-slate-600">Total Interest Earned</span>
                    <span className="font-medium text-emerald-600">+ ₹{result.interest.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400">
                <PiggyBank className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Enter your deposit details to see the returns.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      
      {/* SEO Content Block */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Master Your Savings with Precision</h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          Planning your long-term savings strategy is absolutely crucial for achieving financial stability and building wealth. Our comprehensive Deposit Calculator precisely models the projected growth of both Fixed Deposits (FD) and Recurring Deposits (RD) based on standard banking formulas used worldwide, including strict Indian banking standards. It automatically factors in the complex mathematics of quarterly compounding interest for Fixed Deposits, and flawlessly applies the Future Value of Annuity Due formulas for Recurring Deposits. By providing a crystal-clear, intuitive breakdown of your total invested principal versus your estimated interest earnings over time, this sophisticated tool empowers you to make highly informed, strategic wealth-building decisions. You can experiment with varying interest rates, different tenure lengths, and monthly contribution amounts to visualize exactly how your money will compound. Best of all, this calculation happens instantly and securely on your own device, ensuring your sensitive financial planning data remains entirely private and protected from third-party tracking.
        </p>
      </div>
  
      <AdSlot format="horizontal" slotId="deposit-bottom-ad" className="mb-12" />

      <FAQ 
        items={[
          {
            question: "What is the difference between FD and RD?",
            answer: "A Fixed Deposit (FD) is a one-time lump sum investment made for a specific period. A Recurring Deposit (RD) allows you to deposit a fixed amount every month for a specific period. Both offer guaranteed returns."
          },
          {
            question: "How is Fixed Deposit interest calculated?",
            answer: "In India, most banks compound Fixed Deposit interest quarterly. This means the interest earned in the first quarter is added to the principal, and you earn interest on the new total in the next quarter."
          },
          {
            question: "Are FD and RD returns taxable?",
            answer: "Yes, the interest earned from both FDs and RDs is fully taxable according to your income tax slab. Banks may also deduct TDS (Tax Deducted at Source) if the interest exceeds ₹40,000 per year (₹50,000 for senior citizens)."
          }
        ]}
      />
    </div>
  );
}
