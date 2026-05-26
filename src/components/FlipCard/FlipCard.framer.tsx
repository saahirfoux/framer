import { addPropertyControls, ControlType } from 'framer';
import { FlipCard } from './FlipCard';

export default FlipCard;

addPropertyControls(FlipCard, {
  image: {
    type: ControlType.ResponsiveImage,
    title: 'Photo',
  },
  title: {
    type: ControlType.String,
    title: 'Title',
    defaultValue: 'Jason Lee',
  },
  description: {
    type: ControlType.String,
    title: 'Description',
    defaultValue: 'Front-End Developer',
    displayTextArea: true,
  },
  backItems: {
    type: ControlType.Array,
    title: 'Back Items',
    control: {
      type: ControlType.String,
    },
    defaultValue: ['5+ years experience', 'React & TypeScript', 'Based in NYC'],
  },
  badge: {
    type: ControlType.String,
    title: 'Badge',
  },
  link: {
    type: ControlType.Link,
    title: 'Link',
  },
  ctaLabel: {
    type: ControlType.String,
    title: 'CTA Label',
    defaultValue: 'Learn more',
  },
  backImage: {
    type: ControlType.ResponsiveImage,
    title: 'Back Photo',
  },
  profileImage: {
    type: ControlType.ResponsiveImage,
    title: 'Profile Photo',
  },
  showOnlineStatus: {
    type: ControlType.Boolean,
    title: 'Online Status',
    defaultValue: true,
  },
  onlineIndicatorColor: {
    type: ControlType.Color,
    title: 'Status Color',
    defaultValue: '#22c55e',
    hidden: (props) => !props.showOnlineStatus,
  },
  backColor: {
    type: ControlType.Color,
    title: 'Back Background',
    defaultValue: '#ffffff',
  },
  textColor: {
    type: ControlType.Color,
    title: 'Back Text',
    defaultValue: '#111827',
  },
  ctaColor: {
    type: ControlType.Color,
    title: 'Button Color',
    defaultValue: '#111827',
  },
  ctaTextColor: {
    type: ControlType.Color,
    title: 'Button Text',
    defaultValue: '#ffffff',
  },
  frontPanelColor: {
    type: ControlType.Color,
    title: 'Panel Background',
    defaultValue: '#ffffff',
  },
  frontTitleColor: {
    type: ControlType.Color,
    title: 'Title Color',
    defaultValue: '#111827',
  },
  frontDescriptionColor: {
    type: ControlType.Color,
    title: 'Description Color',
    defaultValue: '#6b7280',
  },
  borderRadius: {
    type: ControlType.Number,
    title: 'Corner Radius',
    defaultValue: 40,
    min: 0,
    max: 80,
    unit: 'px',
  },
  panelScoopRadius: {
    type: ControlType.Number,
    title: 'Corner Curve',
    defaultValue: 35,
    min: 0,
    max: 60,
    unit: 'px',
  },
  padding: {
    type: ControlType.Number,
    title: 'Padding',
    defaultValue: 24,
    min: 0,
    max: 64,
    unit: 'px',
  },
  shadow: {
    type: ControlType.Boolean,
    title: 'Shadow',
    defaultValue: true,
  },
  revealMode: {
    type: ControlType.Enum,
    title: 'Reveal On',
    options: ['hover', 'click', 'tap', 'scroll'],
    optionTitles: ['Hover', 'Click', 'Tap', 'Scroll'],
    defaultValue: 'hover',
  },
  flipDirection: {
    type: ControlType.Enum,
    title: 'Flip Direction',
    options: ['horizontal', 'vertical'],
    optionTitles: ['Horizontal', 'Vertical'],
    defaultValue: 'horizontal',
  },
  animationStyle: {
    type: ControlType.Enum,
    title: 'Animation Style',
    options: ['smooth', 'snappy', 'dramatic'],
    optionTitles: ['Smooth', 'Snappy', 'Dramatic'],
    defaultValue: 'smooth',
  },
  mobileBehavior: {
    type: ControlType.Enum,
    title: 'Mobile Behavior',
    options: ['tap', 'scroll', 'disabled'],
    optionTitles: ['Tap', 'Scroll', 'Disabled'],
    defaultValue: 'tap',
  },
  autoFlip: {
    type: ControlType.Boolean,
    title: 'Auto Flip',
    defaultValue: false,
  },
  autoFlipDelay: {
    type: ControlType.Number,
    title: 'Auto Flip Delay',
    defaultValue: 3000,
    min: 500,
    max: 10000,
    unit: 'ms',
    hidden: (props) => !props.autoFlip,
  },
  threshold: {
    type: ControlType.Number,
    title: 'Scroll Threshold',
    defaultValue: 0.3,
    min: 0,
    max: 1,
    step: 0.05,
    hidden: (props) => props.revealMode !== 'scroll',
  },
  once: {
    type: ControlType.Boolean,
    title: 'Scroll Once',
    defaultValue: true,
    hidden: (props) => props.revealMode !== 'scroll',
  },
  staggerIndex: {
    type: ControlType.Number,
    title: 'Stagger Index',
    defaultValue: 0,
    min: 0,
    max: 20,
    displayStepper: true,
    hidden: (props) => props.revealMode !== 'scroll',
  },
});
