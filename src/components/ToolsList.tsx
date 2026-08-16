'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Search } from 'lucide-react';
import AdSlot from '@/components/AdSlot';
import { TOOLS_CATEGORIES } from '@/lib/toolsData';

export default function ToolsList() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tools based on search query
  const filteredCategories = TOOLS_CATEGORIES.map(category => ({
    ...category,
    tools: category.tools.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.tools.length > 0);

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto mb-10 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="Search for tools (e.g., 'PDF', 'Tax', 'Age')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl leading-5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all shadow-sm hover:border-slate-300"
        />
      </div>

      {/* Categorized Tools List */}
      <div className="space-y-12">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <div key={category.categoryName}>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-200">
                {category.categoryName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.tools.map((tool) => (
                  <Link 
                    key={tool.id} 
                    href={tool.href}
                    className="group block bg-white border border-slate-200/80 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-100 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tool.color}`}>
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                      {tool.description}
                    </p>
                    <div className="flex items-center text-indigo-600 text-sm font-semibold">
                      <span>Open Tool</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* In-feed Ad (Only place after the first and second category if not searching) */}
              {!searchQuery && (index === 0 || index === 2) && (
                 <div className="mt-12">
                    <AdSlot format="horizontal" slotId={`home-infeed-ad-${index}`} />
                 </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No tools found matching &quot;{searchQuery}&quot;</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-indigo-600 font-semibold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
