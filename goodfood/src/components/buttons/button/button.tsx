import {
  TouchableOpacity,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Text from '../../text/text';
import {TextColors} from '../../shared';

interface ButtonProps {
  children: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  fontColor?: keyof typeof TextColors;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  style,
  fontColor,
}) => (
  <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
    <View>
      <Text size="large" fontWeight="bold" color={fontColor}>
        {children}
      </Text>
    </View>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#fddd5c',
  },
});
