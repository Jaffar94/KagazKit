'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type AdSlotProps = {
  format?: 'horizontal' | 'display';
  slotId?: string;
  className?: string;
};

export default function AdSlot({ format = 'horizontal', slotId = '3809487681', className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pathname = usePathname();
  
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
  }, [pathname]);

  const isHorizontal = format === 'horizontal';
  const adHeight = isHorizontal ? '90px' : '250px';

  return (
    <div key={pathname} className={`w-full relative overflow-hidden flex justify-center items-center bg-slate-50 rounded-xl border border-dashed border-slate-200 my-8 ${className}`} style={{ height: adHeight }}>
      {/* Dev placeholder text to show where the ad will appear */}
      <span className="text-xs text-slate-400 uppercase tracking-widest font-medium absolute z-0">Advertisement</span>
      
      {/* Actual AdSense Tag */}
      <ins
        ref={adRef}
        className="adsbygoogle z-10"
        style={{ display: 'inline-block', width: '100%', height: adHeight }}
        data-ad-client="ca-pub-5764631499636026"
        data-ad-slot={slotId}
        data-ad-format={isHorizontal ? 'horizontal' : 'auto'}
        data-full-width-responsive={isHorizontal ? "false" : "true"}
      />
    </div>
  );
}
