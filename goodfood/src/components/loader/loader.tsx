import {StyleSheet, View, ActivityIndicator} from 'react-native';
import Text from '../text/text';

function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="#fddd5c"
        style={styles.activityIndicator}
      />
      <Text size="extraLarge">Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    marginBottom: 10,
  },
});

export default Loader;
