import { useMemo, type CSSProperties } from 'react';
import {
  OmPricingTierCard,
  type HighlightMode,
  type OmPricingTierCardProps,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_CTA_LABEL,
  DEFAULT_PADDING,
} from '../OmPricingTierCard/OmPricingTierCard';
import './styles.css';
import '../OmPricingTierCard/styles.css';

const PACKED_STYLES = '';

function OmPricingSectionStyles() {
  if (!PACKED_STYLES) return null;
  return <style>{PACKED_STYLES}</style>;
}

export interface OmPricingTierConfig {
  title?: string;
  tagline?: string;
  range?: string;
  description?: string;
  ctaLabel?: string;
  link?: string;
  highlightMode?: HighlightMode;
}

export interface OmPricingSectionProps {
  tier1?: OmPricingTierConfig;
  tier2?: OmPricingTierConfig;
  tier3?: OmPricingTierConfig;
  gap?: number;
  borderRadius?: number;
  padding?: number;
  inactiveColor?: string;
  className?: string;
  style?: CSSProperties;
}

export const DEFAULT_TIER_1: OmPricingTierConfig = {
  title: 'For Emerging',
  tagline: 'Build Your Foundation',
  range: '• 1 – 500 employees',
  description:
    'Just getting started? Find the right candidates fast — no hassle, no delays.',
  ctaLabel: DEFAULT_CTA_LABEL,
  highlightMode: 'hover',
};

export const DEFAULT_TIER_2: OmPricingTierConfig = {
  title: 'For Scaling',
  tagline: 'Fuel The Climb',
  range: '• 501 – 5,000 employees',
  description:
    'Growing fast? Scale your pipeline — not your recruiting team.',
  ctaLabel: DEFAULT_CTA_LABEL,
  highlightMode: 'featured',
};

export const DEFAULT_TIER_3: OmPricingTierConfig = {
  title: 'For Enterprise',
  tagline: 'Scale With Precision',
  range: '• 5,001+ employees',
  description:
    'Outgrowing your hiring model? Turn hiring into a measurable, scalable system — not a growing expense.',
  ctaLabel: DEFAULT_CTA_LABEL,
  highlightMode: 'hover',
};

function mergeTier(
  defaults: OmPricingTierConfig,
  overrides?: OmPricingTierConfig,
): OmPricingTierCardProps {
  return {
    ...defaults,
    ...overrides,
  };
}

function joinClassNames(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}

export function OmPricingSection({
  tier1 = DEFAULT_TIER_1,
  tier2 = DEFAULT_TIER_2,
  tier3 = DEFAULT_TIER_3,
  gap = 24,
  borderRadius = DEFAULT_BORDER_RADIUS,
  padding = DEFAULT_PADDING,
  inactiveColor,
  className,
  style,
}: OmPricingSectionProps) {
  const tiers = useMemo(
    () => [
      mergeTier(DEFAULT_TIER_1, tier1),
      mergeTier(DEFAULT_TIER_2, tier2),
      mergeTier(DEFAULT_TIER_3, tier3),
    ],
    [tier1, tier2, tier3],
  );

  const sectionStyle = useMemo(
    () =>
      ({
        '--om-pricing-section-gap': `${gap}px`,
        ...style,
      }) as CSSProperties,
    [gap, style],
  );

  const sharedCardProps = {
    borderRadius,
    padding,
    inactiveColor,
  };

  return (
    <>
      <OmPricingSectionStyles />
      <section
        className={joinClassNames('om-pricing-section', className)}
        style={sectionStyle}
        aria-label="Pricing tiers"
      >
        {tiers.map((tier, index) => (
          <OmPricingTierCard
            key={`${tier.title ?? 'tier'}-${index}`}
            {...sharedCardProps}
            {...tier}
          />
        ))}
      </section>
    </>
  );
}
