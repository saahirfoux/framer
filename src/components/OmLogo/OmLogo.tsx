import { useMemo, type CSSProperties } from 'react';
import {
  SearchSquircleIcon,
  DEFAULT_PROPS as ICON_DEFAULTS,
} from '../SearchSquircleIcon/SearchSquircleIcon';
import './styles.css';

const PACKED_STYLES = '';

function OmLogoStyles() {
  if (!PACKED_STYLES) return null;
  return <style>{PACKED_STYLES}</style>;
}

export const DEFAULT_NAME = 'OfferMode';
export const DEFAULT_NAME_COLOR = '#000000';
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
  nameFont: DEFAULT_NAME_FONT,
  nameColor: DEFAULT_NAME_COLOR,
  iconBackgroundColor: ICON_DEFAULTS.backgroundColor,
  iconColor: ICON_DEFAULTS.iconColor,
  gap: DEFAULT_GAP,
} as const satisfies Partial<OmLogoProps>;

function resolveIconSize(nameFont?: CSSProperties): number {
  const fontSize = nameFont?.fontSize;
  if (typeof fontSize === 'number' && Number.isFinite(fontSize)) {
    return fontSize;
  }
  if (typeof fontSize === 'string') {
    const parsed = Number.parseFloat(fontSize);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 28;
}

export function OmLogo({
  name = DEFAULT_PROPS.name,
  nameFont = DEFAULT_PROPS.nameFont,
  nameColor = DEFAULT_PROPS.nameColor,
  iconBackgroundColor = DEFAULT_PROPS.iconBackgroundColor,
  iconColor = DEFAULT_PROPS.iconColor,
  gap = DEFAULT_PROPS.gap,
  className,
  style,
}: OmLogoProps) {
  const displayName = name.trim() || DEFAULT_NAME;
  const iconSize = useMemo(() => resolveIconSize(nameFont), [nameFont]);

  const rootStyle = useMemo(
    () =>
      ({
        '--om-logo-gap': `${gap}px`,
        '--om-logo-name-color': nameColor,
        ...style,
      }) as CSSProperties,
    [gap, nameColor, style],
  );

  const nameStyle = useMemo(
    () => ({
      ...nameFont,
      color: nameColor,
    }),
    [nameFont, nameColor],
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
        <SearchSquircleIcon
          backgroundColor={iconBackgroundColor}
          iconColor={iconColor}
          size={iconSize}
        />
        <span className="om-logo__name" style={nameStyle}>
          {displayName}
        </span>
      </div>
    </>
  );
}
