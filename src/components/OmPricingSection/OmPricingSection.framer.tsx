import { addPropertyControls, ControlType } from 'framer';
import { OmPricingSection } from './OmPricingSection';
import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_CTA_LABEL,
  DEFAULT_INACTIVE_COLOR,
  DEFAULT_PADDING,
} from '../OmPricingTierCard/OmPricingTierCard';
import {
  DEFAULT_TIER_1,
  DEFAULT_TIER_2,
  DEFAULT_TIER_3,
} from './OmPricingSection';

export default OmPricingSection;

const tierControls = {
  title: {
    type: ControlType.String as const,
    title: 'Title',
  },
  tagline: {
    type: ControlType.String as const,
    title: 'Tagline',
  },
  range: {
    type: ControlType.String as const,
    title: 'Range',
  },
  description: {
    type: ControlType.String as const,
    title: 'Description',
    displayTextArea: true,
  },
  ctaLabel: {
    type: ControlType.String as const,
    title: 'Button Label',
    defaultValue: DEFAULT_CTA_LABEL,
  },
  link: {
    type: ControlType.Link as const,
    title: 'Link',
  },
};

addPropertyControls(OmPricingSection, {
  tier1: {
    type: ControlType.Object,
    title: 'Tier 1 — Emerging',
    controls: tierControls,
    defaultValue: DEFAULT_TIER_1,
  },
  tier2: {
    type: ControlType.Object,
    title: 'Tier 2 — Scaling',
    controls: tierControls,
    defaultValue: DEFAULT_TIER_2,
  },
  tier3: {
    type: ControlType.Object,
    title: 'Tier 3 — Enterprise',
    controls: tierControls,
    defaultValue: DEFAULT_TIER_3,
  },
  gap: {
    type: ControlType.Number,
    title: 'Gap',
    defaultValue: 24,
    min: 0,
    max: 64,
    step: 1,
    unit: 'px',
  },
  borderRadius: {
    type: ControlType.Number,
    title: 'Corner Radius',
    defaultValue: DEFAULT_BORDER_RADIUS,
    min: 0,
    max: 48,
    step: 1,
    unit: 'px',
  },
  padding: {
    type: ControlType.Number,
    title: 'Card Padding',
    defaultValue: DEFAULT_PADDING,
    min: 8,
    max: 64,
    step: 1,
    unit: 'px',
  },
  inactiveColor: {
    type: ControlType.Color,
    title: 'Inactive Accent',
    defaultValue: DEFAULT_INACTIVE_COLOR,
  },
});
