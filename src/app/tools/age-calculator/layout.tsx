import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Govt Exam Age Calculator | Calculate Exact Age in Years, Months, Days",
  description: "Free online age calculator for Indian government exams. Calculate your exact age in years, months, and days as of a specific cutoff date.",
  keywords: ["Govt exam age calculator as of date", "Calculate exact age in years months days", "UPSC age calculator", "SSC age calculator cutoff"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
