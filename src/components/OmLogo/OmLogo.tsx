import { useMemo, type CSSProperties } from 'react';
import './styles.css';

const PACKED_STYLES = '';

function OmLogoStyles() {
  if (!PACKED_STYLES) return null;
  return <style>{PACKED_STYLES}</style>;
}

const SQUIRCLE_VIEWBOX = 24;
const SQUIRCLE_RX = 5.4;
const SQUIRCLE_LENS_CX = 10.35;
const SQUIRCLE_LENS_CY = 10.35;
const SQUIRCLE_LENS_R = 4.65;
const SQUIRCLE_STROKE = 1.85;
const SQUIRCLE_HANDLE_X1 = 14.35;
const SQUIRCLE_HANDLE_Y1 = 14.35;
const SQUIRCLE_HANDLE_X2 = 17.85;
const SQUIRCLE_HANDLE_Y2 = 17.85;

export const DEFAULT_ICON_BACKGROUND = '#000000';
export const DEFAULT_ICON_COLOR = '#ffffff';

interface OmLogoSquircleIconProps {
  backgroundColor?: string;
  iconColor?: string;
  size?: number;
  className?: string;
}

function OmLogoSquircleIcon({
  backgroundColor = DEFAULT_ICON_BACKGROUND,
  iconColor = DEFAULT_ICON_COLOR,
  size = 48,
  className,
}: OmLogoSquircleIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${SQUIRCLE_VIEWBOX} ${SQUIRCLE_VIEWBOX}`}
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <rect
        width={SQUIRCLE_VIEWBOX}
        height={SQUIRCLE_VIEWBOX}
        rx={SQUIRCLE_RX}
        fill={backgroundColor}
      />
      <circle
        cx={SQUIRCLE_LENS_CX}
        cy={SQUIRCLE_LENS_CY}
        r={SQUIRCLE_LENS_R}
        fill="none"
        stroke={iconColor}
        strokeWidth={SQUIRCLE_STROKE}
      />
      <line
        x1={SQUIRCLE_HANDLE_X1}
        y1={SQUIRCLE_HANDLE_Y1}
        x2={SQUIRCLE_HANDLE_X2}
        y2={SQUIRCLE_HANDLE_Y2}
        stroke={iconColor}
        strokeWidth={SQUIRCLE_STROKE}
        strokeLinecap="round"
      />
    </svg>
  );
}

export const DEFAULT_NAME = 'OfferMode';
export const DEFAULT_NAME_COLOR = '#000000';
export const DEFAULT_LOGO_SIZE = 24;
export const DEFAULT_GAP = 12;

export const DEFAULT_NAME_FONT: CSSProperties = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '24px',
  fontWeight: 600,
  lineHeight: '1.2em',
  letterSpacing: '0em',
};

export interface OmLogoProps {
  name?: string;
  /** Scales wordmark and squircle icon together (px) */
  logoSize?: number;
  nameFont?: CSSProperties;
  nameColor?: string;
  iconBackgroundColor?: string;
  iconColor?: string;
  gap?: number;
  className?: string;
  style?: CSSProperties;
}

export const DEFAULT_PROPS = {
  name: DEFAULT_NAME,
  logoSize: DEFAULT_LOGO_SIZE,
  nameFont: DEFAULT_NAME_FONT,
  nameColor: DEFAULT_NAME_COLOR,
  iconBackgroundColor: DEFAULT_ICON_BACKGROUND,
  iconColor: DEFAULT_ICON_COLOR,
  gap: DEFAULT_GAP,
} as const satisfies Partial<OmLogoProps>;

function scaledGap(logoSize: number, gap?: number): number {
  if (gap !== undefined) return gap;
  return Math.round((logoSize / DEFAULT_LOGO_SIZE) * DEFAULT_GAP);
}

export function OmLogo({
  name = DEFAULT_PROPS.name,
  logoSize = DEFAULT_PROPS.logoSize,
  nameFont = DEFAULT_PROPS.nameFont,
  nameColor = DEFAULT_PROPS.nameColor,
  iconBackgroundColor = DEFAULT_PROPS.iconBackgroundColor,
  iconColor = DEFAULT_PROPS.iconColor,
  gap,
  className,
  style,
}: OmLogoProps) {
  const displayName = name.trim() || DEFAULT_NAME;
  const resolvedGap = scaledGap(logoSize, gap);

  const rootStyle = useMemo(
    () =>
      ({
        '--om-logo-gap': `${resolvedGap}px`,
        '--om-logo-name-color': nameColor,
        ...style,
      }) as CSSProperties,
    [resolvedGap, nameColor, style],
  );

  const nameStyle = useMemo(
    () => ({
      ...nameFont,
      fontSize: `${logoSize}px`,
      color: nameColor,
    }),
    [nameFont, logoSize, nameColor],
  );

  return (
    <>
      <OmLogoStyles />
      <div
        className={['om-logo', className].filter(Boolean).join(' ')}
        style={rootStyle}
        aria-label={displayName}
        role="img"
      >
        <OmLogoSquircleIcon
          backgroundColor={iconBackgroundColor}
          iconColor={iconColor}
          size={logoSize}
        />
        <span className="om-logo__name" style={nameStyle}>
          {displayName}
        </span>
      </div>
    </>
  );
}
