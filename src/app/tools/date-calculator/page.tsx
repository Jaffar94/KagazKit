'use client';

import { useState } from 'react';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { Calendar, Clock, Calculator } from 'lucide-react';

export default function DateCalculatorPage() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [includeEnd, setIncludeEnd] = useState<boolean>(false);
  const [result, setResult] = useState<{
    totalDays: number;
    years: number;
    months: number;
    days: number;
    totalWeeks: number;
    remainingDays: number;
  } | null>(null);

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const d1 = new Date(startDate);
    const d2 = new Date(endDate);

    // Swap if start is after end
    const start = d1 < d2 ? d1 : d2;
    const end = d1 < d2 ? d2 : d1;

    // Total days calculation
    const diffTime = Math.abs(end.getTime() - start.getTime());
    let totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (includeEnd) {
      totalDays += 1;
    }

    // Years, Months, Days breakdown
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (includeEnd) {
      days += 1;
    }

    if (days < 0) {
      months -= 1;
      const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    setResult({ totalDays, years, months, days, totalWeeks, remainingDays });
  };

  return (
    <div className="w-full max-w-5xl">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Days Between Two Dates Calculator</h1>
        <p className="text-slate-500">Calculate the exact duration between any two dates in days, weeks, months, and years.</p>
      </div>

      

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 mb-12 shadow-xs">
        <div className="flex flex-col gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" />
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-hidden"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" />
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-hidden"
              />
            </div>

            <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={includeEnd}
                onChange={(e) => setIncludeEnd(e.target.checked)}
                className="w-5 h-5 text-indigo-600 rounded-sm border-slate-300 focus:ring-indigo-600"
              />
              <span className="text-sm font-medium text-slate-700">Include end date in calculation (add 1 day)</span>
            </label>

            <button
              onClick={calculateDifference}
              disabled={!startDate || !endDate}
              className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Calculate Duration
            </button>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[300px]">
            {result ? (
              <div className="w-full text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Duration</h3>
                <div className="text-4xl font-extrabold text-slate-900 mb-6">
                  {result.totalDays} <span className="text-xl font-medium text-slate-500">Days</span>
                </div>
                
                <div className="space-y-3 text-sm text-left bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Years, Months, Days</span>
                    <span className="font-medium text-slate-800">{result.years}y, {result.months}m, {result.days}d</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Weeks & Days</span>
                    <span className="font-medium text-slate-800">{result.totalWeeks} weeks, {result.remainingDays} days</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Select two dates to calculate the difference.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      
      {/* SEO Content Block */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Understanding the Date Calculator</h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          The KagazKit Date Calculator allows you to effortlessly add or subtract days, weeks, months, or years from any given starting date. It automatically accounts for leap years and varying month lengths, ensuring perfect mathematical precision. Whether you are planning a project timeline, tracking a pregnancy due date, or calculating a legal deadline, this client-side tool provides instant, accurate results without ever storing your calendar data on external servers.
        </p>
      </div>
  
      <AdSlot format="horizontal" slotId="date-bottom-ad" className="mb-12" />

      <FAQ 
        items={[
          {
            question: "Why would I include the end date?",
            answer: "By default, calendar math counts the number of midnights between two dates. For example, Monday to Tuesday is 1 day. If you are calculating the total duration of a 2-day event that runs all Monday and all Tuesday, you need to 'include the end date' to get 2 days."
          },
          {
            question: "Does this tool account for leap years?",
            answer: "Yes, our calculator automatically accounts for leap years and the varying number of days in different months (28, 29, 30, or 31) because it relies on accurate native browser date parsing."
          }
        ]}
      />
    </div>
  );
}
