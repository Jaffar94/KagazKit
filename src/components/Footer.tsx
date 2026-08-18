import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xs">K</span>
            </div>
            <span className="font-semibold text-slate-900">KagazKit</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
            <Link href="/about" className="hover:text-indigo-600 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
            <Link href="/privacy-policy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-indigo-600 transition-colors">Disclaimer</Link>
          </nav>
        </div>
        
        <div className="mt-8 text-center text-sm text-slate-400">
          <p>This portal is for educational and utility purposes only.</p>
          <p className="mt-2">
            &copy; {currentYear} KagazKit. All rights reserved. 
            <span className="mx-2">•</span> 
            Built with <span className="text-red-500">♥</span> by <span className="font-medium text-slate-500">Mirza Jaffar Abbas</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
