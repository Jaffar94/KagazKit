'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import BackToHome from '@/components/BackToHome';
import { Copy, RefreshCw, CheckCircle, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [strength, setStrength] = useState<{label: string, color: string}>({ label: 'Strong', color: 'text-emerald-600' });

  const generatePassword = () => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      toast.error('Please select at least one character type');
      return;
    }

    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const nums = '0123456789';
    const syms = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charset = '';
    if (includeUppercase) charset += upper;
    if (includeLowercase) charset += lower;
    if (includeNumbers) charset += nums;
    if (includeSymbols) charset += syms;

    const getSecureRandomInt = (max: number) => {
      const randomBuffer = new Uint32Array(1);
      window.crypto.getRandomValues(randomBuffer);
      return randomBuffer[0] % max;
    };

    let newPassword = '';
    // Ensure at least one character from each selected pool
    if (includeUppercase) newPassword += upper[getSecureRandomInt(upper.length)];
    if (includeLowercase) newPassword += lower[getSecureRandomInt(lower.length)];
    if (includeNumbers) newPassword += nums[getSecureRandomInt(nums.length)];
    if (includeSymbols) newPassword += syms[getSecureRandomInt(syms.length)];

    // Fill the rest
    for (let i = newPassword.length; i < length; i++) {
      newPassword += charset[getSecureRandomInt(charset.length)];
    }

    // Secure Fisher-Yates Shuffle
    let passwordArray = newPassword.split('');
    for (let i = passwordArray.length - 1; i > 0; i--) {
      const j = getSecureRandomInt(i + 1);
      [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }
    newPassword = passwordArray.join('');
    setPassword(newPassword);
    
    // Calculate Strength
    let score = 0;
    if (length > 12) score += 2;
    else if (length > 8) score += 1;
    if (includeUppercase) score += 1;
    if (includeLowercase) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 2;

    if (score < 4) setStrength({ label: 'Weak', color: 'text-red-500' });
    else if (score < 6) setStrength({ label: 'Medium', color: 'text-yellow-600' });
    else setStrength({ label: 'Strong', color: 'text-emerald-600' });
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    toast.success('Password copied to clipboard!');
  };

  const faqs = [
    {
      question: "Is this password generator safe?",
      answer: "Yes, 100% safe. The passwords are generated locally within your web browser using JavaScript's secure math functions. No data is ever sent to or stored on our servers."
    },
    {
      question: "What makes a password strong?",
      answer: "A strong password is typically at least 16 characters long and includes a completely random mix of uppercase letters, lowercase letters, numbers, and special symbols. Avoiding dictionary words makes it virtually impossible to crack."
    },
    {
      question: "Should I memorize these passwords?",
      answer: "No, you should use a trusted Password Manager to store these randomly generated passwords. You only need to memorize one master password for the manager itself."
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <BackToHome />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Secure Password Generator</h1>
        <p className="text-slate-500">Instantly generate strong, random passwords to protect your online accounts.</p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 mb-8 shadow-xs">
        <div className="flex flex-col gap-6">
          
          {/* Password Output Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 break-all font-mono text-xl md:text-2xl text-slate-800 tracking-wider">
              {password}
            </div>
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={copyToClipboard}
                className="p-3 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                title="Copy Password"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button 
                onClick={generatePassword}
                className="p-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                title="Generate New Password"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-slate-500">Password Strength:</span>
            <span className={`flex items-center gap-1 ${strength.color}`}>
              {strength.label === 'Strong' ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
              {strength.label}
            </span>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <label htmlFor="password-length" className="flex justify-between text-sm font-semibold text-slate-700 mb-4">
              <span>Password Length</span>
              <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{length} characters</span>
            </label>
            <input 
              id="password-length"
              type="range" min="8" max="64" step="1" 
              value={length} onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-indigo-600 mb-6"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} className="w-5 h-5 accent-indigo-600" />
                <span className="font-medium text-slate-700">Uppercase (A-Z)</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} className="w-5 h-5 accent-indigo-600" />
                <span className="font-medium text-slate-700">Lowercase (a-z)</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="w-5 h-5 accent-indigo-600" />
                <span className="font-medium text-slate-700">Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="w-5 h-5 accent-indigo-600" />
                <span className="font-medium text-slate-700">Symbols (!@#$%)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Block */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Create Bulletproof Passwords</h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          In an era of rampant data breaches and sophisticated cyber attacks, using a unique, highly complex password for every single account is your first line of defense. Our Random Password Generator allows you to instantly create cryptographically strong passwords tailored to specific length and character requirements. Because the generation algorithm runs entirely locally using your browser's native JavaScript capabilities, your newly minted passwords are never transmitted across the internet, ensuring absolute privacy and zero risk of interception. Pair this tool with a reliable password manager to secure your digital life completely.
        </p>
      </div>

      <AdSlot format="horizontal" slotId="password-generator-bottom-ad" className="mb-12" />

      <FAQ items={faqs} />
    </div>
  );
}
