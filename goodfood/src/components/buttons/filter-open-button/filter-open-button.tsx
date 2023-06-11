import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from '../../icon/icon';

interface ButtonProps {
  openFilterModal: () => void;
}

const FilterOpenButton: React.FC<ButtonProps> = ({openFilterModal}) => (
  <TouchableOpacity onPress={openFilterModal}>
    <View style={styles.filterIconContainer}>
      <Icon variant="filter" size="large" color="gray" />
    </View>
  </TouchableOpacity>
);

export default FilterOpenButton;

const styles = StyleSheet.create({
  filterIconContainer: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#ffffff',
    elevation: 10,
  },
});
