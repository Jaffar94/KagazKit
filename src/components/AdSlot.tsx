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

  // Determine height constraints based on format to prevent CLS and vertical stretching
  // Using !important (!) in tailwind to prevent AdSense from overriding the container height
  const heightClass = format === 'horizontal' 
    ? '!min-h-[90px] !max-h-[90px] md:!max-h-[120px]' 
    : '!min-h-[250px]';

  return (
    <div key={pathname} className={`w-full relative overflow-hidden flex justify-center items-center bg-slate-50 rounded-xl border border-dashed border-slate-200 my-8 ${heightClass} ${className}`}>
      {/* Dev placeholder text to show where the ad will appear */}
      <span className="text-xs text-slate-400 uppercase tracking-widest font-medium absolute z-0">Advertisement</span>
      
      {/* Actual AdSense Tag */}
      <ins
        ref={adRef}
        className="adsbygoogle z-10"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client="ca-pub-5764631499636026"
        data-ad-slot={slotId}
        data-ad-format={format === 'horizontal' ? 'horizontal' : 'auto'}
        data-full-width-responsive="true"
      />
    </div>
  );
}
