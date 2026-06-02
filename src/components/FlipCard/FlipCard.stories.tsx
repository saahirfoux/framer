import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { expect, waitFor } from 'storybook/test';
import { FlipCard } from './FlipCard';
import maleImage from '../../assets/male.png';

function CardWrapper({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return <div style={{ width: 320, minHeight: 400, ...style }}>{children}</div>;
}

const meta = {
  component: FlipCard,
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
} satisfies Meta<typeof FlipCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleContent = {
  image: maleImage,
  title: 'Jason Lee',
  description: 'Front-End Developer',
  backItems: [
    '5+ years experience',
    'React & TypeScript',
    'Based in NYC',
  ],
  showBackItems: true,
  link: 'https://example.com',
  ctaLabel: 'View profile',
  showOnlineStatus: false,
};

export const Default: Story = {
  args: {
    ...sampleContent,
  },
};

export const NoLabel: Story = {
  args: {
    ...sampleContent,
    showLabel: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.queryByText(sampleContent.description)).toBeNull();
    await expect(document.querySelector('.flip-card__label-panel')).toBeNull();
  },
};

export const HoverReveal: Story = {
  args: {
    ...sampleContent,
    revealMode: 'hover',
  },
};

export const ClickReveal: Story = {
  args: {
    ...sampleContent,
    revealMode: 'click',
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText(sampleContent.description)).toBeVisible();
    const card = canvas.getByRole('button', {
      name: /jason lee, showing front/i,
    });
    await userEvent.click(card);
    await expect(
      canvas.getByRole('button', { name: /jason lee, showing back/i }),
    ).toBeVisible();
    await expect(canvas.getByText('React & TypeScript')).toBeVisible();
  },
};

export const ScrollReveal: Story = {
  args: {
    ...sampleContent,
    revealMode: 'scroll',
    mobileBehavior: 'scroll',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200vh', paddingTop: '150vh' }}>
        <CardWrapper>
          <Story />
        </CardWrapper>
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    canvasElement.querySelector('.flip-card')?.scrollIntoView();
    await waitFor(
      () => {
        expect(
          canvasElement.querySelector('.flip-card--flipped'),
        ).toBeTruthy();
      },
      { timeout: 5000 },
    );
  },
};

export const Mobile: Story = {
  args: {
    ...sampleContent,
    revealMode: 'tap',
    mobileBehavior: 'tap',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  play: async ({ canvas, userEvent }) => {
    const card = canvas.getByRole('button', {
      name: /jason lee, showing front/i,
    });
    await userEvent.click(card);
    await expect(
      canvas.getByRole('button', { name: /jason lee, showing back/i }),
    ).toBeVisible();
  },
};

export const LongText: Story = {
  args: {
    ...sampleContent,
    title:
      'An Extraordinarily Long Title That Should Clamp Gracefully Without Breaking Layout',
    description:
      'This is an intentionally verbose subtitle meant to stress-test line clamping on the front label panel when designers paste far more copy than anticipated.',
    revealMode: 'click',
  },
};

export const BackBullets: Story = {
  args: {
    ...sampleContent,
    revealMode: 'click',
    backItems: [
      'Led design system rollout',
      'Shipped 12 production features',
      'Mentored junior developers',
    ],
  },
  play: async ({ canvas, userEvent }) => {
    const card = canvas.getByRole('button', {
      name: /jason lee, showing front/i,
    });
    await userEvent.click(card);
    await expect(
      canvas.getByText('Led design system rollout'),
    ).toBeVisible();
  },
};

export const ReducedMotion: Story = {
  args: {
    ...sampleContent,
    revealMode: 'click',
  },
  play: async ({ canvas, userEvent }) => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const card = canvas.getByRole('button', {
      name: /jason lee, showing front/i,
    });
    await userEvent.click(card);

    const inner = card.querySelector('.flip-card__inner');
    expect(inner).toBeTruthy();

    if (prefersReduced) {
      const transform = getComputedStyle(inner!).transform;
      expect(
        transform === 'none' ||
          transform === 'matrix(1, 0, 0, 1, 0, 0)' ||
          !transform.includes('matrix3d'),
      ).toBe(true);
    }

    await expect(
      canvas.getByRole('button', { name: /jason lee, showing back/i }),
    ).toBeVisible();
  },
};

