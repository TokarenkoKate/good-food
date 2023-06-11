import {StyleSheet, View, Image} from 'react-native';
import Button from '../buttons/button/button';
import Text from '../text/text';

type WarningProps = {
  onReload: () => void;
};

const Warning: React.FC<WarningProps> = ({onReload}) => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={require('../../assets/pictures/warning.png')}
    />
    <Text size="extraLarge" fontWeight="bold" textStyle={styles.title}>
      Something went wrong
    </Text>
    <Button onPress={onReload} style={styles.button}>
      Please try again
    </Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    marginBottom: 20,
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 20,
  },
});

export default Warning;
