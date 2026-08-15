import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Photo & Signature Resizer",
  description: "Resize your photo and signature to strict 20KB-50KB limits for UPSC, SSC, and IBPS exams. 100% private, client-side resizing.",
  keywords: ["UPSC photo signature resize", "SSC CGL photo and signature size", "Resize image to 20KB-50KB", "Govt exam photo resizer online", "Image Resizer"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
