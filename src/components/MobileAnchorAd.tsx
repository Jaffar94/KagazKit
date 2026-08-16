import AdSlot from './AdSlot';

export default function MobileAnchorAd() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] lg:hidden flex justify-center p-2">
      <AdSlot format="horizontal" slotId="mobile-anchor-ad" />
    </div>
  );
}
