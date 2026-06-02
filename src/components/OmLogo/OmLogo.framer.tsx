import { addPropertyControls, ControlType } from 'framer';
import {
  OmLogo,
  DEFAULT_NAME,
  DEFAULT_NAME_COLOR,
  DEFAULT_NAME_FONT,
} from './OmLogo';
import { DEFAULT_PROPS as ICON_DEFAULTS } from '../SearchSquircleIcon/SearchSquircleIcon';

export default OmLogo;

addPropertyControls(OmLogo, {
  name: {
    type: ControlType.String,
    title: 'Name',
    defaultValue: DEFAULT_NAME,
    description:
      'Defaults to OfferMode. Bind to a Site Variable in Framer to update every logo instance project-wide.',
  },
  nameFont: {
    type: ControlType.Font,
    title: 'Font',
    controls: 'extended',
    displayFontSize: true,
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
    defaultValue: ICON_DEFAULTS.backgroundColor,
  },
  iconColor: {
    type: ControlType.Color,
    title: 'Icon Color',
    defaultValue: ICON_DEFAULTS.iconColor,
  },
});
