'use client';

import { useState } from 'react';
import AdSlot from '@/components/AdSlot';
import ToolContentSection from '@/components/ToolContentSection';
import BackToHome from '@/components/BackToHome';
import { Calendar, User, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AgeCalculatorPage() {
  const [dob, setDob] = useState<string>('');
  const [cutoffDate, setCutoffDate] = useState<string>('');
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!dob || !cutoffDate) return;

    const d1 = new Date(dob);
    const d2 = new Date(cutoffDate);

    if (d1 > d2) {
      toast.error('Date of Birth cannot be after the Cutoff Date!');
      return;
    }

    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();

    if (days < 0) {
      months -= 1;
      const previousMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setResult({ years, months, days });
  };

  return (
    <div className="w-full max-w-5xl">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Govt Exam Age Calculator</h1>
        <p className="text-slate-500">Calculate your exact age in years, months, and days for exam forms.</p>
      </div>

      

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 mb-12 shadow-xs">
        <div className="flex flex-col gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-500" />
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-hidden"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" />
                Age As Of (Cutoff Date)
              </label>
              <input
                type="date"
                value={cutoffDate}
                onChange={(e) => setCutoffDate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-hidden"
              />
              <p className="text-xs text-slate-500 mt-2">The specific date mentioned in the exam notification.</p>
            </div>

            <button
              onClick={calculateAge}
              disabled={!dob || !cutoffDate}
              className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate Exact Age
            </button>
          </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[250px]">
              {result ? (
                <div className="text-center w-full">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Your Exact Age</h3>
                  <div className="text-4xl font-extrabold text-slate-900 mb-4">
                    {result.years} <span className="text-xl font-medium text-slate-500">Years</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-slate-700 text-lg font-medium bg-white px-4 py-3 rounded-lg border border-slate-200 shadow-xs inline-flex">
                    <span>{result.months} Months</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>{result.days} Days</span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-400">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>Enter your details to calculate.</p>
                </div>
              )}
            </div>
        </div>
      </div>
      <AdSlot format="horizontal" slotId="age-bottom-ad" className="mb-12" />

      <ToolContentSection toolId="age-calculator" />
    </div>
  );
}
