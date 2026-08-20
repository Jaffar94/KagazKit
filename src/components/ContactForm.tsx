"use client";

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Send, CheckCircle } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-hover disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
    >
      {pending ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <Send className="w-5 h-5" />
      )}
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export default function ContactForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const submitForm = async (prevState: any, formData: FormData) => {
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";
    formData.append("access_key", accessKey);

    // If using the dummy key, we simulate a successful submission.
    if (accessKey === "YOUR_ACCESS_KEY_HERE") {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      return { success: true };
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        return { success: true };
      } else {
        console.error("Error from Web3Forms", data);
        return { success: false, error: "API Error" };
      }
    } catch (error) {
      console.error("Submission failed", error);
      return { success: false, error: "Network Error" };
    }
  };

  const [state, formAction] = useActionState(submitForm, null);

  useEffect(() => {
    if (state?.success) {
      setShowSuccess(true);
      if (formRef.current) {
        formRef.current.reset();
      }
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs relative overflow-hidden">
      
      {/* Success Message Overlay */}
      <div 
        className={`absolute inset-0 bg-white/95 backdrop-blur-xs z-10 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          showSuccess ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
        <p className="text-slate-500 text-center max-w-sm">
          Thank you for reaching out. We will get back to you as soon as possible.
        </p>
      </div>

      <form ref={formRef} action={formAction} className="space-y-6">
        
        {/* Honeypot Spam Protection */}
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold text-slate-900">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-hidden"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-slate-900">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-hidden"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="block text-sm font-semibold text-slate-900">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-hidden"
            placeholder="How can we help you?"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-semibold text-slate-900">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-hidden resize-none"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        {state?.success === false && (
          <p className="text-red-500 text-sm font-medium">
            Something went wrong. Please try again later. (Make sure you replaced YOUR_ACCESS_KEY_HERE if using a real form!)
          </p>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}
