import { addPropertyControls, ControlType } from 'framer';
import { OmPricingTierCard } from './OmPricingTierCard';
import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_CTA_LABEL,
  DEFAULT_DESCRIPTION,
  DEFAULT_INACTIVE_COLOR,
  DEFAULT_PADDING,
  DEFAULT_RANGE,
  DEFAULT_TAGLINE,
  DEFAULT_TITLE,
} from './OmPricingTierCard';

export default OmPricingTierCard;

addPropertyControls(OmPricingTierCard, {
  title: {
    type: ControlType.String,
    title: 'Title',
    defaultValue: DEFAULT_TITLE,
  },
  tagline: {
    type: ControlType.String,
    title: 'Tagline',
    defaultValue: DEFAULT_TAGLINE,
  },
  range: {
    type: ControlType.String,
    title: 'Range',
    defaultValue: DEFAULT_RANGE,
  },
  description: {
    type: ControlType.String,
    title: 'Description',
    displayTextArea: true,
    defaultValue: DEFAULT_DESCRIPTION,
  },
  ctaLabel: {
    type: ControlType.String,
    title: 'Button Label',
    defaultValue: DEFAULT_CTA_LABEL,
  },
  link: {
    type: ControlType.Link,
    title: 'Link',
  },
  highlightMode: {
    type: ControlType.Enum,
    title: 'Highlight',
    options: ['default', 'featured', 'hover'],
    optionTitles: ['Default', 'Featured', 'On Hover'],
    defaultValue: 'hover',
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
    title: 'Padding',
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
