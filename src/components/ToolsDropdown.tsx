'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Wrench } from 'lucide-react';
import { TOOLS_DATA } from '@/lib/toolsData';

export default function ToolsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
      >
        <Wrench className="w-4 h-4" />
        Tools
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 max-h-[80vh] overflow-y-auto">
          <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            All Tools
          </div>
          {TOOLS_DATA.map((tool) => (
            <Link 
              key={tool.id} 
              href={tool.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors group"
            >
              <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${tool.color}`}>
                <tool.icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {tool.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
