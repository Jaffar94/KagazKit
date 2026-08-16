import AdSlot from './AdSlot';

export default function SidebarAd() {
  return (
    <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 h-full min-h-[600px] flex flex-col items-center">
      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-2">Advertisement</span>
      <div className="w-full h-[600px] flex items-center justify-center">
         <AdSlot format="vertical" slotId="sidebar-skyscraper-ad" />
      </div>
    </div>
  );
}
