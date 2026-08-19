import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/tools/sip-calculator',
  },
  title: "SIP Return Calculator & Mutual Fund Step-Up SIP Calculator",
  description: "Plan your wealth creation using our Mutual Fund SIP return calculator. Discover the power of compounding with a Step-Up SIP calculator.",
  keywords: ["SIP return calculator", "Mutual fund step up SIP calculator", "Systematic Investment Plan calculator", "Calculate SIP returns"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
