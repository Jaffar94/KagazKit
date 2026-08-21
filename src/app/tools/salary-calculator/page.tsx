'use client';

import { useState } from 'react';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { IndianRupee, Briefcase, Calculator, Settings2 } from 'lucide-react';
import { calculateOldRegimeTax, calculateNewRegimeTax } from '@/utils/tax';

export default function SalaryCalculatorPage() {
  const [ctc, setCtc] = useState<number | ''>('');
  const [bonus, setBonus] = useState<number | ''>('');
  const [taxRegime, setTaxRegime] = useState<'NEW' | 'OLD'>('NEW');
  const [taxDeductions, setTaxDeductions] = useState<number | ''>('');
  const [result, setResult] = useState<{
    monthlyInHand: number;
    annualInHand: number;
    basic: number;
    hra: number;
    specialAllowance: number;
    pf: number;
    pt: number;
    tax: number;
  } | null>(null);

  const calculateSalary = () => {
    if (!ctc) return;

    const annualCtc = Number(ctc);
    const annualBonus = Number(bonus) || 0;
    
    // Standard Indian salary structure assumptions
    const baseFixed = annualCtc - annualBonus;
    
    // Basic is typically 50% of fixed CTC
    const annualBasic = baseFixed * 0.5;
    
    // HRA is typically 50% of Basic for metro cities
    const annualHra = annualBasic * 0.5;
    
    // PF is 12% of Basic (both Employer and Employee contributions are part of CTC often, 
    // but here we calculate Employee deduction from gross)
    // Employer PF (12% of Basic)
    const employerPf = annualBasic * 0.12;
    
    // Gross Salary = Fixed CTC - Employer PF
    const annualGross = baseFixed - employerPf;
    
    // Special Allowance is the remainder
    const annualSpecial = annualGross - annualBasic - annualHra;
    
    // Employee Deductions
    const employeePf = annualBasic * 0.12;
    const professionalTax = 2500; // Standard approx annual PT

    // Income Tax Calculation
    const taxableGross = annualCtc - employerPf; // Total gross income before tax
    let annualTax = 0;
    if (taxRegime === 'NEW') {
      annualTax = calculateNewRegimeTax(taxableGross);
    } else {
      const deductions = Number(taxDeductions) || 0;
      annualTax = calculateOldRegimeTax(taxableGross, deductions);
    }
    
    // Net In Hand
    const annualInHand = annualGross + annualBonus - employeePf - professionalTax - annualTax;
    
    setResult({
      monthlyInHand: Math.round(annualInHand / 12),
      annualInHand: Math.round(annualInHand),
      basic: Math.round(annualBasic / 12),
      hra: Math.round(annualHra / 12),
      specialAllowance: Math.round(annualSpecial / 12),
      pf: Math.round(employeePf / 12),
      pt: Math.round(professionalTax / 12),
      tax: Math.round(annualTax / 12)
    });
  };

  return (
    <div className="w-full max-w-5xl">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">In-Hand Salary Calculator India</h1>
        <p className="text-slate-500">Calculate your exact monthly take-home pay based on your CTC, PF, and Professional Tax.</p>
      </div>

      

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 mb-12 shadow-xs">
        <div className="flex flex-col gap-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="ctc" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-500" />
                Annual CTC (₹)
              </label>
              <input id="ctc" type="number" min="0"
                value={ctc}
                onChange={(e) => setCtc(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 1200000"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-hidden"
              />
            </div>
            
            <div>
              <label htmlFor="bonus" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-indigo-500" />
                Annual Bonus / Variable (₹) - Optional
              </label>
              <input id="bonus" type="number" min="0"
                value={bonus}
                onChange={(e) => setBonus(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 100000"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-hidden"
              />
            </div>

            <div className="pt-4 border-t border-slate-200/80">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-slate-500" />
                Tax Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tax Regime</label>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button 
                      onClick={() => setTaxRegime('NEW')}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${taxRegime === 'NEW' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      New Regime
                    </button>
                    <button 
                      onClick={() => setTaxRegime('OLD')}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${taxRegime === 'OLD' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Old Regime
                    </button>
                  </div>
                </div>

                {taxRegime === 'OLD' && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label htmlFor="taxDeductions" className="block text-sm font-semibold text-slate-700 mb-2">
                      Total Tax Deductions (80C, 80D, HRA etc.)
                    </label>
                    <input id="taxDeductions" type="number" min="0"
                      value={taxDeductions}
                      onChange={(e) => setTaxDeductions(e.target.value ? Number(e.target.value) : '')}
                      placeholder="e.g. 150000"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-hidden"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={calculateSalary}
              disabled={!ctc}
              className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Calculate Salary
            </button>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[350px]">
            {result ? (
              <div className="w-full">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6 text-center">Estimated Breakdown (Monthly)</h3>
                
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 text-center">
                  <div className="text-emerald-600 font-medium mb-1">Monthly In-Hand Salary</div>
                  <div className="text-3xl font-extrabold text-emerald-700">₹{result.monthlyInHand.toLocaleString('en-IN')}</div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between p-2 rounded-sm hover:bg-white transition-colors">
                    <span className="text-slate-600">Basic Salary</span>
                    <span className="font-medium text-slate-900">₹{result.basic.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-sm hover:bg-white transition-colors">
                    <span className="text-slate-600">HRA</span>
                    <span className="font-medium text-slate-900">₹{result.hra.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-sm hover:bg-white transition-colors">
                    <span className="text-slate-600">Special Allowance</span>
                    <span className="font-medium text-slate-900">₹{result.specialAllowance.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-t border-slate-200 my-2"></div>
                  <div className="flex justify-between p-2 rounded-sm hover:bg-white transition-colors text-red-600">
                    <span>Provident Fund (PF)</span>
                    <span className="font-medium">- ₹{result.pf.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-sm hover:bg-white transition-colors text-red-600">
                    <span>Professional Tax (PT)</span>
                    <span className="font-medium">- ₹{result.pt.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-sm hover:bg-white transition-colors text-red-600">
                    <span>Income Tax (TDS)</span>
                    <span className="font-medium">- ₹{result.tax.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400">
                <IndianRupee className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Enter your CTC to see the breakdown.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      
      {/* SEO Content Block */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Accurate CTC Breakdown and Take-Home Pay Analysis</h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          Understanding the massive difference between your official Cost to Company (CTC) and the actual money that hits your bank account every month is absolutely crucial for job seekers, employees negotiating raises, and financial planners across India. Our advanced In-Hand Salary Calculator is meticulously designed to instantly demystify your paycheck by providing a highly accurate, granular breakdown of your entire compensation package. By simply inputting your annual CTC, the tool automatically calculates the standard components including Basic Pay, House Rent Allowance (HRA), and Special Allowances. It then precisely deducts standard professional taxes, mandatory Employees' Provident Fund (EPF) contributions for both the employee and employer shares, and estimates your monthly income tax liability based on the latest tax slabs. This provides you with an incredibly clear, reliable projection of your actual monthly take-home pay. All of these complex financial calculations are performed entirely locally on your device, guaranteeing that your personal salary figures remain 100% private.
        </p>
      </div>
  
      <AdSlot format="horizontal" slotId="salary-bottom-ad" className="mb-12" />

      <FAQ 
        items={[
          {
            question: "How is In-Hand Salary calculated from CTC?",
            answer: "CTC (Cost to Company) includes your direct salary plus company contributions like Employer PF. To calculate your in-hand salary, we deduct Employer PF to find your Gross Salary, and then deduct Employee PF and Professional Tax to arrive at your Net Take-Home Salary."
          },
          {
            question: "Why is my Basic Salary exactly 50% of my CTC?",
            answer: "In India, most standard corporate payroll structures set Basic Salary at 50% of the fixed CTC to optimize tax benefits and comply with labor laws regarding Provident Fund contributions."
          },
          {
            question: "Does this tool calculate Income Tax (TDS)?",
            answer: "This is a base salary breakdown. Income Tax (TDS) depends on your chosen tax regime (Old vs New) and your personal investments under section 80C. You can use our dedicated Income Tax Calculator for exact TDS figures."
          }
        ]}
      />
    </div>
  );
}
