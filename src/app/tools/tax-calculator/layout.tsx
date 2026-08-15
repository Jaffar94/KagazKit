import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Income Tax Calculator India: Old vs New Regime Comparison",
  description: "Compare Old vs New Tax Regime for FY 2024-25 and find out which saves you more money. Detailed income tax calculator with standard deductions and 87A rebate.",
  keywords: ["Income tax calculator India", "Old vs new tax regime calculator", "Which tax regime is better for me", "New tax regime slabs"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
