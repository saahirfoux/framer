import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { OmPricingSection } from './OmPricingSection';

function SectionWrapper({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 1100,
        padding: 24,
        color: '#000000',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const meta = {
  component: OmPricingSection,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <SectionWrapper>
        <Story />
      </SectionWrapper>
    ),
  ],
} satisfies Meta<typeof OmPricingSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  decorators: [
    (Story) => (
      <SectionWrapper style={{ maxWidth: 400 }}>
        <Story />
      </SectionWrapper>
    ),
  ],
};

export const ReducedMotion: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
