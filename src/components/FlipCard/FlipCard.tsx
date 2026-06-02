import {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
  type CSSProperties,
  type Dispatch,
  type KeyboardEvent,
  type MouseEvent,
  type SetStateAction,
} from 'react';
import { motion, useInView, type Transition } from 'framer-motion';
import heroImage from '../../assets/hero.png';
import './styles.css';

const PACKED_STYLES = '';

function FlipCardStyles() {
  if (!PACKED_STYLES) return null;
  return <style>{PACKED_STYLES}</style>;
}

// --- Types ---

export type RevealMode = 'hover' | 'click' | 'tap' | 'scroll';
export type FlipDirection = 'horizontal' | 'vertical';
export type AnimationStyle = 'smooth' | 'snappy' | 'dramatic';
export type MobileBehavior = 'tap' | 'scroll' | 'disabled';

export type ResponsiveImageValue = {
  src?: string;
  srcSet?: string;
  alt?: string;
};

export type FlipCardImage = string | ResponsiveImageValue;

export type ImageFocalPoint = {
  x: number;
  y: number;
};

export type LabelTextOffset = {
  x: number;
  y: number;
};

export interface FlipCardProps {
  image?: FlipCardImage;
  backImage?: FlipCardImage;
  profileImage?: FlipCardImage;
  frontImageFocal?: ImageFocalPoint;
  frontImageZoom?: number;
  backImageFocal?: ImageFocalPoint;
  backImageZoom?: number;
  title?: string;
  description?: string;
  showLabel?: boolean;
  backItems?: string[];
  showBackItems?: boolean;
  badge?: string;
  link?: string;
  ctaLabel?: string;
  showCta?: boolean;
  showOnlineStatus?: boolean;
  onlineIndicatorColor?: string;
  ctaColor?: string;
  ctaTextColor?: string;

  revealMode?: RevealMode;
  flipDirection?: FlipDirection;
  animationStyle?: AnimationStyle;
  mobileBehavior?: MobileBehavior;

  autoFlip?: boolean;
  autoFlipDelay?: number;

  threshold?: number;
  once?: boolean;
  staggerIndex?: number;

  borderRadius?: number;
  shadow?: boolean;
  backColor?: string;
  textColor?: string;
  overlayColor?: string;
  padding?: number;

  frontPanelColor?: string;
  frontTitleColor?: string;
  frontDescriptionColor?: string;
  panelScoopRadius?: number;
  labelPanelScale?: number;
  labelTextOffset?: LabelTextOffset;
  labelPanelPadding?: number;
  labelPanelExtraWidth?: number;

  className?: string;
  style?: CSSProperties;
}

export type { Transition };

// --- Image utils ---

function resolveImageSrc(image?: FlipCardImage): string | undefined {
  if (!image) return undefined;
  if (typeof image === 'string') {
    const trimmed = image.trim();
    return trimmed || undefined;
  }
  const src = image.src?.trim();
  return src || undefined;
}

function resolveImageSrcSet(image?: FlipCardImage): string | undefined {
  if (!image || typeof image === 'string') return undefined;
  const srcSet = image.srcSet?.trim();
  return srcSet || undefined;
}

function resolveImageAlt(image?: FlipCardImage, fallback = ''): string {
  if (!image || typeof image === 'string') return fallback;
  return image.alt?.trim() || fallback;
}

const DEFAULT_IMAGE_FOCAL: ImageFocalPoint = { x: 0.5, y: 0.5 };

function clampLabelPanelScale(scale?: number): number {
  return Math.min(1, Math.max(0.25, scale ?? 0.5));
}

function clampLabelPanelExtraWidth(width?: number): number {
  return Math.min(120, Math.max(0, width ?? 0));
}

