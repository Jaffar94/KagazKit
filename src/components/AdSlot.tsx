'use client';

import { useEffect, useRef } from 'react';

type AdSlotProps = {
  format?: 'horizontal' | 'display';
  slotId?: string;
  className?: string;
};

export default function AdSlot({ format = 'horizontal', slotId = '1234567890', className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  
  useEffect(() => {
    // Attempt to push ad to Google AdSense. In development, this does nothing but visually simulates the space.
    try {
      if (typeof window !== 'undefined') {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
      }
    } catch (err) {
      console.error('AdSense error', err);
    }
  }, []);

  // Determine minimum height based on format to prevent CLS
  const minHeightClass = format === 'horizontal' ? 'min-h-[90px]' : 'min-h-[250px]';

  return (
    <div className={`w-full relative overflow-hidden flex justify-center items-center bg-slate-50 rounded-xl border border-dashed border-slate-200 my-8 ${minHeightClass} ${className}`}>
      {/* Dev placeholder text to show where the ad will appear */}
      <span className="text-xs text-slate-400 uppercase tracking-widest font-medium absolute z-0">Advertisement</span>
      
      {/* Actual AdSense Tag */}
      <ins
        ref={adRef}
        className="adsbygoogle z-10"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client="ca-pub-3593243970022857"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
