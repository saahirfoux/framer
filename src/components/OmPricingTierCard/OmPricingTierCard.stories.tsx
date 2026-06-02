import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { OmPricingTierCard } from './OmPricingTierCard';
import { DEFAULT_PROPS } from './OmPricingTierCard';

function CardWrapper({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div style={{ width: 320, minHeight: 420, color: '#000000', ...style }}>
      {children}
    </div>
  );
}

const meta = {
  component: OmPricingTierCard,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <CardWrapper>
        <Story />
      </CardWrapper>
    ),
  ],
  args: {
    ...DEFAULT_PROPS,
  },
} satisfies Meta<typeof OmPricingTierCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Featured: Story = {
  args: {
    highlightMode: 'featured',
    title: 'For Scaling',
    tagline: 'Fuel The Climb',
    range: '• 501 – 5,000 employees',
    description:
      'Growing fast? Scale your pipeline — not your recruiting team.',
  },
};

export const HoverPreview: Story = {
  args: {
    highlightMode: 'hover',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hover the card to see the highlight state (desktop).',
      },
    },
  },
};

export const InactiveDefault: Story = {
  args: {
    highlightMode: 'default',
  },
};

export const LongText: Story = {
  args: {
    title: 'For Enterprise With A Very Long Title Name',
    description:
      'Outgrowing your hiring model? Turn hiring into a measurable, scalable system — not a growing expense. Extra copy to stress-test wrapping and equal-height layouts in the section.',
  },
};

export const ReducedMotion: Story = {
  args: {
    highlightMode: 'featured',
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  decorators: [
    (Story) => (
      <CardWrapper style={{ width: '100%', maxWidth: 360 }}>
        <Story />
      </CardWrapper>
    ),
  ],
};
