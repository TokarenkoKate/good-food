import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import {StyleProp, TextStyle} from 'react-native';
import icoMoonConfig from '../../../selection.json';
import {IconSizes, IconFillColors} from '../shared';

const IcoMoonIcon = createIconSetFromIcoMoon(
  icoMoonConfig,
  'icomoon',
  'icomoon.ttf',
);

interface IconProps {
  size: keyof typeof IconSizes;
  color: keyof typeof IconFillColors;
  variant: string;
  style?: StyleProp<TextStyle>;
}

const Icon: React.FC<IconProps> = ({variant, size, color, style}) => (
  <IcoMoonIcon
    name={variant}
    size={IconSizes[size]}
    color={IconFillColors[color]}
    style={style}
  />
);

export default Icon;
