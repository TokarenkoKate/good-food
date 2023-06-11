import {Image, StyleSheet, View, ViewStyle, StyleProp} from 'react-native';

interface AvatarProps {
  style?: StyleProp<ViewStyle>;
}

const Avatar: React.FC<AvatarProps> = ({style}) => (
  <View style={[styles.avatarContainer, style]}>
    <Image
      style={styles.avatar}
      source={require('../../assets/pictures/avatar.jpg')}
    />
  </View>
);

export default Avatar;

const styles = StyleSheet.create({
  avatarContainer: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: '#171717',
    elevation: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 12,
  },
});
