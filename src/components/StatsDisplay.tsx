'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { getStats } from '@/utils/stats';

export default function StatsDisplay() {
  const [downloads, setDownloads] = useState<number | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isMounted = true;

    const fetchStats = async () => {
      const data = await getStats();
      if (!isMounted) return;
      
      if (data && typeof data.downloads === 'number') {
        setDownloads(data.downloads);
      } else {
        // If it fails or returns null, wait 5 seconds and retry
        timeoutId = setTimeout(fetchStats, 5000);
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  if (downloads === null) {
    return (
      <div className="flex justify-center mt-6">
        <div className="h-10 bg-slate-100 rounded-full px-6 border border-slate-200 flex items-center justify-center animate-pulse">
          <span className="text-slate-400 text-sm font-medium">Loading stats...</span>
        </div>
      </div>
    );
  }

  // Format number nicely (e.g., 12,543)
  const formattedCount = new Intl.NumberFormat('en-US').format(downloads);

  return (
    <div className="flex justify-center mt-6">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50/50 border border-indigo-100/50 rounded-full text-indigo-700 text-sm font-medium shadow-xs hover:scale-105 transition-transform duration-300">
        <div className="bg-indigo-100 p-1.5 rounded-full">
          <Download className="w-3.5 h-3.5 text-indigo-600" />
        </div>
        <span>
          <strong className="font-bold">{formattedCount}</strong> Files Processed & Downloaded
        </span>
      </div>
    </div>
  );
}
