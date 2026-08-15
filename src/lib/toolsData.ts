import { 
  Image, 
  FileText, 
  Layers, 
  Minimize2, 
  Calculator, 
  Briefcase, 
  Home as HomeIcon, 
  Wallet, 
  TrendingUp, 
  Percent, 
  PiggyBank, 
  Calendar, 
  Clock,
  QrCode,
  SplitSquareHorizontal
} from 'lucide-react';

export const TOOLS_DATA = [
  {
    id: 'photo-resizer',
    name: 'Govt Exam Photo Resizer',
    description: 'Resize image to 20KB-50KB for UPSC, SSC, IBPS with strict size limits.',
    icon: Image,
    color: 'bg-blue-50 text-blue-600',
    href: '/tools/photo-resizer'
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF Converter',
    description: 'Convert Aadhaar, PAN, or images to PDF strictly within specific KB limits.',
    icon: FileText,
    color: 'bg-cyan-50 text-cyan-600',
    href: '/tools/image-to-pdf'
  },
  {
    id: 'merge-pdf',
    name: 'Merge PDF Online',
    description: 'Combine multiple PDF files into one easily and securely. 100% private.',
    icon: Layers,
    color: 'bg-indigo-50 text-indigo-600',
    href: '/tools/merge-pdf'
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDF Online',
    description: 'Easily compress PDF files online for free. Reduce PDF size for uploads.',
    icon: Minimize2,
    color: 'bg-rose-50 text-rose-600',
    href: '/tools/pdf-compressor'
  },
  {
    id: 'tax-calculator',
    name: 'Income Tax Calculator',
    description: 'Compare Old vs New Tax Regime for FY 2024-25 and save more money.',
    icon: Calculator,
    color: 'bg-emerald-50 text-emerald-600',
    href: '/tools/tax-calculator'
  },
  {
    id: 'salary-calculator',
    name: 'In-Hand Salary Calculator',
    description: 'Calculate your exact monthly in-hand salary from your CTC and PF.',
    icon: Briefcase,
    color: 'bg-teal-50 text-teal-600',
    href: '/tools/salary-calculator'
  },
  {
    id: 'emi-calculator',
    name: 'Home Loan EMI Calculator',
    description: 'Calculate monthly EMI, interest, and view a visual breakdown.',
    icon: HomeIcon,
    color: 'bg-fuchsia-50 text-fuchsia-600',
    href: '/tools/emi-calculator'
  },
  {
    id: 'epf-calculator',
    name: 'EPF & PF Balance Calculator',
    description: 'Calculate your EPF maturity value, PF interest, and contributions.',
    icon: Wallet,
    color: 'bg-purple-50 text-purple-600',
    href: '/tools/epf-calculator'
  },
  {
    id: 'sip-calculator',
    name: 'SIP Return Calculator',
    description: 'Plan wealth creation using our Systematic Investment Plan calculator.',
    icon: TrendingUp,
    color: 'bg-amber-50 text-amber-600',
    href: '/tools/sip-calculator'
  },
  {
    id: 'gst-calculator',
    name: 'GST Calculator India',
    description: 'Instantly add or reverse calculate GST for 5%, 12%, 18%, and 28%.',
    icon: Percent,
    color: 'bg-orange-50 text-orange-600',
    href: '/tools/gst-calculator'
  },
  {
    id: 'deposit-calculator',
    name: 'FD & RD Return Calculator',
    description: 'Calculate maturity amounts and interest earned for Fixed Deposits.',
    icon: PiggyBank,
    color: 'bg-pink-50 text-pink-600',
    href: '/tools/deposit-calculator'
  },
  {
    id: 'age-calculator',
    name: 'Govt Exam Age Calculator',
    description: 'Calculate your exact age in years, months, and days for exam forms.',
    icon: Calendar,
    color: 'bg-rose-50 text-rose-600',
    href: '/tools/age-calculator'
  },
  {
    id: 'date-calculator',
    name: 'Days Between Two Dates',
    description: 'Calculate the exact number of days, weeks, and months between dates.',
    icon: Clock,
    color: 'bg-sky-50 text-sky-600',
    href: '/tools/date-calculator'
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Instantly generate free, high-quality QR codes for URLs and text.',
    icon: QrCode,
    color: 'bg-indigo-50 text-indigo-600',
    href: '/tools/qr-code-generator'
  },
  {
    id: 'split-pdf',
    name: 'Split PDF Online',
    description: 'Extract pages from your PDF or split it into multiple files. 100% private.',
    icon: SplitSquareHorizontal,
    color: 'bg-rose-50 text-rose-600',
    href: '/tools/split-pdf'
  }
];
