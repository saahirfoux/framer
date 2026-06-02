import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { DEFAULT_PROPS, OmLogo } from './OmLogo';

function PreviewSurface({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        borderRadius: 12,
        background: '#e8e8e8',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const meta = {
  component: OmLogo,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <PreviewSurface>
        <Story />
      </PreviewSurface>
    ),
  ],
  argTypes: {
    name: { control: 'text' },
    nameColor: { control: 'color' },
    iconBackgroundColor: { control: 'color' },
    iconColor: { control: 'color' },
    gap: { control: { type: 'number', min: 4, max: 48, step: 2 } },
  },
  args: {
    ...DEFAULT_PROPS,
  },
} satisfies Meta<typeof OmLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColors: Story = {
  args: {
    nameColor: '#2563eb',
    iconBackgroundColor: '#1e3a8a',
    iconColor: '#fef08a',
  },
};

export const CustomFont: Story = {
  args: {
    nameFont: {
      fontFamily: 'Georgia, serif',
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: '1.1em',
    },
  },
};

export const CustomName: Story = {
  args: {
    name: 'OfferMode Pro',
  },
};

export const OnDarkBackground: Story = {
  args: {
    nameColor: '#ffffff',
    iconBackgroundColor: '#ffffff',
    iconColor: '#000000',
  },
  decorators: [
    (Story) => (
      <PreviewSurface style={{ background: '#1a1a1a' }}>
        <Story />
      </PreviewSurface>
    ),
  ],
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  args: {
    nameFont: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '1.2em',
    },
  },
};
