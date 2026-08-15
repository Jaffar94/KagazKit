import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convert Aadhaar & Images to PDF Under 300KB | Free Online",
  description: "Free client-side tool to convert Aadhaar, PAN, and other images to PDF format under 200KB or 300KB for government exam applications.",
  keywords: ["Convert Aadhaar to PDF under 300KB", "Image to PDF converter for exams", "PAN card to PDF 200KB", "JPG to PDF less than 300KB"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
