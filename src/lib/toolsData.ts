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
  SplitSquareHorizontal,
  ReceiptText,
  Wand2,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';

export const TOOLS_CATEGORIES = [
  {
    categoryName: 'General Utilities',
    tools: [
      {
        id: 'ai-receipt-scanner',
        name: 'AI Receipt Scanner',
        description: 'Instantly extract items, prices, and taxes from receipts using Vision AI.',
        icon: ReceiptText,
        color: 'bg-emerald-50 text-emerald-600',
        href: '/tools/ai-receipt-scanner'
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
        id: 'password-generator',
        name: 'Password Generator',
        description: 'Create cryptographically secure, random passwords locally in your browser.',
        icon: ShieldCheck,
        color: 'bg-emerald-50 text-emerald-600',
        href: '/tools/password-generator'
      }
    ]
  },
  {
    categoryName: 'PDF & Image Tools',
    tools: [
      {
        id: 'photo-resizer',
        name: 'Image Resizer',
        description: 'Resize image to 20KB-50KB for UPSC, SSC, IBPS with strict size limits.',
        icon: Image,
        color: 'bg-blue-50 text-blue-600',
        href: '/tools/photo-resizer'
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
        id: 'merge-pdf',
        name: 'Merge PDF Online',
        description: 'Combine multiple PDF files into one easily and securely. 100% private.',
        icon: Layers,
        color: 'bg-indigo-50 text-indigo-600',
        href: '/tools/merge-pdf'
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
        id: 'split-pdf',
        name: 'Split PDF Online',
        description: 'Extract pages from your PDF or split it into multiple files. 100% private.',
        icon: SplitSquareHorizontal,
        color: 'bg-rose-50 text-rose-600',
        href: '/tools/split-pdf'
      },
      {
        id: 'background-remover',
        name: 'AI Background Remover',
        description: 'Instantly strip image backgrounds using a local AI model for absolute privacy.',
        icon: Wand2,
        color: 'bg-fuchsia-50 text-fuchsia-600',
        href: '/tools/background-remover'
      },
      {
        id: 'heic-to-jpg',
        name: 'HEIC to JPG Converter',
        description: 'Convert iPhone photos to standard JPG format instantly. 100% private.',
        icon: Image,
        color: 'bg-orange-50 text-orange-600',
        href: '/tools/heic-to-jpg'
      }
    ]
  },
  {
    categoryName: 'Financial & Tax Calculators',
    tools: [
      {
        id: 'tax-calculator',
        name: 'Income Tax Calculator',
        description: 'Compare Old vs New Tax Regime for FY 2024-25 and save more money.',
        icon: Calculator,
        color: 'bg-emerald-50 text-emerald-600',
        href: '/tools/tax-calculator'
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
        id: 'sip-calculator',
        name: 'SIP Return Calculator',
        description: 'Plan wealth creation using our Systematic Investment Plan calculator.',
        icon: TrendingUp,
        color: 'bg-amber-50 text-amber-600',
        href: '/tools/sip-calculator'
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
        id: 'gst-calculator',
        name: 'GST Calculator India',
        description: 'Instantly add or reverse calculate GST for 5%, 12%, 18%, and 28%.',
        icon: Percent,
        color: 'bg-orange-50 text-orange-600',
        href: '/tools/gst-calculator'
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
        id: 'deposit-calculator',
        name: 'FD & RD Return Calculator',
        description: 'Calculate maturity amounts and interest earned for Fixed Deposits.',
        icon: PiggyBank,
        color: 'bg-pink-50 text-pink-600',
        href: '/tools/deposit-calculator'
      },
      {
        id: 'loan-prepayment',
        name: 'Loan Prepayment Calculator',
        description: 'See how much interest you save by making extra EMI payments.',
        icon: TrendingDown,
        color: 'bg-teal-50 text-teal-600',
        href: '/tools/loan-prepayment'
      }
    ]
  },
  {
    categoryName: 'Date & Age Calculators',
    tools: [
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
      }
    ]
  }
];

// Export a flat list for components that need all tools (e.g., sitemap, dropdown)
export const TOOLS_DATA = TOOLS_CATEGORIES.flatMap(category => category.tools);
