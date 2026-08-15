import { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Privacy Policy | KagazKit',
  description: 'Privacy Policy for KagazKit web utilities.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 w-full prose prose-slate">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: August 2024</p>
      
      <p>At KagazKit, accessible from kagazkit.site, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by KagazKit and how we use it.</p>

      <AdSlot format="horizontal" slotId="privacy-ad-1" className="not-prose my-8" />

      <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Data Processing</h2>
      <p>
        <strong>KagazKit operates entirely client-side.</strong> We do not have servers that collect your images, financial numbers, or inputs. All image processing and calculations are performed directly within your web browser.
      </p>

      <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Google AdSense and Cookies</h2>
      <p>
        We use Google AdSense to display advertisements. Google, as a third-party vendor, uses cookies to serve ads on our site. Google&apos;s use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google ad and content network Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Log Files</h2>
      <p>
        KagazKit follows a standard procedure of using log files provided by our hosting environment (such as Vercel or similar CDN providers). These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
      </p>
    </div>
  );
}
