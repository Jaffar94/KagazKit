# KagazKit

**KagazKit** is an ultra-fast, 100% client-side web utility portal designed for Indian users. It provides essential tools and calculators with a focus on absolute privacy, zero server uploads, and a premium "Soft UI" aesthetic.

## Features & Tools

KagazKit currently includes 4 core utilities:

1. **Govt Exam Photo & Signature Resizer:** Strictly compresses and resizes images to exact KB limits (20KB - 50KB) required by UPSC, SSC, and IBPS portals. Runs entirely using HTML5 Canvas in the browser.
2. **Income Tax Calculator (Old vs New Regime):** A comprehensive tax comparator for FY 2024-25 that calculates Standard Deductions and 87A rebates to recommend the most profitable tax regime.
3. **EPF Calculator & Wealth Estimator:** Calculates Provident Fund maturity values and compound interest based on employee and employer contributions.
4. **SIP & Step-Up Wealth Calculator:** A mutual fund investment planner that demonstrates the power of compounding with annual step-up increments.

## Tech Stack

*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Architecture:** 100% Static / Client-Side (`next export` compatible). Zero backend required.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Monetization & AdSense

KagazKit is structured to be fully compliant with Google AdSense. 
*   It includes pre-built AdSense wrapper components (`<AdSlot />`) designed to prevent Cumulative Layout Shift (CLS).
*   It includes mandatory compliance pages (`/about`, `/privacy-policy`, `/terms`, `/disclaimer`).
*   **To enable ads:** Replace the `ca-pub-XXXXXXXXXXXXXXXX` publisher ID in `src/app/layout.tsx` with your own AdSense ID.

## Deployment

Because KagazKit relies on zero backend APIs, it can be hosted anywhere that supports static files. 

The easiest way to deploy is to push this repository to GitHub and import it into [Vercel](https://vercel.com). Vercel will automatically detect the Next.js framework and configure the optimal build settings.
