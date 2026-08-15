import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EPF Calculator India & PF Balance Interest Estimator",
  description: "Calculate your EPF maturity value, PF interest, and check employer vs employee PF contributions for retirement planning.",
  keywords: ["EPF calculator India", "PF balance calculator", "Calculate EPF maturity value", "PF interest calculator", "How to calculate PF contribution"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
