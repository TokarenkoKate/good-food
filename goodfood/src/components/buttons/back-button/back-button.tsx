import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import Icon from '../../icon/icon';

interface BackButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const BackButton: React.FC<BackButtonProps> = ({onPress, style}) => (
  <TouchableOpacity
    style={[styles.backArrowContainer, style]}
    onPress={onPress}>
    <Icon variant="back-2" color="black" size="medium" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backArrowContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#fddd5c',
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BackButton;
