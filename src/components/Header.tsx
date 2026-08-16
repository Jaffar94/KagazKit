import Link from 'next/link';
import SupportDeveloper from './SupportDeveloper';
import ToolsDropdown from './ToolsDropdown';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="KagazKit Home">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">KagazKit</span>
        </Link>
        <div className="flex items-center gap-2">
          <ToolsDropdown />
          <SupportDeveloper />
        </div>
      </div>
    </header>
  );
}
