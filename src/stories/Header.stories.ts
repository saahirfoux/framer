import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Header } from './Header';

const meta = {
  component: Header,
  tags: ['ai-generated'],
  parameters: { layout: 'fullscreen' },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// LoggedOut: checks that auth buttons are exposed for unauthenticated state
export const LoggedOut: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /log in/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /sign up/i })).toBeVisible();
  },
};

export const LoggedIn: Story = {
  args: { user: { name: 'Jane Doe' } },
};
