import { addPropertyControls, ControlType } from 'framer';
import {
  OmLogo,
  DEFAULT_NAME,
  DEFAULT_NAME_COLOR,
  DEFAULT_NAME_FONT,
  DEFAULT_LOGO_SIZE,
  DEFAULT_ICON_BACKGROUND,
  DEFAULT_ICON_COLOR,
} from './OmLogo';

export default OmLogo;

addPropertyControls(OmLogo, {
  name: {
    type: ControlType.String,
    title: 'Name',
    defaultValue: DEFAULT_NAME,
    description:
      'Defaults to OfferMode. Bind to a Site Variable in Framer to update every logo instance project-wide.',
  },
  logoSize: {
    type: ControlType.Number,
    title: 'Size',
    defaultValue: DEFAULT_LOGO_SIZE,
    min: 12,
    max: 96,
    step: 1,
    unit: 'px',
  },
  nameFont: {
    type: ControlType.Font,
    title: 'Font',
    controls: 'extended',
    displayFontSize: false,
    defaultFontType: 'sans-serif',
    defaultValue: {
      fontSize: DEFAULT_NAME_FONT.fontSize,
      lineHeight: DEFAULT_NAME_FONT.lineHeight,
      letterSpacing: DEFAULT_NAME_FONT.letterSpacing,
      variant: 'Semibold',
    },
  },
  nameColor: {
    type: ControlType.Color,
    title: 'Text Color',
    defaultValue: DEFAULT_NAME_COLOR,
  },
  iconBackgroundColor: {
    type: ControlType.Color,
    title: 'Icon Background',
    defaultValue: DEFAULT_ICON_BACKGROUND,
  },
  iconColor: {
    type: ControlType.Color,
    title: 'Icon Color',
    defaultValue: DEFAULT_ICON_COLOR,
  },
});
