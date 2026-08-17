"use client";

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    // Note: You can replace YOUR_ACCESS_KEY_HERE with your real key from Web3Forms.
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        // Reset the form fields
        (e.target as HTMLFormElement).reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        console.error("Error from Web3Forms", data);
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission failed", error);
      setStatus("error");
    }
  };

  return (
    <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm relative overflow-hidden">
      
      {/* Success Message Overlay */}
      <div 
        className={`absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          status === "success" ? "opacity-100 visible" : "opacity-0 invisible"
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

      <form onSubmit={handleSubmit} className="space-y-6">
        
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
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
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
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
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        {status === "error" && (
          <p className="text-red-500 text-sm font-medium">
            Something went wrong. Please try again later. (Make sure you replaced YOUR_ACCESS_KEY_HERE if using a real form!)
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          {status === "submitting" ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
