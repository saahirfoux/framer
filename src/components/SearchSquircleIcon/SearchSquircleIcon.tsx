export interface SearchSquircleIconProps {
  /** Fill color of the squircle background */
  backgroundColor?: string;
  /** Stroke color of the magnifying glass */
  iconColor?: string;
  /** Width and height in CSS pixels */
  size?: number;
  className?: string;
  /** Accessible label; omit when decorative */
  title?: string;
}

const VIEWBOX = 24;
const SQUIRCLE_RX = 5.4;
const LENS_CX = 10.35;
const LENS_CY = 10.35;
const LENS_R = 4.65;
const STROKE = 1.85;
const HANDLE_X1 = 14.35;
const HANDLE_Y1 = 14.35;
const HANDLE_X2 = 17.85;
const HANDLE_Y2 = 17.85;

export const DEFAULT_PROPS = {
  backgroundColor: '#000000',
  iconColor: '#ffffff',
  size: 48,
} as const satisfies Partial<SearchSquircleIconProps>;

export function SearchSquircleIcon({
  backgroundColor = DEFAULT_PROPS.backgroundColor,
  iconColor = DEFAULT_PROPS.iconColor,
  size = DEFAULT_PROPS.size,
  className,
  title,
}: SearchSquircleIconProps) {
  const labelled = Boolean(title);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      width={size}
      height={size}
      className={className}
      role={labelled ? 'img' : undefined}
      aria-hidden={labelled ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <rect
        width={VIEWBOX}
        height={VIEWBOX}
        rx={SQUIRCLE_RX}
        fill={backgroundColor}
      />
      <circle
        cx={LENS_CX}
        cy={LENS_CY}
        r={LENS_R}
        fill="none"
        stroke={iconColor}
        strokeWidth={STROKE}
      />
      <line
        x1={HANDLE_X1}
        y1={HANDLE_Y1}
        x2={HANDLE_X2}
        y2={HANDLE_Y2}
        stroke={iconColor}
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
    </svg>
  );
}
