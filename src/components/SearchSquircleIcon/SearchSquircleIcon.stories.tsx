import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { DEFAULT_PROPS, SearchSquircleIcon } from './SearchSquircleIcon';

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
  component: SearchSquircleIcon,
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
    backgroundColor: { control: 'color' },
    iconColor: { control: 'color' },
    size: { control: { type: 'number', min: 16, max: 128, step: 4 } },
    title: { control: 'text' },
  },
  args: {
    ...DEFAULT_PROPS,
    title: 'Search',
  },
} satisfies Meta<typeof SearchSquircleIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColors: Story = {
  args: {
    backgroundColor: '#2563eb',
    iconColor: '#fef08a',
    title: 'Search',
  },
};

export const Inverted: Story = {
  args: {
    backgroundColor: '#ffffff',
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

export const Large: Story = {
  args: {
    size: 96,
  },
};

export const Small: Story = {
  args: {
    size: 24,
  },
};

export const Decorative: Story = {
  args: {
    title: undefined,
  },
};
