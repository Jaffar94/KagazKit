'use client';

import { useState } from 'react';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { IndianRupee, Briefcase, Calculator } from 'lucide-react';

export default function SalaryCalculatorPage() {
  const [ctc, setCtc] = useState<number | ''>('');
  const [bonus, setBonus] = useState<number | ''>('');
  const [result, setResult] = useState<{
    monthlyInHand: number;
    annualInHand: number;
    basic: number;
    hra: number;
    specialAllowance: number;
    pf: number;
    pt: number;
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
    
    // Net In Hand
    const annualInHand = annualGross - employeePf - professionalTax;
    
    setResult({
      monthlyInHand: Math.round(annualInHand / 12),
      annualInHand: Math.round(annualInHand),
      basic: Math.round(annualBasic / 12),
      hra: Math.round(annualHra / 12),
      specialAllowance: Math.round(annualSpecial / 12),
      pf: Math.round(employeePf / 12),
      pt: Math.round(professionalTax / 12)
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
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-500" />
                Annual CTC (₹)
              </label>
              <input type="number" min="0"
                value={ctc}
                onChange={(e) => setCtc(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 1200000"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-hidden"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-indigo-500" />
                Annual Bonus / Variable (₹) - Optional
              </label>
              <input type="number" min="0"
                value={bonus}
                onChange={(e) => setBonus(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 100000"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-hidden"
              />
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
        <h2 className="text-xl font-bold text-slate-800 mb-4">Understanding Your Take-Home Pay</h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          Decoding a complex CTC (Cost to Company) offer letter can be confusing. Our Salary Calculator elegantly breaks down your gross salary into actionable insights. By estimating common deductions like PF, Professional Tax, and standard allowances, it provides a highly accurate projection of your actual monthly take-home pay. This tool is indispensable for professionals evaluating new job offers or planning their monthly budgets.
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
