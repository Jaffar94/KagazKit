# KagazKit

**KagazKit** is an ultra-fast, modern web utility portal designed for global users. It provides 14 essential tools and calculators with a focus on ease of use, zero server uploads for image processing, and a premium "Soft UI" aesthetic.

## Features & Tools

KagazKit currently includes 14 core utilities:

1. **PDF Compressor:** High-quality PDF compression powered by a custom Ghostscript backend with a continuous granular percentage slider.
2. **Merge PDF:** Combine multiple PDF documents seamlessly in your browser.
3. **Image to PDF:** Convert JPG, PNG, and other images to a single PDF document.
4. **Photo Resizer:** Strictly compress and resize images to exact KB limits (e.g., 20KB - 50KB) using HTML5 Canvas in the browser.
5. **Income Tax Calculator:** A comprehensive tax comparator calculating Standard Deductions and rebates to recommend the most profitable tax regime.
6. **EPF Calculator:** Calculate Provident Fund maturity values and compound interest.
7. **SIP Calculator:** Mutual fund investment planner demonstrating the power of compounding.
8. **EMI Calculator:** Quickly calculate your monthly loan EMI payments.
9. **Age Calculator:** Find exact age in years, months, and days.
10. **Date Calculator:** Add or subtract days to find a future or past date.
11. **Percentage Calculator:** Simple and fast percentage math utility.
12. **Deposit Calculator:** Calculate FD/RD returns over time.
13. **GST Calculator:** Quickly add or remove GST from a net/gross amount.
14. **Salary Calculator:** Compute in-hand take-home salary based on CTC and deductions.

## Tech Stack

*   **Frontend Framework:** [Next.js 14](https://nextjs.org/) (App Router)
*   **Backend Server:** Node.js / Express (for heavy PDF compression tasks via Ghostscript)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
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
NEXT_PUBLIC_PDF_API_URL=http://localhost:8080/compress
```

## Deployment

### Frontend (Vercel)
The easiest way to deploy the frontend is to push this repository to GitHub and import it into [Vercel](https://vercel.com). Vercel will automatically detect the Next.js framework. Make sure to add `NEXT_PUBLIC_PDF_API_URL` to your Vercel Environment Variables, pointing to your live backend URL.

### Backend (Render)
The backend is Dockerized and ready to be deployed on [Render.com](https://render.com).
1. Create a new **Web Service** on Render.
2. Connect this repository and set the **Root Directory** to `backend`.
3. Set the Environment to **Docker** (Render will automatically use the provided `Dockerfile` to install Ghostscript and Node.js).
