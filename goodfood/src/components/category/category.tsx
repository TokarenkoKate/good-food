import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import {BASE_URL} from '../../utils/services';
import {capitalize} from '../../utils/utils';
import Text from '../text/text';

interface CategoryProps {
  title: string;
  pictureSrc: string | ImageSourcePropType;
  selectedCategory: string;
  onPressSelectCategory: (categoryTitle: string) => void;
}

const Category: React.FC<CategoryProps> = ({
  title,
  pictureSrc,
  selectedCategory,
  onPressSelectCategory,
}) => {
  const selectCategory = () => onPressSelectCategory(title);
  const categoryBackgroundColor =
    selectedCategory === title ? '#fddd5c' : '#bec2c7';

  return (
    <TouchableOpacity onPress={selectCategory}>
      <View style={styles.categoryContainer}>
        <View
          style={[
            styles.imageContainer,
            {backgroundColor: categoryBackgroundColor},
          ]}>
          <Image
            style={styles.image}
            source={
              title === 'popular'
                ? (pictureSrc as ImageSourcePropType)
                : {uri: BASE_URL + pictureSrc}
            }
          />
        </View>
        <Text size="medium" fontWeight="semiBold">
          {capitalize(title)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryContainer: {
    width: 65,
    alignItems: 'center',
  },
  imageContainer: {
    height: 58,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#fddd5c',
  },
  image: {
    width: 26,
    height: 26,
  },
});
