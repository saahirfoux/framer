import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
  tags: ['ai-generated'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Verifies counter state: click increments the displayed count
export const CounterIncrement: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /count is 0/i });
    await userEvent.click(button);
    await expect(canvas.getByRole('button', { name: /count is 1/i })).toBeVisible();
  },
};
