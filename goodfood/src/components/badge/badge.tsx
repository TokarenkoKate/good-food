import {View, StyleSheet} from 'react-native';
import Icon from '../icon/icon';
import Text from '../text/text';

interface BadgeProps {
  amount?: number;
  title: string;
  iconVariant: string;
}

const Badge: React.FC<BadgeProps> = ({amount, title, iconVariant}) => {
  return (
    <View style={styles.badge}>
      <View style={styles.badgeIconContainer}>
        <Icon variant={iconVariant} size="large" color="black" />
      </View>
      <View style={styles.badgeTitleRow}>
        {amount && (
          <Text size="large" fontWeight="bold">
            {`${amount}`}
          </Text>
        )}
        <Text size="medium">{title}</Text>
      </View>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#fddd5c',
    width: 70,
    height: 125,
    marginRight: 10,
    alignItems: 'center',
    paddingTop: 5,
    borderRadius: 35,
  },
  badgeIconContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  badgeTitleRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    paddingBottom: 10,
  },
});
