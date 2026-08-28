import ToolGuide from '@/components/ToolGuide';
import FAQ from '@/components/FAQ';
import { TOOL_CONTENT } from '@/lib/toolContent';

type ToolContentSectionProps = {
  toolId: string;
};

/**
 * Renders the rich ToolGuide educational content and expanded FAQ section
 * for a given tool. This component is designed to add ~500-700 words of
 * crawlable text content per tool page for AdSense approval.
 *
 * Usage: <ToolContentSection toolId="photo-resizer" />
 */
export default function ToolContentSection({ toolId }: ToolContentSectionProps) {
  const content = TOOL_CONTENT[toolId];

  if (!content) {
    console.warn(`ToolContentSection: No content found for toolId "${toolId}"`);
    return null;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: content.guide.title.replace('What is the ', '').replace('What is ', '').replace('?', ''),
    description: content.guide.overview.substring(0, 160) + '...',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Works on any modern web browser.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <ToolGuide {...content.guide} />
      <FAQ items={content.faqs} />
    </>
  );
}