function FlipCardDecisionIcons() {
  return (
    <div className="flip-card__decision-icons" aria-hidden>
      <svg
        className="flip-card__decision-icon flip-card__decision-icon--approve"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="5" cy="5" r="4.25" stroke="#22c55e" strokeWidth="1" />
        <path
          d="M3 5.25L4.35 6.6L7 3.75"
          stroke="#22c55e"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className="flip-card__decision-icon flip-card__decision-icon--reject"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="5" cy="5" r="4.25" stroke="#ef4444" strokeWidth="1" />
        <path
          d="M3.5 3.5L6.5 6.5M6.5 3.5L3.5 6.5"
          stroke="#ef4444"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function imageFramingStyle(
  focal?: ImageFocalPoint,
  zoom?: number,
): CSSProperties {
  const x = `${(focal?.x ?? 0.5) * 100}%`;
  const y = `${(focal?.y ?? 0.5) * 100}%`;
  const scale = zoom ?? 1;
  return {
    objectPosition: `${x} ${y}`,
    transform: `scale(${scale})`,
    transformOrigin: `${x} ${y}`,
  };
}

// --- Defaults ---

export const DEFAULT_IMAGE = heroImage;
export const DEFAULT_TITLE = 'Jason Lee';
export const DEFAULT_DESCRIPTION = 'Front-End Developer';
export const DEFAULT_BACK_ITEMS = [
  '5+ years experience',
  'React & TypeScript',
  'Based in NYC',
];
const DEFAULT_AUTO_FLIP_DELAY = 3000;

const ANIMATION_PRESETS: Record<AnimationStyle, Transition> = {
  smooth: { duration: 0.85, ease: [0.4, 0, 0.2, 1] },
  snappy: { type: 'spring', stiffness: 320, damping: 32 },
  dramatic: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
};

const REDUCED_MOTION_TRANSITION: Transition = { duration: 0.01 };

const DEFAULT_PROPS: Required<
  Pick<
    FlipCardProps,
    | 'image'
    | 'title'
    | 'description'
    | 'backItems'
    | 'revealMode'
    | 'flipDirection'
    | 'animationStyle'
    | 'mobileBehavior'
    | 'borderRadius'
    | 'shadow'
    | 'backColor'
    | 'textColor'
    | 'overlayColor'
    | 'padding'
    | 'threshold'
    | 'once'
    | 'staggerIndex'
    | 'autoFlipDelay'
    | 'frontPanelColor'
    | 'frontTitleColor'
    | 'frontDescriptionColor'
    | 'panelScoopRadius'
    | 'labelPanelScale'
    | 'showLabel'
    | 'showCta'
    | 'showBackItems'
    | 'showOnlineStatus'
    | 'onlineIndicatorColor'
    | 'ctaColor'
    | 'ctaTextColor'
    | 'frontImageFocal'
    | 'frontImageZoom'
    | 'backImageFocal'
    | 'backImageZoom'
    | 'labelTextOffset'
    | 'labelPanelExtraWidth'
  >
> = {
  image: DEFAULT_IMAGE,
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  backItems: DEFAULT_BACK_ITEMS,
  revealMode: 'hover',
  flipDirection: 'horizontal',
  animationStyle: 'smooth',
  mobileBehavior: 'tap',
  borderRadius: 40,
  shadow: true,
  backColor: '#ffffff',
  textColor: '#111827',
  overlayColor: 'transparent',
  padding: 24,
  threshold: 0.3,
  once: true,
  staggerIndex: 0,
  autoFlipDelay: DEFAULT_AUTO_FLIP_DELAY,
  frontPanelColor: '#ffffff',
  frontTitleColor: '#111827',
  frontDescriptionColor: '#6b7280',
  panelScoopRadius: 35,
  labelPanelScale: 0.5,
  showLabel: true,
  showCta: true,
  showBackItems: false,
  showOnlineStatus: false,
  onlineIndicatorColor: '#22c55e',
  ctaColor: '#111827',
  ctaTextColor: '#ffffff',
  frontImageFocal: DEFAULT_IMAGE_FOCAL,
  frontImageZoom: 1,
  backImageFocal: DEFAULT_IMAGE_FOCAL,
  backImageZoom: 1,
  labelTextOffset: { x: 0, y: 0 },
  labelPanelExtraWidth: 0,
};

// --- Flip interaction hook ---

function getEffectiveMode(
  revealMode: RevealMode,
  mobileBehavior: FlipCardProps['mobileBehavior'],
  prefersHover: boolean,
  isCoarsePointer: boolean,
): RevealMode | 'disabled' {
  const useMobile = isCoarsePointer || !prefersHover;

  if (useMobile) {
    if (mobileBehavior === 'disabled') return 'disabled';
    if (mobileBehavior === 'scroll') return 'scroll';
    if (mobileBehavior === 'tap') return 'tap';
  }

  if (revealMode === 'tap' && prefersHover && !isCoarsePointer) {
    return 'click';
  }

  return revealMode;
}

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

interface UseFlipInteractionOptions {
  revealMode: RevealMode;
  mobileBehavior: NonNullable<FlipCardProps['mobileBehavior']>;
  autoFlip?: boolean;
  autoFlipDelay?: number;
}

interface UseFlipInteractionResult {
  flipped: boolean;
  setFlipped: Dispatch<SetStateAction<boolean>>;
  effectiveMode: RevealMode | 'disabled';
  prefersReducedMotion: boolean;
  isInteractive: boolean;
  containerHandlers: {
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: (e: MouseEvent) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
  };
}

function useFlipInteraction({
  revealMode,
  mobileBehavior,
  autoFlip = false,
  autoFlipDelay = DEFAULT_AUTO_FLIP_DELAY,
}: UseFlipInteractionOptions): UseFlipInteractionResult {
  const [flipped, setFlipped] = useState(false);
  const userInteractedRef = useRef(false);

  const prefersHover = useMediaQuery('(hover: hover)', true);
  const isCoarsePointer = useMediaQuery('(pointer: coarse)', false);
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)',
    false,
  );

  const effectiveMode = useMemo(
    () =>
      getEffectiveMode(revealMode, mobileBehavior, prefersHover, isCoarsePointer),
    [revealMode, mobileBehavior, prefersHover, isCoarsePointer],
  );

  const isInteractive =
    effectiveMode !== 'disabled' && effectiveMode !== 'scroll';

  const pauseAutoFlip = useCallback(() => {
    userInteractedRef.current = true;
  }, []);

  const setFlippedWithPause = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      pauseAutoFlip();
      setFlipped(value);
    },
    [pauseAutoFlip],
  );

  useEffect(() => {
    if (!autoFlip || prefersReducedMotion || userInteractedRef.current) return;

    const id = window.setInterval(() => {
      setFlipped((prev) => !prev);
    }, autoFlipDelay);

    return () => window.clearInterval(id);
  }, [autoFlip, autoFlipDelay, prefersReducedMotion]);

  const handleMouseEnter = useCallback(() => {
    if (effectiveMode === 'hover') setFlipped(true);
  }, [effectiveMode]);

  const handleMouseLeave = useCallback(() => {
    if (effectiveMode === 'hover') setFlipped(false);
  }, [effectiveMode]);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (effectiveMode === 'click' || effectiveMode === 'tap') {
        e.preventDefault();
        setFlippedWithPause((prev) => !prev);
      }
    },
    [effectiveMode, setFlippedWithPause],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (effectiveMode !== 'click' && effectiveMode !== 'tap') return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setFlippedWithPause((prev) => !prev);
      }
    },
    [effectiveMode, setFlippedWithPause],
  );

  const containerHandlers = useMemo(() => {
    const handlers: UseFlipInteractionResult['containerHandlers'] = {};

    if (effectiveMode === 'hover') {
      handlers.onMouseEnter = handleMouseEnter;
      handlers.onMouseLeave = handleMouseLeave;
    }

    if (effectiveMode === 'click' || effectiveMode === 'tap') {
      handlers.onClick = handleClick;
      handlers.onKeyDown = handleKeyDown;
    }

    return handlers;
  }, [
    effectiveMode,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    handleKeyDown,
  ]);

  return {
    flipped,
    setFlipped,
    effectiveMode,
    prefersReducedMotion,
    isInteractive,
    containerHandlers,
  };
}

