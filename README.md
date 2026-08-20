# KagazKit

**KagazKit** is an ultra-fast, modern web utility portal designed for global users. It provides 19 essential tools and calculators with a focus on ease of use, zero server uploads for image processing, and a premium "Soft UI" aesthetic.

## Features & Tools

KagazKit currently includes 19 core utilities across various categories:

**General Utilities:**
1. **AI Receipt Scanner:** Instantly extract items, prices, and taxes from receipts using Vision AI.
2. **QR Code Generator:** Instantly generate free, high-quality QR codes for URLs and text.
3. **Password Generator:** Create cryptographically secure, random passwords locally in your browser.

**PDF & Image Tools:**
4. **Image Resizer:** Strictly compress and resize images to exact KB limits (e.g., 20KB - 50KB).
5. **Compress PDF:** High-quality PDF compression powered by a custom backend.
6. **Merge PDF:** Combine multiple PDF documents seamlessly in your browser.
7. **Image to PDF:** Convert JPG, PNG, and other images to a single PDF document.
8. **Split PDF:** Extract pages from your PDF or split it into multiple files.
9. **AI Background Remover:** Instantly strip image backgrounds using a local AI model for absolute privacy.

**Financial & Tax Calculators:**
10. **Income Tax Calculator:** Compare Old vs New Tax Regime for FY 2024-25.
11. **Home Loan EMI Calculator:** Calculate monthly EMI, interest, and view a visual breakdown.
12. **SIP Return Calculator:** Mutual fund investment planner demonstrating the power of compounding.
13. **In-Hand Salary Calculator:** Compute in-hand take-home salary based on CTC and deductions.
14. **GST Calculator:** Quickly add or remove GST from a net/gross amount.
15. **EPF & PF Calculator:** Calculate Provident Fund maturity values and compound interest.
16. **FD & RD Return Calculator:** Calculate maturity amounts and interest earned for Fixed Deposits.
17. **Loan Prepayment Calculator:** See how much interest you save by making extra EMI payments.

**Date & Age Calculators:**
18. **Govt Exam Age Calculator:** Find exact age in years, months, and days for exam forms.
19. **Date Calculator:** Add or subtract days to find a future or past date.

## Tech Stack

*   **Frontend Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **UI Library:** [React 19](https://react.dev/) (with React Compiler)
*   **Backend Server:** Node.js / Express (for heavy PDF compression tasks via Ghostscript)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)

## Getting Started (Local Development)

### 1. Run the Frontend (Next.js)

First, install the frontend dependencies in the root folder:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 2. Run the Backend (Express & Ghostscript)

To run the dedicated backend for the PDF Compressor locally, you must have `ghostscript` installed on your machine (`brew install ghostscript` on Mac).

Open a new terminal and run:

```bash
cd backend
npm install
node index.js
```

In your Next.js root directory, create a `.env.local` file and add:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/compress
```

In your `backend/` directory, create a `.env` file and add:
```env
GEMINI_API_KEY=your_google_ai_studio_key_here
```

## Deployment

### Frontend (Vercel / Cloudflare Pages)
The easiest way to deploy the frontend is to push this repository to GitHub and import it into Vercel or Cloudflare. Make sure to add `NEXT_PUBLIC_API_URL` to your Environment Variables, pointing to your live Render backend URL.

### Backend (Render)
The backend is Dockerized and ready to be deployed on [Render.com](https://render.com).
1. Create a new **Web Service** on Render.
2. Connect this repository and set the **Root Directory** to `backend`.
3. Set the Environment to **Docker** (Render will automatically use the provided `Dockerfile` to install Ghostscript and Node.js).
4. In the Render Dashboard, add `GEMINI_API_KEY` to your Environment Variables.
