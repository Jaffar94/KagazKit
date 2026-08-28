'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import SupportDeveloper from './SupportDeveloper';
import ToolsDropdown from './ToolsDropdown';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [legalDropdownOpen, setLegalDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const mainLinks = [
    { name: 'About', href: '/about' },
    { name: 'Blog & Guides', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ];

  return (
    <>
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="KagazKit Home">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">KagazKit</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {mainLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <ToolsDropdown />

          {/* Legal Dropdown (Desktop) */}
          <div 
            className="relative group"
            onMouseEnter={() => setLegalDropdownOpen(true)}
            onMouseLeave={() => setLegalDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors py-2">
              Legal <ChevronDown className={`w-4 h-4 transition-transform ${legalDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {legalDropdownOpen && (
              <div className="absolute top-full left-0 mt-0 pt-2 w-48">
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 py-2 overflow-hidden">
                  {legalLinks.map((link) => (
                    <Link 
                      key={link.name}
                      href={link.href} 
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Support Button */}
        <div className="hidden lg:block">
          <SupportDeveloper />
        </div>

        {/* Mobile Right Section */}
        <div className="flex items-center gap-2 lg:hidden">
          <ToolsDropdown />
          <button 
            onClick={() => setMobileMenuOpen(true)} 
            className="p-2 text-slate-600 hover:text-indigo-600 transition-colors bg-slate-50 rounded-lg ml-2"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white lg:hidden overflow-y-auto flex flex-col">
          <div className="px-4 h-16 flex items-center justify-between border-b border-slate-200/80 shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">KagazKit</span>
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(false)} 
              className="p-2 bg-slate-50 rounded-lg text-slate-600 hover:text-red-600 transition-colors"
              aria-label="Close Mobile Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6 space-y-8 flex-1">
            {/* Main Links */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Navigation</span>
              {mainLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className="text-lg font-bold text-slate-800 hover:text-indigo-600 flex items-center justify-between group"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="h-px bg-slate-200" />

            {/* Legal Links */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Legal & Privacy</span>
              {legalLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className="text-lg font-bold text-slate-800 hover:text-indigo-600"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="h-px bg-slate-200" />
            
            {/* Mobile Support Button */}
            <div className="pt-2 flex justify-center">
              <SupportDeveloper />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
