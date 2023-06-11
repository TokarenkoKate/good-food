import {Text as RNText, StyleProp, TextStyle} from 'react-native';
import {TextSizes, FontWeights, TextColors} from '../shared';

interface TextProps {
  children: string;
  size?: keyof typeof TextSizes;
  fontWeight?: keyof typeof FontWeights;
  color?: keyof typeof TextColors;
  textStyle?: StyleProp<TextStyle>;
}

const Text: React.FC<TextProps> = ({
  children,
  size = 'medium',
  fontWeight = 'regular',
  color = 'black',
  textStyle,
}) => (
  <RNText
    style={[
      {
        fontSize: TextSizes[size],
        fontWeight: FontWeights[fontWeight],
        color: TextColors[color],
      },
      textStyle,
    ]}>
    {children}
  </RNText>
);

export default Text;
