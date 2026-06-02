import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  type CSSProperties,
  type PointerEvent,
} from 'react';
import './styles.css';

const PACKED_STYLES = '';

function OmPricingTierCardStyles() {
  if (!PACKED_STYLES) return null;
  return <style>{PACKED_STYLES}</style>;
}

export type HighlightMode = 'default' | 'featured' | 'hover';

export interface OmPricingTierCardProps {
  title?: string;
  tagline?: string;
  range?: string;
  description?: string;
  ctaLabel?: string;
  link?: string;
  highlightMode?: HighlightMode;
  borderRadius?: number;
  padding?: number;
  inactiveColor?: string;
  className?: string;
  style?: CSSProperties;
}

export const DEFAULT_TITLE = 'For Emerging';
export const DEFAULT_TAGLINE = 'Build Your Foundation';
export const DEFAULT_RANGE = '• 1 – 500 employees';
export const DEFAULT_DESCRIPTION =
  'Just getting started? Find the right candidates fast — no hassle, no delays.';
export const DEFAULT_CTA_LABEL = 'Get Started';
export const DEFAULT_INACTIVE_COLOR = '#000000';
export const DEFAULT_BORDER_RADIUS = 20;
export const DEFAULT_PADDING = 32;

export const DEFAULT_PROPS: Required<
  Pick<
    OmPricingTierCardProps,
    | 'title'
    | 'tagline'
    | 'range'
    | 'description'
    | 'ctaLabel'
    | 'highlightMode'
    | 'borderRadius'
    | 'padding'
    | 'inactiveColor'
  >
> = {
  title: DEFAULT_TITLE,
  tagline: DEFAULT_TAGLINE,
  range: DEFAULT_RANGE,
  description: DEFAULT_DESCRIPTION,
  ctaLabel: DEFAULT_CTA_LABEL,
  highlightMode: 'hover',
  borderRadius: DEFAULT_BORDER_RADIUS,
  padding: DEFAULT_PADDING,
  inactiveColor: DEFAULT_INACTIVE_COLOR,
};

function useMediaQuery(query: string, defaultValue = false): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return defaultValue;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = () => setMatches(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

function joinClassNames(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}

export function OmPricingTierCard({
  title = DEFAULT_TITLE,
  tagline = DEFAULT_TAGLINE,
  range = DEFAULT_RANGE,
  description = DEFAULT_DESCRIPTION,
  ctaLabel = DEFAULT_CTA_LABEL,
  link,
  highlightMode = 'hover',
  borderRadius = DEFAULT_BORDER_RADIUS,
  padding = DEFAULT_PADDING,
  inactiveColor = DEFAULT_INACTIVE_COLOR,
  className,
  style,
}: OmPricingTierCardProps) {
  const [hovering, setHovering] = useState(false);
  const [touchActive, setTouchActive] = useState(false);

  const prefersHover = useMediaQuery('(hover: hover)', true);
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)',
    false,
  );

  const isFeatured = highlightMode === 'featured';
  const canHoverHighlight = highlightMode === 'hover' && prefersHover;
  const isActive =
    isFeatured ||
    (canHoverHighlight && hovering) ||
    (highlightMode === 'hover' && touchActive);

  const handlePointerDown = useCallback(
    (event: PointerEvent) => {
      if (highlightMode !== 'hover' || prefersHover) return;
      if (event.pointerType === 'mouse') return;
      setTouchActive(true);
    },
    [highlightMode, prefersHover],
  );

  const handlePointerUp = useCallback(() => {
    setTouchActive(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (canHoverHighlight) setHovering(true);
  }, [canHoverHighlight]);

  const handleMouseLeave = useCallback(() => {
    setHovering(false);
    setTouchActive(false);
  }, []);

  const rootClassName = joinClassNames(
    'om-pricing-tier',
    isFeatured && 'om-pricing-tier--featured',
    isActive && !isFeatured && 'om-pricing-tier--active',
    className,
  );

  const cssVars = useMemo(
    () =>
      ({
        '--om-pricing-radius': `${borderRadius}px`,
        '--om-pricing-padding': `${padding}px`,
        '--om-pricing-accent': isActive || isFeatured ? '#af25c2' : inactiveColor,
        '--om-pricing-lift': isActive || isFeatured ? 1.02 : 1,
      }) as CSSProperties,
    [borderRadius, padding, inactiveColor, isActive, isFeatured],
  );

  const ctaContent = <span>{ctaLabel}</span>;

  return (
    <>
      <OmPricingTierCardStyles />
      <article
        className={rootClassName}
        style={{ ...cssVars, ...style }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        data-reduced-motion={prefersReducedMotion ? 'true' : undefined}
      >
        <h3 className="om-pricing-tier__title">{title}</h3>
        <p className="om-pricing-tier__tagline">{tagline}</p>
        <p className="om-pricing-tier__range">{range}</p>
        <p className="om-pricing-tier__description">{description}</p>
        {link ? (
          <a className="om-pricing-tier__cta" href={link}>
            {ctaContent}
          </a>
        ) : (
          <button type="button" className="om-pricing-tier__cta">
            {ctaContent}
          </button>
        )}
      </article>
    </>
  );
}
