'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type AdSlotProps = {
  format?: 'horizontal' | 'display' | 'vertical';
  slotId?: string;
  className?: string;
};

export default function AdSlot({ format = 'horizontal', slotId = '3809487681', className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pathname = usePathname();

  // Allow disabling all ads via environment variable (for AdSense resubmission)
  if (process.env.NEXT_PUBLIC_ADS_ENABLED === 'false') {
    return null;
  }
  
  useEffect(() => {
    // Attempt to push ad to Google AdSense. 
    // We use a small timeout to ensure the DOM layout is fully settled after Next.js client-side navigation.
    // This prevents AdSense from calculating the wrong container width and serving a narrow 320px ad.
    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && adRef.current) {
          // Only push if the element is actually visible (has width). 
          // This prevents the "No slot size for availableWidth=0" error on hidden sidebar ads.
          const isVisible = adRef.current.offsetWidth > 0 || (adRef.current.parentElement?.offsetWidth || 0) > 0;
          if (!adRef.current.getAttribute('data-adsbygoogle-status') && isVisible) {
            const adsbygoogle = (window as any).adsbygoogle || [];
            adsbygoogle.push({});
          }
        }
      } catch (err) {
        console.error('AdSense error', err);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  const isHorizontal = format === 'horizontal';
  const isVertical = format === 'vertical';
  const adHeight = isVertical ? '600px' : isHorizontal ? '90px' : '250px';

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
        data-ad-format={isVertical ? 'vertical' : isHorizontal ? 'horizontal' : 'auto'}
        data-full-width-responsive={isHorizontal ? "false" : "true"}
      />
    </div>
  );
}
