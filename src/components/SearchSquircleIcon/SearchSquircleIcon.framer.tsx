import { addPropertyControls, ControlType } from 'framer';
import { SearchSquircleIcon, DEFAULT_PROPS } from './SearchSquircleIcon';

export default SearchSquircleIcon;

addPropertyControls(SearchSquircleIcon, {
  backgroundColor: {
    type: ControlType.Color,
    title: 'Background',
    defaultValue: DEFAULT_PROPS.backgroundColor,
  },
  iconColor: {
    type: ControlType.Color,
    title: 'Icon Color',
    defaultValue: DEFAULT_PROPS.iconColor,
  },
  size: {
    type: ControlType.Number,
    title: 'Size',
    defaultValue: DEFAULT_PROPS.size,
    min: 16,
    max: 128,
    step: 1,
    unit: 'px',
  },
  title: {
    type: ControlType.String,
    title: 'Label',
    defaultValue: 'Search',
    description: 'Leave empty for decorative icons (hidden from screen readers).',
  },
});