export const BackWithProfile: Story = {
  args: {
    ...sampleContent,
    revealMode: 'click',
    showOnlineStatus: true,
  },
  play: async ({ canvas, userEvent }) => {
    const card = canvas.getByRole('button', {
      name: /jason lee, showing front/i,
    });
    await userEvent.click(card);
    const avatar = card.querySelector('.flip-card__avatar-image');
    expect(avatar).toBeTruthy();
    const online = card.querySelector('.flip-card__online-indicator');
    expect(online).toBeTruthy();
    const cta = canvas.getByRole('link', { name: /view profile/i });
    expect(cta).toBeTruthy();
    await expect(cta.className).toContain('flip-card__cta');
    const ctaStyle = getComputedStyle(cta);
    await expect(ctaStyle.borderBottomLeftRadius).toBe('40px');
    await expect(ctaStyle.borderBottomRightRadius).toBe('40px');
  },
};

export const BackWithImage: Story = {
  args: {
    ...sampleContent,
    revealMode: 'click',
    backImage: maleImage,
  },
  play: async ({ canvas, userEvent }) => {
    const card = canvas.getByRole('button', {
      name: /jason lee, showing front/i,
    });
    await userEvent.click(card);
    const backImage = card.querySelector('.flip-card__back-image');
    expect(backImage).toBeTruthy();
    await expect(backImage).toHaveAttribute('src', expect.stringContaining('male'));
  },
};

export const BackBackgroundOnly: Story = {
  args: {
    ...sampleContent,
    revealMode: 'click',
    backColor: '#ffffff',
  },
  play: async ({ canvas, userEvent }) => {
    const card = canvas.getByRole('button', {
      name: /jason lee, showing front/i,
    });
    await userEvent.click(card);
    const fill = card.querySelector('.flip-card__back-fill');
    expect(fill).toBeTruthy();
    await expect(getComputedStyle(fill!).backgroundColor).toBe('rgb(255, 255, 255)');
  },
};

export const DarkMode: Story = {
  args: {
    ...sampleContent,
    backColor: '#0f172a',
    textColor: '#f8fafc',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    backgrounds: { value: '#16171d' },
  },
};

export const NarrowWidth: Story = {
  args: {
    ...sampleContent,
    revealMode: 'click',
  },
  decorators: [
    (Story) => (
      <CardWrapper style={{ width: 200 }}>
        <Story />
      </CardWrapper>
    ),
  ],
};

export const NoCta: Story = {
  args: {
    ...sampleContent,
    revealMode: 'click',
    showCta: false,
  },
};

export const NoBackList: Story = {
  args: {
    ...sampleContent,
    revealMode: 'click',
    showBackItems: false,
  },
  play: async ({ canvas, userEvent }) => {
    const card = canvas.getByRole('button', {
      name: /jason lee, showing front/i,
    });
    await userEvent.click(card);
    expect(canvas.queryByText('React & TypeScript')).toBeNull();
  },
};

export const CssCheck: Story = {
  args: {
    ...sampleContent,
    title: 'Style Check',
    borderRadius: 40,
    labelPanelScale: 0.5,
    revealMode: 'click',
  },
  play: async ({ canvas }) => {
    const face = canvas
      .getByRole('button')
      .querySelector('.flip-card__face--front');
    expect(face).toBeTruthy();
    await expect(getComputedStyle(face!).borderRadius).toBe('40px');
    const title = canvas.getByText('Style Check');
    await expect(getComputedStyle(title).fontSize).toBe('12px');
  },
};