// --- Component ---

export function FlipCard({
  image = DEFAULT_PROPS.image,
  backImage,
  profileImage,
  frontImageFocal = DEFAULT_PROPS.frontImageFocal,
  frontImageZoom = DEFAULT_PROPS.frontImageZoom,
  backImageFocal = DEFAULT_PROPS.backImageFocal,
  backImageZoom = DEFAULT_PROPS.backImageZoom,
  title = DEFAULT_PROPS.title,
  description = DEFAULT_PROPS.description,
  showLabel = DEFAULT_PROPS.showLabel,
  backItems = DEFAULT_PROPS.backItems,
  showBackItems = DEFAULT_PROPS.showBackItems,
  badge,
  link,
  ctaLabel = 'Learn more',
  showCta = DEFAULT_PROPS.showCta,
  showOnlineStatus = DEFAULT_PROPS.showOnlineStatus,
  onlineIndicatorColor = DEFAULT_PROPS.onlineIndicatorColor,
  ctaColor = DEFAULT_PROPS.ctaColor,
  ctaTextColor = DEFAULT_PROPS.ctaTextColor,
  revealMode = DEFAULT_PROPS.revealMode,
  flipDirection = DEFAULT_PROPS.flipDirection,
  animationStyle = DEFAULT_PROPS.animationStyle,
  mobileBehavior = DEFAULT_PROPS.mobileBehavior,
  autoFlip = false,
  autoFlipDelay = DEFAULT_PROPS.autoFlipDelay,
  threshold = DEFAULT_PROPS.threshold,
  once = DEFAULT_PROPS.once,
  staggerIndex = DEFAULT_PROPS.staggerIndex,
  borderRadius = DEFAULT_PROPS.borderRadius,
  shadow = DEFAULT_PROPS.shadow,
  backColor = DEFAULT_PROPS.backColor,
  textColor = DEFAULT_PROPS.textColor,
  overlayColor = DEFAULT_PROPS.overlayColor,
  padding = DEFAULT_PROPS.padding,
  frontPanelColor = DEFAULT_PROPS.frontPanelColor,
  frontTitleColor = DEFAULT_PROPS.frontTitleColor,
  frontDescriptionColor = DEFAULT_PROPS.frontDescriptionColor,
  panelScoopRadius = DEFAULT_PROPS.panelScoopRadius,
  labelPanelScale = DEFAULT_PROPS.labelPanelScale,
  labelTextOffset = DEFAULT_PROPS.labelTextOffset,
  labelPanelPadding,
  labelPanelExtraWidth = DEFAULT_PROPS.labelPanelExtraWidth,
  className,
  style,
}: FlipCardProps) {
  const panelScale = clampLabelPanelScale(labelPanelScale);
  const panelPadding = labelPanelPadding ?? padding;
  const panelExtraWidth = clampLabelPanelExtraWidth(labelPanelExtraWidth);
  const [imageError, setImageError] = useState(false);
  const [backImageError, setBackImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  const scrollRef = useRef<HTMLElement>(null);

  const frontImageSrc = resolveImageSrc(image);
  const frontImageSrcSet = resolveImageSrcSet(image);
  const backImageSrc = resolveImageSrc(backImage);
  const backImageSrcSet = resolveImageSrcSet(backImage);
  const profileImageSrc =
    resolveImageSrc(profileImage) ?? frontImageSrc;
  const profileImageSrcSet = profileImage
    ? resolveImageSrcSet(profileImage)
    : frontImageSrcSet;
  const profileImageSource = profileImage ?? image;

  useEffect(() => {
    setImageError(false);
  }, [frontImageSrc]);

  useEffect(() => {
    setBackImageError(false);
  }, [backImageSrc]);

  useEffect(() => {
    setProfileImageError(false);
  }, [profileImageSrc]);

  const {
    flipped,
    setFlipped,
    effectiveMode,
    prefersReducedMotion,
    isInteractive,
    containerHandlers,
  } = useFlipInteraction({
    revealMode,
    mobileBehavior,
    autoFlip,
    autoFlipDelay,
  });

  const isInView = useInView(scrollRef, {
    amount: threshold,
    once,
  });

  useEffect(() => {
    if (effectiveMode !== 'scroll' || !isInView) return;
    const delay = staggerIndex * 100;
    if (delay > 0) {
      const id = window.setTimeout(() => setFlipped(true), delay);
      return () => window.clearTimeout(id);
    }
    setFlipped(true);
  }, [effectiveMode, isInView, staggerIndex, setFlipped]);

  const transition = prefersReducedMotion
    ? REDUCED_MOTION_TRANSITION
    : ANIMATION_PRESETS[animationStyle];

  const rotateAxis = flipDirection === 'horizontal' ? 'rotateY' : 'rotateX';
  const rotateValue = flipped ? 180 : 0;

  const innerAnimate = useMemo(() => {
    if (prefersReducedMotion) return {};
    return { [rotateAxis]: rotateValue };
  }, [prefersReducedMotion, rotateAxis, rotateValue]);

  const showScoop = showLabel && panelScoopRadius > 0;

  const cssVars = {
    '--flip-radius': `${borderRadius}px`,
    '--flip-back': backColor,
    '--flip-text': textColor,
    '--flip-overlay': overlayColor,
    '--flip-padding': `${padding}px`,
    '--flip-panel-bg': frontPanelColor,
    '--flip-front-title': frontTitleColor,
    '--flip-front-desc': frontDescriptionColor,
    '--flip-panel-scale': String(panelScale),
    '--flip-panel-padding': `${panelPadding}px`,
    '--flip-text-offset-x': `${labelTextOffset.x}px`,
    '--flip-text-offset-y': `${labelTextOffset.y}px`,
    '--flip-panel-extra-width': `${panelExtraWidth}px`,
    '--flip-scoop-corner': `${panelScoopRadius * panelScale}px`,
    '--flip-cta-bg': ctaColor,
    '--flip-cta-text': ctaTextColor,
    '--flip-online': onlineIndicatorColor,
  } as CSSProperties;

  const rootClassName = [
    'flip-card',
    `flip-card--${flipDirection}`,
    shadow && 'flip-card--shadow',
    isInteractive && 'flip-card--interactive',
    flipped && 'flip-card--flipped',
    showScoop && 'flip-card--scoop',
    showCta && 'flip-card--has-cta',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const displayTitle = title || 'Card';
  const imageAlt = title ? title : '';

  return (
    <>
      <FlipCardStyles />
      <motion.article
      ref={scrollRef}
      className={rootClassName}
      style={{ ...cssVars, ...style }}
      role={isInteractive ? 'button' : undefined}
      aria-pressed={isInteractive ? flipped : undefined}
      aria-label={
        isInteractive
          ? `${displayTitle}, ${flipped ? 'showing back' : 'showing front'}`
          : undefined
      }
      tabIndex={isInteractive ? 0 : undefined}
      {...containerHandlers}
    >
      <motion.div className="flip-card__perspective">
        <motion.div
          className="flip-card__inner"
          initial={false}
          animate={innerAnimate}
          transition={transition}
        >
          <motion.div className="flip-card__face flip-card__face--front">
            <motion.div
              className="flip-card__image-wrap"
              initial={false}
              animate={
                prefersReducedMotion
                  ? { opacity: flipped ? 0 : 1 }
                  : undefined
              }
              transition={transition}
            >
              {!imageError && frontImageSrc ? (
                <img
                  className="flip-card__image"
                  src={frontImageSrc}
                  srcSet={frontImageSrcSet}
                  alt={resolveImageAlt(image, imageAlt)}
                  style={imageFramingStyle(frontImageFocal, frontImageZoom)}
                  onError={() => setImageError(true)}
                />
              ) : (
                <motion.div
                  className="flip-card__image flip-card__image--fallback"
                  aria-hidden
                />
              )}
            </motion.div>

            {showLabel && (
              <motion.div
                className="flip-card__label-panel"
                initial={false}
                animate={
                  prefersReducedMotion
                    ? { opacity: flipped ? 0 : 1 }
                    : undefined
                }
                transition={transition}
              >
                {badge && <span className="flip-card__badge">{badge}</span>}
                <div className="flip-card__label-content">
                  <h3 className="flip-card__front-title">{displayTitle}</h3>
                  {description && (
                    <p className="flip-card__front-description">{description}</p>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="flip-card__face flip-card__face--back"
            aria-hidden={!flipped && !prefersReducedMotion}
            initial={false}
            animate={
              prefersReducedMotion
                ? { opacity: flipped ? 1 : 0 }
                : undefined
            }
            transition={transition}
          >
            <motion.div
              className="flip-card__back-media"
              aria-hidden
              initial={false}
              animate={
                prefersReducedMotion
                  ? { opacity: flipped ? 1 : 0 }
                  : undefined
              }
              transition={transition}
            >
              {backImageSrc && !backImageError ? (
                <img
                  className="flip-card__back-image"
                  src={backImageSrc}
                  srcSet={backImageSrcSet}
                  alt=""
                  style={imageFramingStyle(backImageFocal, backImageZoom)}
                  onError={() => setBackImageError(true)}
                />
              ) : (
                <motion.div className="flip-card__back-fill" aria-hidden />
              )}
            </motion.div>
            <motion.div
              className="flip-card__back-body"
              initial={false}
              animate={
                prefersReducedMotion
                  ? { opacity: flipped ? 1 : 0 }
                  : undefined
              }
              transition={transition}
            >
              <div className="flip-card__avatar-wrap">
                <div className="flip-card__avatar">
                  <div className="flip-card__avatar-clip" aria-hidden>
                    {!profileImageError && profileImageSrc ? (
                      <img
                        className="flip-card__avatar-image"
                        src={profileImageSrc}
                        srcSet={profileImageSrcSet}
                        alt={resolveImageAlt(profileImageSource, imageAlt)}
                        onError={() => setProfileImageError(true)}
                      />
                    ) : (
                      <div
                        className="flip-card__avatar-image flip-card__avatar-image--fallback"
                        aria-hidden
                      />
                    )}
                  </div>
                  {showOnlineStatus && (
                    <span
                      className="flip-card__online-indicator"
                      aria-hidden
                    />
                  )}
                </div>
              </div>

              <div className="flip-card__back-content">
                {badge && <span className="flip-card__badge">{badge}</span>}
                {showBackItems && backItems.length > 0 && (
                  <ul className="flip-card__back-list">
                    {backItems.map((item) => (
                      <li key={item} className="flip-card__back-list-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flip-card__back-footer">
                <FlipCardDecisionIcons />
                {showCta &&
                  (link ? (
                    <a
                      className="flip-card__cta"
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {ctaLabel}
                    </a>
                  ) : (
                    <div
                      className="flip-card__cta flip-card__cta--disabled"
                      aria-disabled="true"
                    >
                      {ctaLabel}
                    </div>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.article>
    </>
  );
}
