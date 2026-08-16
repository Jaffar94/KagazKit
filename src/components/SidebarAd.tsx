import AdSlot from './AdSlot';

export default function SidebarAd() {
  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      {/* Top Ad - Scrolls away naturally */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col items-center">
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-2">Advertisement</span>
        <div className="w-full min-h-[600px] flex items-center justify-center overflow-hidden">
           <AdSlot format="vertical" slotId="sidebar-top-ad" />
        </div>
      </div>

      {/* Bottom Ad - Sticks as user scrolls */}
      <div className="sticky top-24 bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col items-center">
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-2">Advertisement</span>
        <div className="w-full min-h-[600px] flex items-center justify-center overflow-hidden">
           <AdSlot format="vertical" slotId="sidebar-sticky-ad" />
        </div>
      </div>
    </div>
  );
}
