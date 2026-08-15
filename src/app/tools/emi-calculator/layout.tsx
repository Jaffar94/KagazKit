import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Loan EMI Calculator India | Personal Loan & Car Loan EMI",
  description: "Calculate your monthly EMI, total interest, and principal amount for home loans, car loans, and personal loans in India. Visual interest breakdown.",
  keywords: ["Home loan EMI calculator India", "EMI interest calculator with chart", "Calculate loan EMI", "Personal loan EMI calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
