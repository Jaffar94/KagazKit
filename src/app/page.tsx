import Link from 'next/link';
import { Image, Calculator, Wallet, TrendingUp, ChevronRight, Calendar, FileText, Home as HomeIcon } from 'lucide-react';
import AdSlot from '@/components/AdSlot';

export default function Home() {
  const tools = [
    {
      id: 'photo-resizer',
      name: 'Free Online Photo & Signature Resizer for Govt Exams',
      description: 'Resize image to 20KB-50KB for UPSC, SSC, IBPS with strict size limits. 100% private.',
      icon: Image,
      color: 'bg-blue-50 text-blue-600',
      href: '/tools/photo-resizer'
    },
    {
      id: 'tax-calculator',
      name: 'Income Tax Calculator India: Old vs New Regime',
      description: 'Compare Old vs New Tax Regime for FY 2024-25 and find out which saves you more.',
      icon: Calculator,
      color: 'bg-emerald-50 text-emerald-600',
      href: '/tools/tax-calculator'
    },
    {
      id: 'epf-calculator',
      name: 'EPF Calculator India & PF Balance Estimator',
      description: 'Calculate your EPF maturity value, PF interest, and check employer contributions.',
      icon: Wallet,
      color: 'bg-purple-50 text-purple-600',
      href: '/tools/epf-calculator'
    },
    {
      id: 'sip-calculator',
      name: 'SIP Return Calculator & Mutual Fund Step-Up Calculator',
      description: 'Plan wealth creation using our Systematic Investment Plan (SIP) return calculator.',
      icon: TrendingUp,
      color: 'bg-amber-50 text-amber-600',
      href: '/tools/sip-calculator'
    },
    {
      id: 'age-calculator',
      name: 'Govt Exam Age Calculator',
      description: 'Calculate your exact age in years, months, and days for exam forms as of a cutoff date.',
      icon: Calendar,
      color: 'bg-rose-50 text-rose-600',
      href: '/tools/age-calculator'
    },
    {
      id: 'image-to-pdf',
      name: 'Image to PDF Converter (Under 300KB)',
      description: 'Convert Aadhaar, PAN, or images to PDF strictly within specific KB limits. 100% private.',
      icon: FileText,
      color: 'bg-cyan-50 text-cyan-600',
      href: '/tools/image-to-pdf'
    },
    {
      id: 'emi-calculator',
      name: 'Home Loan EMI Calculator India',
      description: 'Calculate monthly EMI, interest, and view a visual breakdown of principal vs interest.',
      icon: HomeIcon,
      color: 'bg-fuchsia-50 text-fuchsia-600',
      href: '/tools/emi-calculator'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      <div className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Simple, Instant <span className="text-indigo-600">Indian Web Tools</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          No signups. No server uploads. 100% private, client-side tools designed for Indian forms and finances.
        </p>
      </div>

      <AdSlot format="horizontal" slotId="home-top-ad" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {tools.map((tool) => (
          <Link 
            key={tool.id} 
            href={tool.href}
            className="group block bg-white border border-slate-200/80 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-100 transition-all duration-300 relative overflow-hidden"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tool.color}`}>
              <tool.icon className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {tool.name}
            </h2>
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
    </div>
  );
}
