import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Button } from './Button';

const meta = {
  component: Button,
  tags: ['ai-generated'],
  parameters: { layout: 'centered' },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { primary: true, label: 'Button' },
};

export const Secondary: Story = {
  args: { label: 'Button' },
};

export const Large: Story = {
  args: { size: 'large', label: 'Button' },
};

export const Small: Story = {
  args: { size: 'small', label: 'Button' },
};

// Asserts that button.css loaded: .storybook-button--primary uses background-color: #555ab9
export const CssCheck: Story = {
  args: { primary: true, label: 'Submit' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i });
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(85, 90, 185)');
  },
};
